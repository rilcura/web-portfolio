import { useEffect, useState } from 'react';
import { profile } from './content/profile';
import { contactPaths, eventUrl, readCount, visitPath } from './counter';

let visitSent = false;
function send(path: string, event = false) {
  // Local previews and headless QA never pollute production totals.
  if (location.hostname !== 'rilcura.github.io' || navigator.webdriver) return;
  void fetch(eventUrl(path, event), { method: 'POST', mode: 'no-cors',
    credentials: 'omit', referrerPolicy: 'no-referrer', keepalive: true,
  }).catch(() => {});
}

export function VisitCounter() {
  const [totals, setTotals] = useState<{visits?: number; clicks?: number}>({});
  useEffect(() => {
    let active = true;
    if (!visitSent) { visitSent = true; send(visitPath); }
    const refresh = () => {
      void readCount(visitPath).then(visits => { if (active) setTotals(old => ({...old, visits})); }).catch(() => {});
      void Promise.all(contactPaths.map(path => readCount(path, true))).then(counts => {
        if (active) setTotals(old => ({...old, clicks: counts.reduce((a,b) => a+b,0)}));
      }).catch(() => {});
    };
    refresh();
    // Counts persist asynchronously. Refresh twice, without continuous polling.
    const timers = [15000, 60000].map(delay => window.setTimeout(refresh, delay));
    const onClick = (event: MouseEvent) => {
      const link = event.target instanceof Element ? event.target.closest('a') : null;
      if (!link) return;
      const path = link.href === `mailto:${profile.email}` ? contactPaths[0] :
        link.href === profile.linkedin ? contactPaths[1] : link.href === profile.github ? contactPaths[2] : undefined;
      if (path) send(path, true);
    };
    document.addEventListener('click', onClick, true);
    return () => { active = false; timers.forEach(clearTimeout); document.removeEventListener('click', onClick, true); };
  }, []);
  return <div className="site-counter" aria-label="Island activity">
    <span aria-hidden="true">⚑</span>
    <span><strong>{totals.visits?.toLocaleString() ?? '—'}</strong> visits</span>
    <span><strong>{totals.clicks?.toLocaleString() ?? '—'}</strong> contact clicks</span>
    <small>Page loads &amp; contact-link clicks · totals may lag up to 4 hours</small>
    <small>Cookie-free counts via <a href="https://www.goatcounter.com/privacy" target="_blank" rel="noreferrer">GoatCounter</a>. A dash means stats are unavailable.</small>
  </div>;
}
