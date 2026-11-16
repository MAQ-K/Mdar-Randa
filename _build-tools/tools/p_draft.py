# Draft design page: garage content + a label above each component explaining the pattern.
import os, runpy, copy
HERE = os.path.dirname(os.path.abspath(__file__))
PAGE = copy.deepcopy(runpy.run_path(os.path.join(HERE, 'p_garage.py'))['PAGE'])
LABELS = {
 'types':   ('A · Product nav cards + B · product sections',
             'Nav cards = image tiles (number, short name, arrow) that scroll to each product. Each product then gets its own section: '
             'numbered eyebrow, H3, image with gradient frame, description, specs as icon sub-cards, and a CTA strip (quote + WhatsApp). '
             'Backgrounds rotate white → pale → dark. A floating pill sub-nav appears once you scroll past the header and highlights the current product.'),
 'cards':   ('C · Feature cards (pp-why)', 'Operation / benefits / "why us" content as icon cards with hover lift.'),
 'steps':   ('D · Numbered steps', 'Installation/inspection steps with numbered badges, after-sales link and inspection CTA.'),
 'reviews': ('E · Reviews strip', 'Google reviews call-out as a highlighted strip (no fake testimonials).'),
 'faq':     ('F · FAQ accordion', 'Approved FAQ, line-separated accordion.'),
 'cta':     ('G · Final CTA', 'Navy band with grid texture, white primary button.'),
 'prose':   ('H · Text block', 'Plain text + labeled list (used for the window-shutter pricing section).'),
}
for s in PAGE['sections']:
    if s['type'] in LABELS: s['draft_label'] = LABELS[s['type']]
PAGE['title_ar'] = PAGE['title_en'] = 'Design Draft — Product Pages'
