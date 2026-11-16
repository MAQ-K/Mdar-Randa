# Build the upload-ready site from finialweb/ into deploy/madaranda/ (+ zip).
# Only live pages and the files they reference are copied; CSS/JS minified with esbuild,
# HTML comments/indentation stripped, oversized images downscaled. Source is never modified.
# usage: python -I deploy.py
import os, re, shutil, subprocess, zipfile, html as H
from urllib.parse import unquote
from PIL import Image

ROOT = os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))
SRC = os.path.join(ROOT, 'finialweb')
OUT = os.path.join(ROOT, 'deploy', 'madaranda')
ZIP = os.path.join(ROOT, 'deploy', 'madaranda-site.zip')
ESBUILD = os.path.join(ROOT, '_build-tools', 'node_modules', '.bin', 'esbuild.cmd' if os.name == 'nt' else 'esbuild')
SITE = 'https://www.madaranda.com/'
SKIP_PAGES = {'design-draft.html'}
MAX_W = 1200          # widest any content image is displayed (2x for retina on half-width blocks)

def local(ref):
    ref = unquote(H.unescape(ref.split('#')[0].split('?')[0])).strip()
    if not ref or re.match(r'^(https?:|mailto:|tel:|data:|//|javascript:)', ref): return None
    return ref

def refs_in_html(t):
    out = re.findall(r'(?:src|href|poster|data-src)="([^"]+)"', t)
    out += [c for c in re.findall(r'content="([^"]+)"', t) if re.search(r'^[\w./-]+\.(png|jpe?g|webp|svg|gif)$', c)]
    out += re.findall(r"url\('([^']+)'\)", t)
    return out

def refs_in_css(t):
    t = re.sub(r'/\*.*?\*/', '', t, flags=re.S)
    return re.findall(r'url\(\s*[\'"]?([^\'")]+)[\'"]?\s*\)', t) + re.findall(r'@import\s+[\'"]([^\'"]+)', t)
def refs_in_js(t):   return re.findall(r"""['"](assets/[^'"]+)['"]""", t)

def main():
    if os.path.exists(OUT): shutil.rmtree(OUT)
    os.makedirs(OUT)
    pages = sorted(f for f in os.listdir(SRC) if f.endswith('.html') and f not in SKIP_PAGES)
    needed, queue = set(pages), list(pages)
    missing = []
    while queue:                                    # follow references transitively (html -> css -> fonts, js -> images)
        f = queue.pop()
        p = os.path.join(SRC, f)
        if not os.path.isfile(p): missing.append(f); continue
        if not f.endswith(('.html', '.css', '.js')): continue
        t = open(p, encoding='utf8').read()
        base = '' if f.endswith('.js') else os.path.dirname(f)   # JS asset paths are relative to the page (site root)
        refs = refs_in_html(t) if f.endswith('.html') else refs_in_css(t) if f.endswith('.css') else refs_in_js(t)
        for r in refs:
            r = local(r)
            if not r or r.endswith('.html') and not os.path.isfile(os.path.join(SRC, base, r)):
                if r: missing.append(f + ' -> ' + r)
                continue
            n = os.path.normpath(os.path.join(base, r)).replace('\\', '/')
            if n.startswith('..'): continue
            if n not in needed:
                needed.add(n); queue.append(n)
    before = after = 0
    for f in sorted(needed):
        s, d = os.path.join(SRC, f), os.path.join(OUT, f)
        if not os.path.isfile(s): continue
        os.makedirs(os.path.dirname(d), exist_ok=True)
        before += os.path.getsize(s)
        if f.endswith(('.css', '.js')):
            subprocess.run([ESBUILD, s, '--minify', '--log-level=error', '--charset=utf8',
                            '--loader:.css=css', '--outfile=' + d], check=True)
        elif f.endswith('.html'):
            t = open(s, encoding='utf8').read()
            t = re.sub(r'<!--(?!\[).*?-->', '', t, flags=re.S)        # comments (incl. internal TODO notes)
            t = re.sub(r'\n[ \t]+', '\n', t)                          # indentation (textarea/pre are empty here)
            t = re.sub(r'\n{2,}', '\n', t)
            open(d, 'w', encoding='utf8', newline='\n').write(t)
        elif f.endswith('.webp') and '/products/' in f:
            im = Image.open(s); im.load()
            if im.width > MAX_W:
                im = im.resize((MAX_W, round(im.height * MAX_W / im.width)), Image.LANCZOS)
                im.save(d, 'WEBP', quality=80, method=6)
                if os.path.getsize(d) >= os.path.getsize(s): shutil.copy2(s, d)
            else:
                shutil.copy2(s, d)
        else:
            shutil.copy2(s, d)
        after += os.path.getsize(d)
    # robots + sitemap
    open(os.path.join(OUT, 'robots.txt'), 'w', encoding='utf8').write(f'User-agent: *\nAllow: /\n\nSitemap: {SITE}sitemap.xml\n')
    urls = ''.join(f'  <url><loc>{SITE}{"" if p == "index.html" else p}</loc></url>\n' for p in pages)
    open(os.path.join(OUT, 'sitemap.xml'), 'w', encoding='utf8').write(
        '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + urls + '</urlset>\n')
    # zip
    if os.path.exists(ZIP): os.remove(ZIP)
    with zipfile.ZipFile(ZIP, 'w', zipfile.ZIP_DEFLATED, compresslevel=9) as z:
        for dp, _, fs in os.walk(OUT):
            for fn in fs:
                full = os.path.join(dp, fn)
                z.write(full, os.path.relpath(full, OUT))
    src_total = sum(os.path.getsize(os.path.join(dp, fn)) for dp, _, fs in os.walk(SRC) for fn in fs)
    print(f'pages: {len(pages)} | files: {sum(len(fs) for _, _, fs in os.walk(OUT))}')
    print(f'used files {before/1048576:.2f} MB -> deploy {after/1048576:.2f} MB  (whole finialweb folder: {src_total/1048576:.1f} MB)')
    print(f'zip: {os.path.getsize(ZIP)/1048576:.2f} MB -> {ZIP}')
    print('missing refs:', missing or 'none')

main()
