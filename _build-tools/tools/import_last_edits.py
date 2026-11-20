# One-off import of the client's "last edits" folder into finialweb/assets.
# Photos -> WebP (max 1600px wide), logos -> trimmed WebP (120px high), PDFs copied with clean names.
# usage: python -I import_last_edits.py
import os, shutil
from PIL import Image, ImageChops

ROOT = os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..'))
SRC = os.path.join(ROOT, 'last edits')
A = os.path.join(ROOT, 'finialweb', 'assets')

PHOTOS = {
    # garage doors
    'garage-gallery/sectional-garage-door-exterior.webp':          'images/products/garage-doors/sectional-garage-door-exterior.webp',
    'garage-gallery/sectional-garage-door-motor-tracks.webp':      'images/products/garage-doors/sectional-garage-door-motor-tracks.webp',
    'garage-gallery/sectional-garage-door-panel-installation.webp': 'images/products/garage-doors/sectional-garage-door-panel-installation.webp',
    'garage-gallery/roller-garage-door-side.png':                  'images/products/garage-doors/roller-garage-door-front.webp',   # file shows the door head-on
    'garage-gallery/Slatted door mechanism, oblique view.png':     'images/products/garage-doors/roller-garage-door-side.webp',    # oblique/side view
    'garage-gallery/roller-garage-door-villa.png':                 'images/products/garage-doors/roller-garage-door-villa.webp',
    # industrial shutters
    'shatter-doors/industrial-shutter-installation-madar-randa-qassim.png': 'images/products/shutter-roll-doors/industrial-shutter-installation-madar-randa-qassim.webp',
    'shatter-doors/warehouse-rolling-shutter-madar-randa-qassim.png':       'images/products/shutter-roll-doors/warehouse-rolling-shutter-madar-randa-qassim.webp',
    'shatter-doors/industrial-shutter-doors-madar-randa-qassim.png':        'images/products/shutter-roll-doors/industrial-shutter-doors-madar-randa-qassim.webp',
    # glass doors - King Fahd port
    'glass-port-gallery/automatic-glass-door-king-fahd-port-jubail.webp': 'images/products/automatic-glass-doors/automatic-glass-door-king-fahd-port-jubail.webp',
    'glass-port-gallery/glass-sliding-door-interior-jubail-port.webp':    'images/products/automatic-glass-doors/glass-sliding-door-interior-jubail-port.webp',
    'glass-port-gallery/glass-sliding-door-entrance-steps-jubail.webp':   'images/products/automatic-glass-doors/glass-sliding-door-entrance-steps-jubail.webp',
    'glass-port-gallery/automatic-glass-door-corridor-jubail-port.webp':  'images/products/automatic-glass-doors/automatic-glass-door-corridor-jubail-port.webp',
    # hospital doors
    'hospital-doors/hospital-glass-sliding-double-door.png':  'images/products/automatic-glass-doors/hospital-glass-sliding-double-door.webp',
    'hospital-doors/hospital-green-double-swing-door.png':    'images/products/automatic-glass-doors/hospital-green-double-swing-door.webp',
    'hospital-doors/hospital-frosted-sliding-door-open.png':  'images/products/automatic-glass-doors/hospital-frosted-sliding-door-open.webp',
    # gate motors
    'motor gates/sliding-gate-motor-brown-madar-randa.webp':     'images/products/gate-motors/sliding-gate-motor-brown-madar-randa.webp',
    'motor gates/sliding-gate-motor-black-madar-randa.webp':     'images/products/gate-motors/sliding-gate-motor-black-madar-randa.webp',
    'motor gates/sliding-gate-motor-wood-look-madar-randa.webp': 'images/products/gate-motors/sliding-gate-motor-wood-look-madar-randa.webp',
    'motor gates/metal-entrance-gate-madar-randa.webp':          'images/products/gate-motors/metal-entrance-gate-madar-randa.webp',
    'motor gates/patterned-gray-swing-gate-motors.png':          'images/products/gate-motors/patterned-gray-swing-gate-motors.webp',
    'motor gates/ornamental-gray-swing-gate-motors.png':         'images/products/gate-motors/ornamental-gray-swing-gate-motors.webp',
    'motor gates/horizontal-wood-look-swing-gate-motors.png':    'images/products/gate-motors/horizontal-wood-look-swing-gate-motors.webp',
    'motor gates/vertical-wood-look-swing-gate-motors.png':      'images/products/gate-motors/vertical-wood-look-swing-gate-motors.webp',
    # team photos (about / maintenance / after-sales)
    'madar-randa-swing-gate-installation.png':         'images/team/madar-randa-swing-gate-installation.webp',
    'madar-randa-rolling-door-installation-team.png':  'images/team/madar-randa-rolling-door-installation-team.webp',
    'madar-randa-team-completed-project.png':          'images/team/madar-randa-team-completed-project.webp',
}

LOGOS = {
    'Logos/Proteco-Gate-Automations-Logo.png':      'brands/proteco.webp',
    'Logos/CAME-logo.png':                          'brands/came.webp',
    'Logos/BFT-logo.png':                           'brands/bft.webp',
    'Logos/FAAC-Logo.png':                          'brands/faac.webp',
    'Logos/Crisp ASSA ABLOY logo on white.png':     'brands/assa-abloy.webp',
    'Logos/Clean armo logo with Italian stripe.png': 'brands/armo.webp',
    'Logos/Centered JIELONG logo on white.png':     'brands/jielong.webp',
    'Logos/Elsamec logo on white background.png':   'brands/elsamec.webp',
}

PDFS = {
    'cataloge/Came-Motors.pdf':              'catalogs/came-motors.pdf',
    'cataloge/دفاش-شارك-مخفي.pdf':          'catalogs/proteco-shark.pdf',
    'cataloge/دفاش-P7.pdf':                 'catalogs/proteco-p7-p4-5.pdf',
    'cataloge/asternew_ver03_21_gb_it.pdf':  'catalogs/proteco-aster-new.pdf',
    'cataloge/aceti.pdf':                    'catalogs/proteco-ace-ti.pdf',
    'cataloge/CAME-3500.pdf':                'catalogs/came-3500.pdf',
    'cataloge/aceta.pdf':                    'catalogs/proteco-ace-ta.pdf',
    'cataloge/mover_ver_03_21_gb_it_0.pdf':  'catalogs/proteco-mover.pdf',
    'cataloge/matrix_ver02_20_gb_it_0.pdf':  'catalogs/proteco-matrix.pdf',
}

def out(rel):
    p = os.path.join(A, rel)
    os.makedirs(os.path.dirname(p), exist_ok=True)
    return p

def kb(p): return os.path.getsize(p) // 1024

for s, d in PHOTOS.items():
    im = Image.open(os.path.join(SRC, s)).convert('RGB')
    if im.width > 1600:
        im = im.resize((1600, round(im.height * 1600 / im.width)), Image.LANCZOS)
    im.save(out(d), 'WEBP', quality=80, method=6)
    print(f'{kb(out(d)):>5} KB  {im.width}x{im.height}  {d}')

for s, d in LOGOS.items():
    im = Image.open(os.path.join(SRC, s)).convert('RGB')
    bg = Image.new('RGB', im.size, im.getpixel((0, 0)))
    box = ImageChops.difference(im, bg).convert('L').point(lambda v: 255 if v > 24 else 0).getbbox()
    if box:                                   # trim the white margin, keep a little air
        pad = 8
        im = im.crop((max(box[0]-pad, 0), max(box[1]-pad, 0), min(box[2]+pad, im.width), min(box[3]+pad, im.height)))
    im = im.resize((round(im.width * 120 / im.height), 120), Image.LANCZOS)
    im.save(out(d), 'WEBP', quality=88, method=6)
    print(f'{kb(out(d)):>5} KB  {im.width}x{im.height}  {d}')

for s, d in PDFS.items():
    shutil.copyfile(os.path.join(SRC, s), out(d))
    print(f'{kb(out(d)):>5} KB  {d}')
