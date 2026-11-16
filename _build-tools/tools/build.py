# Static page builder for Madar Randa service pages.
# usage: python -I build.py <page_data.py> <site_dir>
# Output is plain HTML matching product-garage-doors.html markup; schema inserted via schema.py logic.
import sys, os, json, html, re, runpy

WA = 'https://wa.me/966508009799'
GOOGLE = 'https://share.google/V15DhNAwxAjHoYN1G'
ICONS = {
 'award': '<circle cx="12" cy="8" r="6"/><path d="M15.5 13 17 22l-5-3-5 3 1.5-9"/>',
 'building': '<rect x="4" y="2" width="16" height="20" rx="1"/><path d="M9 22v-4h6v4M8 6h.01M12 6h.01M16 6h.01M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01"/>',
 'shieldcheck': '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>',
 'shield': '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
 'wrench': '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
 'box': '<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><path d="M3.27 6.96 12 12.01l8.73-5.05M12 22.08V12"/>',
 'remote': '<rect x="7" y="2" width="10" height="20" rx="2"/><circle cx="12" cy="8" r="2"/><path d="M12 14h.01M12 17h.01"/>',
 'bolt': '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
 'hand': '<path d="M18 11V6a2 2 0 0 0-4 0v5M14 10V4a2 2 0 0 0-4 0v6M10 10.5V6a2 2 0 0 0-4 0v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/>',
 'sliders': '<line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/>',
 'sensor': '<path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2"/>',
 'ruler': '<path d="M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z"/><path d="m14.5 12.5 2-2M11.5 9.5l2-2M8.5 6.5l2-2M17.5 15.5l2-2"/>',
 'wind': '<path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"/>',
 'eye': '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>',
 'sun': '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>',
 'thermo': '<path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"/>',
 'volume': '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M23 9l-6 6M17 9l6 6"/>',
 'palette': '<circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.93 0 1.65-.75 1.65-1.69 0-.44-.18-.84-.44-1.13-.29-.29-.44-.65-.44-1.13a1.64 1.64 0 0 1 1.67-1.67h2c3.05 0 5.56-2.5 5.56-5.55C21.97 6.01 17.46 2 12 2z"/>',
 'switch': '<rect x="2" y="7" width="20" height="10" rx="5"/><circle cx="16" cy="12" r="3"/>',
 'home': '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
 'check': '<rect x="5" y="2" width="14" height="20" rx="2"/><path d="m9 12 2 2 4-4"/>',
 'cog': '<circle cx="12" cy="12" r="3"/><path d="M12 1v3M12 20v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M1 12h3M20 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/>',
}

def L(ar, en, tag='span', cls=None):
    return f'<span class="lang-ar">{ar}</span><span class="lang-en">{en}</span>'

def btn(b):
    ar, en, href, style = b
    ext = ' target="_blank" rel="noopener"' if href.startswith('http') else ''
    return f'<a href="{href}" class="btn {style}"{ext}>{L(ar, en)}</a>'

def head(d):
    return f'''<!DOCTYPE html>
<html lang="ar" dir="rtl"
  data-title-en="{html.escape(d['title_en'])}"
  data-title-ar="{d['title_ar']}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{d['title_ar']}</title>
  <meta name="description" content="{d['desc']}">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="https://www.madaranda.com/{d['file']}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://www.madaranda.com/{d['file']}">
  <meta property="og:title" content="{d['title_ar']}">
  <meta property="og:description" content="{d['desc']}">
  <meta property="og:image" content="{d['og_image']}">
  <meta property="og:locale" content="ar_SA">
  <link rel="icon" type="image/png" href="assets/logos/icon-mark.png">
  <link rel="stylesheet" href="css/tokens.css">
  <link rel="stylesheet" href="css/styles.css">
  <!--SCHEMA-->
</head>
<body>
  <div id="site-header"></div>
  <main id="main-content">
'''

def hero(d):
    h = d['hero']
    sep = '<span class="breadcrumb__sep" aria-hidden="true"><svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg></span>'
    paras = ''.join(f'\n          <p class="hero__body">{L(*p)}</p>' for p in h['paras'])
    return f'''
    <section class="hero hero--page hero--with-body section--dark" aria-labelledby="page-title">
      <div class="container hero__content" style="padding:0">
        <div class="hero__inner">
          <nav aria-label="Breadcrumb" class="breadcrumb">
            <span class="breadcrumb__item"><a href="index.html" class="breadcrumb__link">{L('الرئيسية','Home')}</a></span>
            {sep}
            <span class="breadcrumb__item"><a href="index.html#products" class="breadcrumb__link">{L('المنتجات','Products')}</a></span>
            {sep}
            <span class="breadcrumb__item breadcrumb__current" aria-current="page">{L(*d['crumb'])}</span>
          </nav>
          <h1 class="hero__title" id="page-title">{L(*h['h1'])}</h1>{paras}
          <div class="btn-group">
            {btn((h['btn1'][0], h['btn1'][1], 'contact.html', 'btn--accent btn--lg'))}
            {btn((h['btn2'][0], h['btn2'][1], WA, 'btn--outline-white btn--lg'))}
          </div>
        </div>
      </div>
    </section>
'''

def trust(items, label='شريط الثقة'):
    cells = ''.join(f'''
        <div class="trust-bar__item">
          <svg class="trust-bar__icon" viewBox="0 0 24 24" aria-hidden="true">{ICONS[i]}</svg>
          <span class="trust-bar__title">{L(ta, te)}</span>
          <span class="trust-bar__desc">{L(da, de)}</span>
        </div>''' for i, ta, te, da, de in items)
    return f'''
    <section class="trust-bar" aria-label="{label}">
      <div class="container trust-bar__grid">{cells}
      </div>
    </section>
'''

def header(h2, sid, dark=False, sub=None):
    d = ' section-title--dark' if dark else ''
    s = ''
    for p in (sub or []):
        s += f'\n          <p class="section-subtitle{" section-subtitle--dark" if dark else ""}">{L(*p)}</p>'
    return f'''        <div class="section-header section-header--center">
          <h2 class="section-title{d}" id="{sid}">{L(*h2)}</h2>{s}
        </div>
'''

def note(n):
    return f'        <p class="note-text">{L(*n)}</p>\n' if n else ''

def prod_item(it):
    media = (f'''            <div class="prod-item__media">
              <img src="{it['img']}" alt="{it['alt']}" class="prod-item__img" loading="lazy">
            </div>
''' if it.get('img') else '')
    body = ''
    for p in it.get('desc', []):
        body += f'              <p class="prod-item__desc">{L(*p)}</p>\n'
    for sub in it.get('subs', []):
        lbl, items = sub
        body += f'              <span class="prod-item__sub">{L(*lbl)}</span>\n              <ul class="spec-list">\n'
        for li in items:
            if len(li) == 4:
                body += f'                <li>{L("<strong>"+li[0]+":</strong> "+li[1], "<strong>"+li[2]+":</strong> "+li[3])}</li>\n'
            else:
                body += f'                <li>{L(*li)}</li>\n'
        body += '              </ul>\n'
    if it.get('note'):
        body += f'              <p class="prod-item__desc" style="font-size:var(--text-sm)">{L(*it["note"])}</p>\n'
    if it.get('btn'):
        body += f'              {btn((it["btn"][0], it["btn"][1], it["btn"][2] if len(it["btn"])>2 else "contact.html", "btn--primary"))}\n'
    cls = 'prod-item' + ('' if it.get('img') else ' prod-item--noimg')
    todo = f'          <!-- TODO(client): {it["todo"]} -->\n' if it.get('todo') else ''
    return f'''{todo}          <article class="{cls}" id="{it['id']}">
{media}            <div>
{('              <span class="prod-item__eyebrow">'+L(*it['eyebrow'])+'</span>'+chr(10)) if it.get('eyebrow') else ''}              <h3 class="prod-item__title">{L(*it['h3'])}</h3>
{body}            </div>
          </article>
'''

def chips(s):
    if not s.get('chips'): return ''
    a = ''.join(f'<a href="#{i["id"]}" class="chip-nav__link">{L(*i.get("chip", i["h3"]))}</a>' for i in s['items'])
    return f'        <nav class="chip-nav" aria-label="المنتجات">{a}</nav>\n'

def types(s):
    items = ''.join(prod_item(i) for i in s['items'])
    bg = s.get('bg', 'section--white')
    after = note(s.get('note'))
    if s.get('btn'):
        after += f'        <div class="center-actions">{btn((s["btn"][0], s["btn"][1], "contact.html", "btn--accent"))}</div>\n'
    return f'''
    <section class="section {bg}" id="{s['id']}" aria-labelledby="{s['id']}-title">
      <div class="container">
{header(s['h2'], s['id']+'-title', sub=s.get('sub')) if s.get('h2') else ''}{chips(s)}        <div class="prod-list">
{items}        </div>
{after}      </div>
    </section>
'''

def cards(s):
    tag = s.get('card_tag', 'h3')
    cs = ''.join(f'''
          <div class="value-card">
            <svg class="value-card__icon-svg" viewBox="0 0 24 24" aria-hidden="true">{ICONS[i]}</svg>
            <{tag} class="value-card__title">{L(ta, te)}</{tag}>
            <p class="value-card__body">{L(ba, be)}</p>
          </div>''' for i, ta, te, ba, be in s['cards'])
    after = note(s.get('note'))
    if s.get('btn'):
        after += f'        <div class="center-actions">{btn((s["btn"][0], s["btn"][1], s["btn"][2] if len(s["btn"])>2 else "contact.html", "btn--accent"))}</div>\n'
    return f'''
    <section class="section {s.get('bg', 'section--pale')}" aria-labelledby="{s['id']}-title">
      <div class="container">
{header(s['h2'], s['id']+'-title', sub=s.get('sub'))}        <div class="values-grid">{cs}
        </div>
{after}      </div>
    </section>
'''

def steps(s):
    cs = ''
    for st in s['steps']:
        t = f'\n            <h3 class="step-card__title">{L(st[0], st[1])}</h3>' if st[0] else ''
        cs += f'''
          <div class="step-card">{t}
            <p class="step-card__body">{L(st[2], st[3])}</p>
          </div>'''
    after = note(s.get('note'))
    if s.get('btn'):
        after += f'        <div class="center-actions">{btn((s["btn"][0], s["btn"][1], s["btn"][2] if len(s["btn"])>2 else "contact.html", "btn--accent"))}</div>\n'
    return f'''
    <section class="section {s.get('bg', 'section--white')}" aria-labelledby="{s['id']}-title">
      <div class="container">
{header(s['h2'], s['id']+'-title')}        <div class="steps-grid">{cs}
        </div>
{after}      </div>
    </section>
'''

def reviews(s):
    return f'''
    <section class="section section--dark cta-final" aria-labelledby="reviews-title">
      <div class="container">
        <h2 class="section-title section-title--dark" id="reviews-title">{L(*s['h2'])}</h2>
        {f'<p class="section-subtitle section-subtitle--dark">{L(*s["text"])}</p>' if s.get('text') else ''}
        <div class="btn-group">
          {btn(('اطلع على تقييماتنا في جوجل', 'See Our Google Reviews', 'https://maps.app.goo.gl/Tk2GUo1TzbyfGwEt6', 'btn--accent'))}
        </div>
      </div>
    </section>
'''

def faq(s):
    qs = ''.join(f'''
          <div class="faq-item">
            <button class="faq-question" aria-expanded="false">
              <span class="faq-question__text">{L(qa, qe)}</span>
              <span class="faq-question__icon" aria-hidden="true">+</span>
            </button>
            <div class="faq-answer">{L(aa, ae)}</div>
          </div>''' for qa, qe, aa, ae in s['items'])
    return f'''
    <section class="section section--pale" id="faq" aria-labelledby="faq-title">
      <div class="container--narrow">
{header(s.get('h2', ('الأسئلة الشائعة', 'Frequently Asked Questions')), 'faq-title')}        <div class="faq-list">{qs}
        </div>
      </div>
    </section>
'''

def cta(s):
    ps = ''.join(f'\n        <p class="section-subtitle section-subtitle--dark">{L(*p)}</p>' for p in s['paras'])
    bs = '\n          '.join(btn(b) for b in s.get('btns', [
        ('اطلب عرض سعر', 'Request a Quote', 'contact.html', 'btn--accent btn--lg'),
        ('تواصل معنا عبر واتساب', 'Contact Us on WhatsApp', WA, 'btn--outline-white btn--lg')]))
    return f'''
    <section class="section section--dark cta-final" aria-labelledby="cta-title">
      <div class="container">
        <h2 class="section-title section-title--dark" id="cta-title">{L(*s['h2'])}</h2>{ps}
        <div class="btn-group">
          {bs}
        </div>
      </div>
    </section>
'''

def foot(d):
    return f'''
  </main>
  <div id="site-footer"></div>
  <div id="whatsapp-btn"></div>
  <script src="https://unpkg.com/lenis@1.1.14/dist/lenis.min.js"></script>
  <script src="js/config.js"></script>
  <script src="js/components.js"></script>
  <script src="js/app.js"></script>
  <script>MadarApp.init('{d['file']}');</script>
</body>
</html>
'''

def prose(s):
    body = ''
    for blk in s['blocks']:
        if blk[0] == 'p':
            body += f'        <p class="prose__p">{L(blk[1], blk[2])}</p>\n'
        else:
            body += '        <ul class="spec-list">\n' + ''.join(
                f'          <li>{L("<strong>"+a+":</strong> "+b, "<strong>"+c+":</strong> "+d)}</li>\n' for a, b, c, d in blk[1]) + '        </ul>\n'
    bs = ' '.join(btn(b) for b in s.get('btns', []))
    return f'''
    <section class="section {s.get('bg', 'section--white')}" aria-labelledby="{s['id']}-title">
      <div class="container--narrow">
{header(s['h2'], s['id']+'-title')}{body}        <div class="center-actions">{bs}</div>
      </div>
    </section>
'''

RENDER = {'prose': prose, 'types': types, 'cards': cards, 'steps': steps, 'reviews': reviews, 'faq': faq, 'cta': cta}

def schema_block(d):
    if not d.get('schema'):
        return '<!-- TODO(client): no approved schema file supplied for this page -->'
    src, old = d['schema']
    s = html.unescape(open(src, encoding='utf8').read())
    s = s[s.index('{'):s.rindex('}') + 1]
    s = re.sub(r'https://www\.madaranda\.com/' + re.escape(old.strip('/')) + r'/?(?=[#"])', 'https://www.madaranda.com/' + d['file'], s)
    s = s.replace('https://maps.app.goo.gl/zo8PaEZXbD4Shxct9', GOOGLE)
    for a, b in d.get('schema_fix', []):
        s = s.replace(a, b)
    json.loads(s)
    return '<script type="application/ld+json">\n' + s + '\n  </script>'

if __name__ == '__main__':
    d = runpy.run_path(sys.argv[1])['PAGE']
    out = head(d) + hero(d) + (trust(d['trust']) if d.get('trust') else '')
    for sec in d['sections']:
        out += RENDER[sec['type']](sec)
    out += foot(d)
    out = out.replace('<!--SCHEMA-->', schema_block(d))
    path = os.path.join(sys.argv[2], d['file'])
    open(path, 'w', encoding='utf8').write(out)
    print('built', path)
