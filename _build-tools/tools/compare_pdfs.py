# Render every page of two PDF sets and report the worst per-file visual difference.
# usage: python -I compare_pdfs.py <original_dir> <compressed_dir>
import os, sys
import pypdfium2 as pdfium
from PIL import Image, ImageChops, ImageStat

a_dir, b_dir = sys.argv[1:3]
bad = False
for fn in sorted(os.listdir(a_dir)):
    if not fn.lower().endswith('.pdf'): continue
    A, B = pdfium.PdfDocument(os.path.join(a_dir, fn)), pdfium.PdfDocument(os.path.join(b_dir, fn))
    if len(A) != len(B):
        print(f'PAGE COUNT DIFFERS  {fn}'); bad = True; continue
    worst, worst_pg = 0.0, -1
    for i in range(len(A)):
        ia = A[i].render(scale=0.6).to_pil().convert('RGB')
        ib = B[i].render(scale=0.6).to_pil().convert('RGB').resize(ia.size)
        d = ImageChops.difference(ia, ib).convert('L')
        mean = ImageStat.Stat(d).mean[0]            # average absolute difference, 0..255
        big = sum(d.histogram()[60:]) / (d.width * d.height) * 100   # % of pixels off by > 60
        score = max(mean, big)
        if score > worst: worst, worst_pg = score, i + 1
    flag = 'OK ' if worst < 4 else 'BAD'
    bad |= worst >= 4
    print(f'{flag} worst={worst:5.2f} (page {worst_pg:>3}/{len(A)})  {fn}')
sys.exit(1 if bad else 0)
