# raheeb.xyz / hoenchioma.github.io

Personal site of Raheeb Hassan, built with [Astro](https://astro.build) and deployed to GitHub Pages.

## Develop

Requires Node.js 22.12 or newer and npm 9.6.5 or newer (Astro 7's minimum).

```bash
npm install
npm run dev            # http://localhost:4321
npm run build          # fetch publications, then build to dist/
npm run build:offline  # build without fetching publications
```

## Editing content

Almost everything lives in `src/data/`:

| File | What it controls |
| --- | --- |
| `log.yaml` | News log. Home shows the latest four; Journey shows all. Acceptances and milestones only. |
| `experience.yaml`, `education.yaml` | Journey page and both timelines (`timeline.row` picks the row, `kind` the colour). Experience sorts newest first; `order: 1` pins an entry to the top. |
| `achievements.yaml` | Achievements page; `home: true` puts an item on the landing page, `photo` adds it to the Moments carousel. |
| `skills.yaml`, `projects.yaml` | Achievements (skills) and Projects pages. |
| `art.yaml` + `src/assets/art/` | Art gallery; `home: true` shows a piece on the landing page. |
| `publications.overrides.yaml` | Curation for papers (see below). |
| `site.ts` | Name, home page intro, email, social links, navigation. |

Images go in `src/assets/` and are resized and compressed at build time. The CV is `public/files/resume.pdf`.

## Publications

Papers are fetched from Semantic Scholar by `scripts/fetch-publications.mjs` into
`src/data/publications.cache.json` (committed, so builds work offline). The site
rebuilds weekly via GitHub Actions to pick up new papers.

`src/data/publications.overrides.yaml` wins over fetched data: venue and status
(e.g. `accepted`), topic tags, one-line summaries, highlight notes, extra links,
author-name fixes, and `mergeInto` for duplicate records (citations are summed).
The home page picks the newest papers and the most cited ones automatically.

## Deploy

Pushing to `master` builds and deploys via `.github/workflows/deploy.yml`.
