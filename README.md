# Ivan’s Builder Island

A responsive pixel island portfolio for Randzel Ivan Cura, Mobile & Full-Stack Engineer.

Live site: https://rilcura.github.io/web-portfolio/

## Run locally

Use Node.js 22.18 or later.

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite, including `/web-portfolio/`.

```sh
npm run build
npm run preview
```

## Explore on foot

Choose **Explore on foot** to focus the island. Use arrow keys or WASD to walk, and press E or Enter near a landmark to visit its section. On-screen direction buttons work with touch, mouse, or keyboard. Escape pauses movement; **Back to start** returns the character to its starting position. Leaving the exploration controls, changing tabs, or switching windows pauses movement.

The shoreline, pond, tree trunks, and buildings block walking. Each landmark has a nearby visit prompt and a session-only explored checkmark. Clicking a landmark or using E/Enter opens its themed popup without changing the page location or character position. Mobile and systems popups share the same project cards and content as the main gallery; other stops show career, education, or hobbies. Close with Escape, the close button, Back to the island, or a backdrop click. Focus returns to the opening control; use Explore on foot to resume walking. The main navigation and full-page sections remain available without playing. Reduced-motion preferences disable walking, popup, and scenery animations while preserving controls. No exploration data is stored or transmitted.

Run `npm test` for movement, collision, landmark proximity, and reachability checks. These also run before deployment. World geometry and landmark positions live in `src/island-world.ts`; update the geometry alongside the artwork if the map changes.

On phones, the readable **Choose a stop** directory offers all five landmarks below the movement controls. Direction and popup-close buttons have 48px targets. Project shortcuts reveal their cards even when the gallery filter hides them and the URL already points to that same project.

## Add your next project

Edit `src/content/projects.ts`. Add a project with a unique `id`, a `title`, a short `summary`, your `contribution` array, and `technologies`. Choose `district: 'mobile'` or `'systems'`. It automatically appears in the project gallery, filter counts, and the district’s list. Set `featured: true` to place it before other entries.

Use `kind: 'Personal project'` or `'Career contribution'`. Use `status: 'construction'` for a clearly marked placeholder or `'published'` for a real contribution. Construction cards intentionally do not show external links or achievement summaries.

Optional `images` are `{ src: 'images/example.webp', alt: 'A useful description' }`; place these files in `public/images`. Optional `links` are `{ label: 'View demo', url: 'https://...' }`. Only publish details, screenshots, and source code you are permitted to share. React renders content as text rather than HTML.

Example:

```ts
{
  id: 'my-new-app',
  title: 'My new app',
  summary: 'What the app does and who it helps.',
  contribution: ['What I personally designed or implemented.'],
  technologies: ['React', 'TypeScript'],
  district: 'systems',
  kind: 'Personal project',
  featured: true,
  status: 'published',
  links: [{ label: 'Source code', url: 'https://github.com/your-repository' }],
}
```

## Other content

- `src/content/profile.ts`: introduction, contact details, qualities, and skills.
- `src/content/career.ts`: employment and education.
- `src/content/hobbies.ts`: add `{ title, description }` entries to replace the campfire placeholder automatically.
- `src/content/team-moments.ts`: Career Trail team photos and captions. The featured image appears alongside the China Bank role; extra photos are in More team moments. Responsive WebP copies live in `public/images/team`; keep full-frame proportions, descriptive alt text, and only publish photos cleared for sharing.
- The CV is intentionally marked as coming soon. When a public CV is ready, put it in `public` and replace the placeholder in `src/main.tsx` with a download link using `import.meta.env.BASE_URL`.

Professional summaries are based on the owner-supplied LinkedIn export. Placeholder projects are not claims of completed work. Confidential code and product materials are excluded.

## Hosting

GitHub Pages uses the workflow in `.github/workflows/deploy.yml`. A push to `main` runs the TypeScript check, production build, and deployment. The Vite base path is `/web-portfolio/`; update it if the repository name or hosting path changes. Navigation uses section anchors and requires no server routing.

The site uses local SVG artwork, system fonts, aggregate visit/contact-click counters, and no autoplay audio. Reduced-motion preferences disable animation and smooth scrolling. Existing repository history is preserved.

The About section displays the owner-supplied portrait with responsive local WebP copies in public/images/profile, a portrait frame, descriptive alt text, and lazy loading. The original photograph is preserved outside the repository. Say hello opens the email, LinkedIn and GitHub contact dialog. The decorative duck pauses during dialogs and stays still when reduced motion is enabled.

Education locations were checked against the institutions' published information: [Auckland International Campus](https://auckland.op.ac.nz/enquire) and [University of the Assumption](https://web.ua.edu.ph/about/). The bootcamp location remains unspecified.
Shared visit and contact-click counters use a dedicated GoatCounter site. See COUNTERS.md for counting semantics, privacy settings and maintenance.
