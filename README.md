# blog

A low-maintenance public site for technical notes, solutions, and war-stories — the infra and
platform fixes that are real, specific, and undocumented elsewhere (Microsoft 365, Kubernetes,
Terraform, and whatever else bites). It's a reference organized by topic, not a chronological diary.

Live at **https://ftdr.dev**. Built with [Astro Starlight](https://starlight.astro.build/) and
hosted on [Cloudflare Pages](https://pages.cloudflare.com/).

## The authoring loop

The site is designed so the only recurring human effort is clicking **Merge**.

```
Claude writes a post as Markdown  ->  opens a PR  ->  you review the preview + merge  ->  Cloudflare Pages auto-deploys
```

- **Every push to `main`** triggers a production build and deploy to `ftdr.dev`.
- **Every pull request** gets its own isolated preview URL (posted by Cloudflare on the PR), so a
  post can be read exactly as it will look before it's merged.

## Adding a post

A post is a single Markdown file. No config changes are ever needed — the sidebar and search
index rebuild themselves from the file tree.

1. **Create a `.md` file** under `src/content/docs/`. Group by topic using folders; the folder
   name becomes a sidebar section. For example:

   ```
   src/content/docs/kubernetes/dns-resolution-flake.md
   src/content/docs/m365/conditional-access-gotcha.md
   ```

2. **Add front-matter** at the top. `title` and `description` are all that's required:

   ```markdown
   ---
   title: Short, specific title of the problem
   description: One sentence for search results and social/preview cards.
   ---

   Body in Markdown. Lead with the symptom, then the fix, then the why.
   ```

3. **Open a PR.** Check the Cloudflare preview link on the PR, then merge. Done.

That's the whole workflow. Anything Starlight supports (callouts, code blocks with titles,
tabs, diagrams) works in these files — see the [Starlight authoring
docs](https://starlight.astro.build/guides/authoring-content/).

## Local development

Requires Node 22+ (pinned in `.nvmrc`).

```bash
npm install      # once
npm run dev      # local dev server with hot reload at http://localhost:4321
npm run build    # production build into ./dist (what Cloudflare runs)
npm run preview  # serve the built ./dist locally to sanity-check the real output
```

## Deployment

Cloudflare Pages is connected to this repo and builds on every push. Settings:

| Setting | Value |
| --- | --- |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Node version | `22` (from `.nvmrc`) |

The public origin is set in exactly one place — `site` in [`astro.config.mjs`](astro.config.mjs).
To move the site (e.g. to a different domain later), change it there and repoint the custom
domain in Cloudflare Pages; the Markdown content is fully portable and needs no changes.

## Dependencies & maintenance

Dependencies are kept minimal: Astro, Starlight, and `sharp` (image optimization). There is no
CI beyond Cloudflare Pages' own build.

To keep dependencies current with near-zero effort later, drop in
[Renovate](https://docs.renovatebot.com/) — install the GitHub app on this repo and it will open
grouped dependency-update PRs on a schedule, which flow through the same review-and-merge loop as
posts. Nothing else needs to change to adopt it.
