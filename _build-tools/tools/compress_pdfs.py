# Shrink the catalog PDFs for the web: downscale embedded raster images (long side <= MAX_PX)
# and re-encode them as JPEG, then save with object streams. Text/vector content is untouched.
# A file is replaced only if the result is smaller. Originals stay in "last edits/cataloge".
# usage: python -I compress_pdfs.py [dir]   (default: finialweb/assets/catalogs)
import io, os, sys, zlib
import pikepdf
from PIL import Image

ROOT = os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..'))
DIR = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, 'finialweb', 'assets', 'catalogs')
MAX_PX, QUALITY = 1600, 72
INVERT_CMYK = os.environ.get('INVERT_CMYK') == '1'   # verified with compare_pdfs.py (see below)

def shrink_image(obj):
    """Return True if the image XObject was replaced with a smaller JPEG."""
    # Only plain RGB/Gray images. CMYK (often stored inverted), masked/transparent images,
    # /Decode arrays, indexed or ICC-less exotic spaces are left untouched - converting
    # them naively produces negatives and black boxes.
    if any(k in obj for k in ('/Mask', '/ImageMask')):
        return False
    smask = obj.get('/SMask')
    if smask is not None:
        # soft mask (transparency): must be a plain 8-bit gray image we can resample alongside
        if smask.get('/ColorSpace') != pikepdf.Name.DeviceGray or int(smask.get('/BitsPerComponent', 8)) != 8 \
                or any(k in smask for k in ('/Decode', '/Matte', '/SMask')):
            return False
    cs = obj.get('/ColorSpace')
    if cs not in (pikepdf.Name.DeviceRGB, pikepdf.Name.DeviceGray, pikepdf.Name.DeviceCMYK):
        return False
    if int(obj.get('/BitsPerComponent', 8)) != 8:
        return False
    cmyk = cs == pikepdf.Name.DeviceCMYK
    if cmyk:
        # CMYK JPEGs: resample the raw JPEG samples as-is and keep /Decode, so whatever
        # inversion convention the original used is preserved exactly.
        if obj.get('/Filter') != pikepdf.Name.DCTDecode:
            return False
        try:
            pil = Image.open(io.BytesIO(obj.read_raw_bytes()))
            pil.draft(None, None)
            pil.load()
        except Exception:
            return False
        if pil.mode != 'CMYK':
            return False
        return _save(obj, pil, keep_decode=True, raw_cmyk_adobe=pil.info.get('adobe') is not None)
    if '/Decode' in obj:
        return False
    try:
        pil = pikepdf.PdfImage(obj).as_pil_image()
    except Exception:
        return False                               # exotic encodings (JBIG2, CCITT...) - leave alone
    if pil.mode not in ('RGB', 'L'):
        return False
    return _save(obj, pil)

def _save(obj, pil, keep_decode=False, raw_cmyk_adobe=False):
    if raw_cmyk_adobe and INVERT_CMYK:
        pil = Image.merge('CMYK', [ch.point(lambda v: 255 - v) for ch in pil.split()])
    w, h = pil.size
    if max(w, h) > MAX_PX:
        k = MAX_PX / max(w, h)
        pil = pil.resize((max(1, round(w * k)), max(1, round(h * k))), Image.LANCZOS)
    buf = io.BytesIO()
    pil.save(buf, 'JPEG', quality=QUALITY, optimize=True, progressive=True)
    data = buf.getvalue()
    if len(data) >= len(obj.read_raw_bytes()):
        return False
    smask = obj.get('/SMask')
    if smask is not None and (int(smask.Width), int(smask.Height)) != pil.size:
        try:
            m = pikepdf.PdfImage(smask).as_pil_image().convert('L').resize(pil.size, Image.LANCZOS)
        except Exception:
            return False
        smask.write(zlib.compress(m.tobytes(), 9), filter=pikepdf.Name.FlateDecode)
        smask.Width, smask.Height = m.size
        if '/DecodeParms' in smask: del smask['/DecodeParms']
    obj.write(data, filter=pikepdf.Name.DCTDecode)
    obj.Width, obj.Height = pil.size
    obj.ColorSpace = {'L': pikepdf.Name.DeviceGray, 'CMYK': pikepdf.Name.DeviceCMYK}.get(pil.mode, pikepdf.Name.DeviceRGB)
    obj.BitsPerComponent = 8
    for k in ('/DecodeParms',) + (() if keep_decode else ('/Decode',)):
        if k in obj: del obj[k]
    return True

total_before = total_after = 0
for fn in sorted(os.listdir(DIR)):
    if not fn.lower().endswith('.pdf'): continue
    p = os.path.join(DIR, fn)
    before = os.path.getsize(p)
    changed = 0
    with pikepdf.open(p) as pdf:
        seen = set()
        for page in pdf.pages:
            for _, img in page.get_images().items():     # includes images nested in form XObjects
                key = img.objgen
                if key in seen: continue
                seen.add(key)
                if img.get('/ImageMask'): continue
                changed += shrink_image(img)
        tmp = p + '.tmp'
        pdf.remove_unreferenced_resources()
        pdf.save(tmp, compress_streams=True, object_stream_mode=pikepdf.ObjectStreamMode.generate,
                 recompress_flate=True, linearize=True)
    after = os.path.getsize(tmp)
    if after < before:
        os.replace(tmp, p)
    else:
        os.remove(tmp); after = before
    total_before += before; total_after += after
    print(f'{before/1024:>7,.0f} KB -> {after/1024:>7,.0f} KB  ({changed:>3} images)  {fn}')
print(f'total {total_before/1048576:.2f} MB -> {total_after/1048576:.2f} MB')
