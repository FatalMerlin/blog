---
title: About this site
description: What this site is, why it exists, and how it's maintained.
---

A low-maintenance collection of technical notes: solutions, TILs, and war-stories from
Microsoft 365, Kubernetes, Terraform, and general infrastructure work. The bias is toward
problems that are real, specific, and undocumented elsewhere - the ones where the web turned
up nothing and the fix had to be worked out from scratch.

This is a reference, not a diary. Entries are self-contained and organized by topic, not by
date. There is no comment section, no newsletter, and no tracking.

## How it's built

- **[Astro Starlight](https://starlight.astro.build/)** - a static documentation site generator,
  chosen for built-in search, a sidebar that generates itself from the file tree, and clean
  defaults out of the box.
- **Content is portable Markdown.** Every entry is a plain `.md` file under
  `src/content/docs/`. Nothing about the writing is locked to this generator.
- **Cloudflare Workers** (static assets) builds and hosts it. Every push to `main` deploys; every
  pull request gets its own preview deployment.

See the [README](https://github.com/FatalMerlin/blog#readme) for how a new entry is added.
