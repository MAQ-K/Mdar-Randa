// Headless-Chrome QA of deploy/madaranda: JS errors, horizontal overflow, broken images,
// H1 count, mixed-language leaks, oversized images — at 320..1440 px (QA_WIDTHS env to override), Arabic + English. Full-page screenshots.
// usage: node qa.js   (launches Chrome itself, closes it at the end)
const { spawn } = require('child_process');
const fs = require('fs'), path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SITE = path.join(ROOT, 'deploy', 'madaranda');
const SHOTS = path.join(ROOT, 'deploy', 'qa-shots');
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const PORT = 9400 + Math.floor(Math.random() * 500);
const WIDTHS = (process.env.QA_WIDTHS || '320,360,390,414,600,768,1024,1440').split(',').map(Number);
const sleep = ms => new Promise(r => setTimeout(r, ms));

fs.rmSync(SHOTS, { recursive: true, force: true }); fs.mkdirSync(SHOTS, { recursive: true });
const profile = path.join(ROOT, '_build-tools', '.chrome-profile-' + PORT);
const chrome = spawn(CHROME, ['--headless=new', '--disable-gpu', '--no-first-run', '--hide-scrollbars',
  `--remote-debugging-port=${PORT}`, `--user-data-dir=${profile}`, 'about:blank'], { stdio: 'ignore' });

async function connect() {
  for (let i = 0; i < 50; i++) {
    try { const l = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json(); const p = l.find(t => t.type === 'page'); if (p) return p.webSocketDebuggerUrl; } catch (e) {}
    await sleep(200);
  }
  throw new Error('chrome did not start');
}

(async () => {
  const ws = new WebSocket(await connect());
  await new Promise(r => ws.onopen = r);
  let id = 0; const pending = {}; const events = [];
  ws.onmessage = m => { const d = JSON.parse(m.data); if (d.id && pending[d.id]) { pending[d.id](d); delete pending[d.id]; } else events.push(d); };
  const cmd = (method, params = {}) => new Promise(r => { const i = ++id; pending[i] = r; ws.send(JSON.stringify({ id: i, method, params })); });
  const evaluate = async expr => (await cmd('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true })).result?.result?.value;
  await cmd('Page.enable'); await cmd('Runtime.enable'); await cmd('Log.enable');

  const pages = fs.readdirSync(SITE).filter(f => f.endsWith('.html') && (!process.env.QA_PAGES || process.env.QA_PAGES.split(',').includes(f))).sort();
  const report = [];
  for (const page of pages) {
    for (const lang of ['ar', 'en']) {
      for (const w of WIDTHS) {
        await cmd('Emulation.setDeviceMetricsOverride', { width: w, height: 900, deviceScaleFactor: 1, mobile: w < 768 });
        events.length = 0;
        await cmd('Page.navigate', { url: 'file:///' + path.join(SITE, page).replace(/\\/g, '/') });
        await sleep(1400);
        await evaluate(`try{localStorage.setItem('madar-lang','${lang}')}catch(e){}; window.MadarApp && MadarApp.setLang('${lang}'); true`);
        await sleep(400);
        // reveal scroll-animated content so screenshots and measurements see the final layout
        await evaluate(`document.querySelectorAll('.animate-fade-up,.animate-fade-in,.animate-scale,.animate-slide-left,.animate-slide-right').forEach(e=>e.classList.add('animated')); true`);
        await evaluate(`document.querySelectorAll('img[loading=lazy],iframe[loading=lazy]').forEach(i=>i.loading='eager'); true`);
        await evaluate(`Promise.race([Promise.all([...document.images].map(i=>i.complete?1:new Promise(r=>{i.onload=i.onerror=r}))), new Promise(r=>setTimeout(r,4000))]).then(()=>true)`);
        await sleep(500);
        const r = await evaluate(`(() => {
          const vw = document.documentElement.clientWidth;
          const over = [];
          document.querySelectorAll('body *').forEach(el => {
            const s = getComputedStyle(el); if (s.position === 'fixed' || s.display === 'none' || s.visibility === 'hidden') return;
            const b = el.getBoundingClientRect(); if (!b.width) return;
            let clipped = false; for (let p = el.parentElement; p && p !== document.body; p = p.parentElement) { const ps = getComputedStyle(p); if (/(auto|scroll|hidden|clip)/.test(ps.overflowX)) { clipped = true; break; } }
            if (!clipped && (b.right > vw + 1 || b.left < -1)) over.push((el.className && typeof el.className === 'string' ? '.' + el.className.split(' ')[0] : el.tagName) + ' [' + Math.round(b.left) + '..' + Math.round(b.right) + ']');
          });
          const broken = [...document.images].filter(i => i.naturalWidth === 0 && i.getAttribute('src')).map(i => i.getAttribute('src'));
          const other = document.documentElement.dir === 'rtl' ? '.lang-en' : '.lang-ar';
          const leaks = [...document.querySelectorAll(other)].filter(e => e.getClientRects().length && getComputedStyle(e).display !== 'none').length;
          const bigImgs = [...document.images].filter(i => { const b = i.getBoundingClientRect(); const s = getComputedStyle(i); return b.width && s.display !== 'none' && !i.closest('.hs__bg-video') && (innerWidth < 768 ? b.height > 460 : b.height > 720); })
            .map(i => (i.parentElement.className + '>' + i.className + ' ' + (i.getAttribute('src') || '').split('/').pop()) + ' ' + Math.round(i.getBoundingClientRect().width) + 'x' + Math.round(i.getBoundingClientRect().height));
          return { bigImgs: [...new Set(bigImgs)].slice(0, 4), scrollW: document.documentElement.scrollWidth, vw, over: [...new Set(over)].slice(0, 14), broken, h1: document.querySelectorAll('h1').length, leaks, dir: document.documentElement.dir };
        })()`);
        const errs = events.filter(e => e.method === 'Runtime.exceptionThrown' || (e.method === 'Log.entryAdded' && e.params.entry.level === 'error' && !/favicon|ERR_NAME|net::|googleapis|unpkg/.test(e.params.entry.text)))
          .map(e => e.method === 'Runtime.exceptionThrown' ? (e.params.exceptionDetails.exception?.description || e.params.exceptionDetails.text) : e.params.entry.text);
        const issues = [];
        if (r.scrollW > r.vw + 1) issues.push(`page scrolls sideways (${r.scrollW}px > ${r.vw}px)`);
        if (r.over.length) issues.push('overflowing: ' + r.over.join(', '));
        if (r.bigImgs.length) issues.push('big images: ' + r.bigImgs.join(', '));
        if (r.broken.length) issues.push('broken images: ' + r.broken.join(', '));
        if (r.h1 !== 1) issues.push('h1 count ' + r.h1);
        if (r.leaks) issues.push(r.leaks + ' other-language elements visible');
        if (r.dir !== (lang === 'ar' ? 'rtl' : 'ltr')) issues.push('dir is ' + r.dir);
        if (errs.length) issues.push('JS errors: ' + [...new Set(errs)].join(' | ').slice(0, 300));
        report.push({ page, lang, w, issues });
        if (lang === 'ar' && (w === 390 || w === 1440 || process.env.QA_SHOT_ALL)) {
          const shot = await cmd('Page.captureScreenshot', { format: 'jpeg', quality: 55, captureBeyondViewport: true });
          if (shot.result) fs.writeFileSync(path.join(SHOTS, `${page.replace('.html', '')}-${w}.jpg`), Buffer.from(shot.result.data, 'base64'));
        }
      }
    }
  }
  const bad = report.filter(x => x.issues.length);
  console.log(`checked ${report.length} page/lang/width combinations; with issues: ${bad.length}`);
  bad.forEach(x => console.log(`- ${x.page} [${x.lang} ${x.w}px] ${x.issues.join(' ; ')}`));
  ws.close(); chrome.kill();
  process.exit(0);
})().catch(e => { console.error(e); chrome.kill(); process.exit(1); });
