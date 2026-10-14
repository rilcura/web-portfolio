# Ivan’s Builder Island

A responsive pixel island portfolio for Randzel Ivan Cura, Mobile & Full-Stack Engineer.

Live site: https://rilcura.github.io/web-portfolio/

## Run locally

Use Node.js 22 or later.

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite, including `/web-portfolio/`.

```sh
npm run build
npm run preview
```

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
- The CV is intentionally marked as coming soon. When a public CV is ready, put it in `public` and replace the placeholder in `src/main.tsx` with a download link using `import.meta.env.BASE_URL`.

Professional summaries are based on the owner-supplied LinkedIn export. Placeholder projects are not claims of completed work. Confidential code and product materials are excluded.

## Hosting

GitHub Pages uses the workflow in `.github/workflows/deploy.yml`. A push to `main` runs the TypeScript check, production build, and deployment. The Vite base path is `/web-portfolio/`; update it if the repository name or hosting path changes. Navigation uses section anchors and requires no server routing.

The site uses local SVG artwork, system fonts, no analytics, no backend, and no autoplay audio. Reduced-motion preferences disable animation and smooth scrolling. Existing repository history is preserved.
