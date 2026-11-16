# Builder v2 — old pp- design (nav cards, floating sub-nav, rich product sections)
# filled with the NEW approved content from the page data files.
# usage: python -I build2.py <page_data.py> <site_dir> [--draft]
import sys, os, re, runpy

HERE = os.path.dirname(os.path.abspath(__file__))
B = runpy.run_path(os.path.join(HERE, 'build.py'))      # reuse helpers from v1
L, btn, ICONS, WA, GOOGLE = B['L'], B['btn'], B['ICONS'], B['WA'], B['GOOGLE']
schema_block, faq_v1, steps_v1, prose_v1 = B['schema_block'], B['faq'], B['steps'], B['prose']

ARROW = '<svg viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>'
CHECK = '<svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>'

# spec label -> icon (first keyword match wins)
SPEC_ICON = [
 ('الخام', 'box'), ('العزل', 'thermo'), ('التصميم', 'palette'), ('المقاس', 'ruler'), ('التشطيب', 'palette'),
 ('الرؤية', 'eye'), ('التحكم', 'sliders'), ('الأمان', 'shield'), ('السلامة', 'shield'), ('الحماية', 'shield'),
 ('التصنيف', 'shieldcheck'), ('الحمولة', 'building'), ('التركيب', 'wrench'), ('الحركة', 'sensor'),
 ('الخصوصية', 'eye'), ('الرياح', 'wind'), ('التشغيل', 'bolt'), ('الأذرع', 'cog'), ('الكفرات', 'cog'),
 ('أرضية', 'shield'), ('سطحية', 'shield'), ('متنقلة', 'box'), ('أعمدة', 'shield'), ('الدخول', 'check'),
 ('الرسوم', 'box'), ('تسجيل', 'eye'), ('إرشاد', 'sensor'),
]
def spec_icon(label):
    for k, i in SPEC_ICON:
        if k in label: return ICONS[i]
    return ICONS['check']

def short(t):  # label for nav: drop "(...)" and " – ..." tails
    return re.sub(r'\s*[–(].*$', '', t).strip() or t

def sh(eyebrow, title, tag='h2', sub=None, center=False, tid=''):
    e = f'          <span class="eyebrow">{L(*eyebrow)}</span>\n' if eyebrow else ''
    s = ''.join(f'\n          <p>{L(*p)}</p>' for p in (sub or []))
    return f'''        <div class="pp-sh{' pp-sh--center' if center else ''}">
{e}          <{tag} class="pp-sh__title"{f' id="{tid}"' if tid else ''}>{L(*title)}</{tag}>{s}
        </div>
'''

def header(d):
    h = d['hero']
    sep = '<span class="breadcrumb__sep" aria-hidden="true"><svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg></span>'
    para = (' '.join(p[0] for p in h['paras']), ' '.join(p[1] for p in h['paras']))
    return f'''
    <section class="pp-page-header" id="pp-hero" aria-labelledby="page-title" style="background-image: var(--hero-shade), url('{d.get('hero_img', d['og_image'])}')">
      <div class="pp-page-header__bg" aria-hidden="true"></div>
      <div class="container">
        <div class="pp-page-header__inner animate-fade-up">
          <nav aria-label="Breadcrumb" class="breadcrumb">
            <span class="breadcrumb__item"><a href="index.html" class="breadcrumb__link">{L('الرئيسية','Home')}</a></span>
            {sep}
            {'' if d.get('no_products_crumb') else '<span class="breadcrumb__item"><a href="index.html#products" class="breadcrumb__link">' + L('المنتجات','Products') + '</a></span>' + sep}
            <span class="breadcrumb__item breadcrumb__current" aria-current="page">{L(*d['crumb'])}</span>
          </nav>
          <h1 class="pp-page-header__h1" id="page-title">{L(*h['h1'])}</h1>
          <p class="pp-page-header__sub">{L(*para)}</p>
          <div class="btn-group pp-page-header__actions">
            {' '.join(btn(b) for b in h['btns']) if h.get('btns') else btn((h['btn1'][0], h['btn1'][1], 'contact.html', 'btn--accent btn--lg')) + btn((h['btn2'][0], h['btn2'][1], WA, 'btn--outline-white btn--lg'))}
          </div>
        </div>
      </div>
    </section>
'''

def trust(items):
    cells = ''.join(f'''
        <div class="trust-bar__item">
          <svg class="trust-bar__icon" viewBox="0 0 24 24" aria-hidden="true">{ICONS[i]}</svg>
          <span class="trust-bar__title">{L(ta, te)}</span>
          {f'<span class="trust-bar__desc">{L(da, de)}</span>' if da else ''}
        </div>''' for i, ta, te, da, de in items)
    return f'''
    <section class="trust-bar trust-band" aria-label="شريط الثقة">
      <div class="container trust-bar__grid">{cells}
      </div>
    </section>
'''

def float_nav(items):
    b = ''.join(f'\n    <button class="pp-float-nav__item" data-target="{i["id"]}">{L(*i.get("chip", (short(i["h3"][0]), short(i["h3"][1]))))}</button>' for i in items)
    return f'''
  <nav id="pp-float-nav" class="pp-float-nav" aria-label="تنقل المنتجات">{b}
  </nav>
'''

def nav_cards(items, first):
    cards = ''
    for n, i in enumerate(items, 1):
        img = f'<img src="{i["img"]}" alt="{i["alt"]}" class="pp-nav-card__img" loading="lazy">' if i.get('img') else ''
        title = i.get('chip', (short(i['h3'][0]), short(i['h3'][1])))
        cards += f'''
          <a class="pp-nav-card animate-fade-up anim-delay-{min(n,5)}" href="#prod-{i['id']}" data-target="{i['id']}">
            {img}
            <div class="pp-nav-card__overlay"></div>
            <div class="pp-nav-card__body">
              <span class="pp-nav-card__num">{n:02d}</span>
              <span class="pp-nav-card__title">{L(*title)}</span>
              <span class="pp-nav-card__arrow">{ARROW}</span>
            </div>
          </a>'''
    cols = 3 if len(items) in (5, 6, 9) else min(len(items), 4)
    return f'''
    <section class="pp-nav-cards" id="{first['id']}" aria-labelledby="{first['id']}-title">
      <div class="container">
        <div class="pp-nav-cards__header">
{sh(None, first['h2'], sub=first.get('sub'), center=True, tid=first['id']+'-title')}        </div>
        <div class="pp-nav-cards__grid" style="--cols:{cols}">{cards}
        </div>
      </div>
    </section>
'''

BG = ['pp-section--white', 'pp-section--pale', 'pp-section--dark']

def product(i, n, total, bg):
    eyebrow = i.get('eyebrow') or (f'{n:02d} / {total:02d}', f'{n:02d} / {total:02d}')
    desc = ''.join(f'\n            <p class="pp-split__lead">{L(*p)}</p>' for p in i.get('desc', []))
    checks, cards = '', ''
    for lbl, lst in i.get('subs', []):
        if all(len(x) == 4 for x in lst):           # labeled specs -> icon sub-cards
            cs = ''.join(f'''
          <div class="pp-sub-card">
            <div class="pp-sub-card__icon"><svg viewBox="0 0 24 24">{spec_icon(a)}</svg></div>
            <h4 class="pp-sub-card__h3">{L(a, c)}</h4>
            <p class="pp-sub-card__desc">{L(b, dd)}</p>
          </div>''' for a, b, c, dd in lst)
            cards += f'''        <span class="pp-sub-label">{L(*lbl)}</span>
        <div class="pp-sub-grid" style="--cols:{min(len(lst),4)}">{cs}
        </div>
'''
        else:                                        # plain points -> check list in split
            pts = ''.join(f'\n              <div class="pp-split__benefit"><div class="pp-split__benefit-dot">{CHECK}</div><span class="pp-split__benefit-text">{L(*x)}</span></div>' for x in lst)
            checks += f'''
            <span class="pp-sub-label">{L(*lbl)}</span>
            <div class="pp-split__benefits">{pts}
            </div>'''
    img = f'''
          <div class="pp-split__img-wrap">
            <img src="{i['img']}" alt="{i['alt']}" class="pp-split__img" loading="lazy">
          </div>''' if i.get('img') else ''
    note = f'<p class="pp-section-cta__text">{L(*i["note"])}</p>' if i.get('note') else f'<p class="pp-section-cta__text">{L(*i["h3"])}</p>'
    actions = (btn((i['btn'][0], i['btn'][1], 'contact.html', 'btn--primary')) if i.get('btn') else '') + \
              btn(('تواصل معنا عبر واتساب', 'Contact Us on WhatsApp', WA, 'btn--secondary pp-btn-wa'))
    todo = f'    <!-- TODO(client): {i["todo"]} -->\n' if i.get('todo') else ''
    return f'''
{todo}    <section class="pp-section {bg}" id="prod-{i['id']}" data-product="{i['id']}" aria-labelledby="h-{i['id']}">
      <div class="container">
{sh(eyebrow, i['h3'], tag='h3', tid='h-'+i['id'])}        <div class="pp-split{'' if i.get('img') else ' pp-split--noimg'}">{img}
          <div class="pp-split__content">{desc}{checks}
          </div>
        </div>
{cards}        <div class="pp-section-cta">
          {note}
          <div class="pp-section-cta__actions">{actions}</div>
        </div>
      </div>
    </section>
'''

def group_intro(s):
    return f'''
    <section class="pp-intro-block" id="{s['id']}" aria-labelledby="{s['id']}-title">
      <div class="container">
{sh(None, s['h2'], sub=s.get('sub'), center=True, tid=s['id']+'-title')}      </div>
    </section>
'''

def section_note(s):
    if not (s.get('note') or s.get('btn')): return ''
    t = f'<p class="pp-section-cta__text">{L(*s["note"])}</p>' if s.get('note') else '<span></span>'
    a = btn((s['btn'][0], s['btn'][1], 'contact.html', 'btn--accent')) if s.get('btn') else ''
    return f'''
    <section class="pp-section pp-section--white pp-section--tight">
      <div class="container">
        <div class="pp-section-cta">{t}<div class="pp-section-cta__actions">{a}</div></div>
      </div>
    </section>
'''

def why(s):
    cs = ''.join(f'''
          <div class="pp-why-card">
            <div class="pp-why-card__icon"><svg viewBox="0 0 24 24">{ICONS[i]}</svg></div>
            <h3 class="pp-why-card__title">{L(ta, te)}</h3>
            <p class="pp-why-card__body">{L(ba, be)}</p>
          </div>''' for i, ta, te, ba, be in s['cards'])
    n = len(s['cards']); cols = 4 if n == 4 else (2 if n == 2 else 3)
    note = f'\n        <p class="note-text">{L(*s["note"])}</p>' if s.get('note') else ''
    return f'''
    <section class="pp-why" aria-labelledby="{s['id']}-title">
      <div class="container">
{sh(None, s['h2'], sub=s.get('sub'), center=True, tid=s['id']+'-title')}        <div class="pp-why__grid" style="--cols:{cols}">{cs}
        </div>{note}
      </div>
    </section>
'''

def reviews(s):
    t = f'<p class="pp-cta-final__sub">{L(*s["text"])}</p>' if s.get('text') else ''
    return f'''
    <section class="pp-section pp-section--pale pp-reviews" aria-labelledby="reviews-title">
      <div class="container">
        <div class="pp-section-cta pp-section-cta--center">
          <div>
            <h2 class="pp-sh__title" id="reviews-title">{L(*s['h2'])}</h2>
            {t}
          </div>
          <div class="pp-section-cta__actions">{btn(('اطلع على تقييماتنا في جوجل', 'See Our Google Reviews', GOOGLE, 'btn--accent'))}</div>
        </div>
        <div data-reviews></div>
      </div>
    </section>
'''

def cta(s):
    ps = ''.join(f'\n          <p class="pp-cta-final__sub">{L(*p)}</p>' for p in s['paras'])
    bs = s.get('btns', [('اطلب عرض سعر', 'Request a Quote', 'contact.html', 'btn--white btn--lg'),
                        ('تواصل معنا عبر واتساب', 'Contact Us on WhatsApp', WA, 'btn--outline-white btn--lg')])
    bs = [(a, b, c, d.replace('btn--accent', 'btn--white')) for a, b, c, d in bs]
    return f'''
    <section class="pp-cta-final" aria-labelledby="cta-title">
      <div class="container">
        <div class="pp-cta-final__inner">
          <h2 class="pp-cta-final__h2" id="cta-title">{L(*s['h2'])}</h2>{ps}
          <div class="pp-cta-final__actions">
            {' '.join(btn(b) for b in bs)}
          </div>
        </div>
      </div>
    </section>
'''

def checklist(s):
    cs = ''.join(f'''
          <div class="pp-sub-card pp-sub-card--check">
            <div class="pp-sub-card__icon"><svg viewBox="0 0 24 24">{ICONS['wrench']}</svg></div>
            <p class="pp-sub-card__h3">{L(a, e)}</p>
          </div>''' for a, e in s['items'])
    note = f'\n        <p class="note-text">{L(*s["note"])}</p>' if s.get('note') else ''
    return f'''
    <section class="pp-section {s.get('bg', 'pp-section--white')}" aria-labelledby="{s['id']}-title">
      <div class="container">
{sh(None, s['h2'], center=True, tid=s['id']+'-title')}        <div class="pp-sub-grid" style="--cols:3">{cs}
        </div>{note}
      </div>
    </section>
'''

PIN = '<path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0z"/><circle cx="12" cy="10" r="3"/>'
def cities(s):
    cs = ''.join(f'<li class="city-chip"><svg viewBox="0 0 24 24" aria-hidden="true">{PIN}</svg>{L(a, e)}</li>' for a, e in s['items'])
    note = f'\n        <p class="note-text">{L(*s["note"])}</p>' if s.get('note') else ''
    return f'''
    <section class="pp-section pp-section--dark" aria-labelledby="{s['id']}-title">
      <div class="container">
{sh(None, s['h2'], center=True, tid=s['id']+'-title')}        <ul class="city-chips">{cs}</ul>{note}
      </div>
    </section>
'''

def faq(s):
    return faq_v1(s).replace('class="section section--pale" id="faq"', 'class="pp-faq" id="pp-faq"')

def build(d, draft=False):
    head = B['head'](d).replace('<link rel="stylesheet" href="css/styles.css">',
                               '<link rel="stylesheet" href="css/styles.css">\n  <link rel="stylesheet" href="css/products.css">')
    if draft:
        head = head.replace('<meta name="robots" content="index, follow">', '<meta name="robots" content="noindex, nofollow">')
    types = [s for s in d['sections'] if s['type'] == 'types']
    items = [i for s in types for i in s['items']]
    out = head.replace('  <main id="main-content">', (float_nav(items) if items else '') + '  <main id="main-content">')
    out += header(d) + (trust(d['trust']) if d.get('trust') else '')
    n, bgi, first_done = 0, 0, False
    for s in d['sections']:
        if draft and s.get('draft_label'):
            out += f'\n    <div class="draft-label container"><strong>{s["draft_label"][0]}</strong> — {s["draft_label"][1]}</div>\n'
        t = s['type']
        if t == 'types':
            out += nav_cards(items, s) if not first_done else group_intro(s)
            first_done = True
            for i in s['items']:
                n += 1
                out += product(i, n, len(items), BG[bgi % 3]); bgi += 1
            out += section_note(s)
        elif t == 'cards':   out += why(s)
        elif t == 'steps':   out += steps_v1(s)
        elif t == 'reviews': out += reviews(s)
        elif t == 'faq':     out += faq(s)
        elif t == 'cta':     out += cta(s)
        elif t == 'prose':   out += prose_v1(s)
        elif t == 'checklist': out += checklist(s)
        elif t == 'cities':  out += cities(s)
    out += B['foot'](d).replace('<script src="js/app.js"></script>', '<script src="js/app.js"></script>\n  <script src="js/products.js"></script>')
    return out.replace('<!--SCHEMA-->', schema_block(d) if not draft else '<!-- draft: no schema -->')

if __name__ == '__main__':
    d = runpy.run_path(sys.argv[1])['PAGE']
    draft = '--draft' in sys.argv
    if draft: d = dict(d, file='design-draft.html')
    path = os.path.join(sys.argv[2], d['file'])
    open(path, 'w', encoding='utf8', newline='\n').write(build(d, draft))
    print('built', path)
