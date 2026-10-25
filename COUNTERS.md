# Portfolio counters

Provider: https://rilcura-portfolio.goatcounter.com/ (owner login required for the dashboard). This is separate from the owner's Marchy's Cove sites. Cloudflare is not used.

- `/web-portfolio`: document loads, including reloads. This is GoatCounter's canonical path without a trailing slash; the hosted site still uses `/web-portfolio/`. Hash navigation, filters and opening a popup do not add visits.
- `contact-email`, `contact-linkedin`, `contact-github`: link activations from the contact section or popup. Keyboard activations count too. The footer adds these three event totals.
- Counts begin at activation, not the original launch. They are approximate: blockers, failed requests, bots and manual requests affect totals. They are not unique people. Counters persist asynchronously and the public endpoint caches responses for up to four hours. Use the private dashboard for fresher numbers. No optimistic increments or write retries fabricate totals.
- The frontend refreshes on load, after 15 seconds and after 60 seconds. An unavailable count displays a dash; a missing event path means no clicks yet. Navigation always works independently of the counter.

## Privacy and configuration

Only fixed path names, a generic title and the no-session flag are submitted using the documented `/count` endpoint. Cookies and referrers are omitted; no query strings, email addresses or screen dimensions are sent. GoatCounter necessarily receives network information to serve requests. No private token or external JavaScript is embedded.

Verified site settings: public visitor counters enabled; dashboard only accessible to logged-in users. Individual pageviews, sessions, referrers, user-agent details, screen size, country, region and language collection are disabled. Public totals are intentionally visible, but the dashboard stays private.

Local previews do not submit events. They may read public totals. Production release verification contributes genuine test loads/clicks to the totals; these are not unique-visitor counts. A separate `qa-connection-check` event tests service connectivity and is excluded from both displayed totals. To change provider or domain update `src/counter.ts` and the hostname guard in `src/VisitCounter.tsx`. Contact URLs come from `src/content/profile.ts`. To disable all collection and display, remove `<VisitCounter/>` from `src/main.tsx`.

Checks: `npm test`, `npm run build`; then verify the footer at desktop and mobile widths, click one actual contact link and check its event in the owner dashboard. Ad-blocked traffic may not count. Some browsers block mail apps when none is configured, which does not affect the event listener.

References: [collection parameters](https://www.goatcounter.com/help/js), [events](https://www.goatcounter.com/help/events), [public counter](https://www.goatcounter.com/help/visitor-counter).
