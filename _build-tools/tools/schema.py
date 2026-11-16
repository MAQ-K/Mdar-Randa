# usage: schema.py <schema.txt> <page.html> <old-slug> <new-file>
# Replaces <!--SCHEMA--> in page with the approved JSON-LD, URLs fixed to the real file.
import sys, json, html, re
src, page, old, new = sys.argv[1:5]
s = html.unescape(open(src, encoding='utf8').read())
s = s[s.index('{'):s.rindex('}')+1]
s = re.sub(r'https://www\.madaranda\.com/' + re.escape(old.strip('/')) + r'/?(?=[#"])', 'https://www.madaranda.com/' + new, s)
s = s.replace('https://maps.app.goo.gl/zo8PaEZXbD4Shxct9', 'https://share.google/V15DhNAwxAjHoYN1G')
json.loads(s)  # must be valid
p = open(page, encoding='utf8').read()
assert '<!--SCHEMA-->' in p
open(page, 'w', encoding='utf8').write(p.replace('<!--SCHEMA-->', '<script type="application/ld+json">\n' + s + '\n  </script>'))
print('ok', page)
