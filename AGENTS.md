# blog - agent guide

A public knowledge base built with Astro Starlight, deployed on Cloudflare Workers. See
[README.md](README.md) for the stack, the authoring loop, and how to add a post.

This file also serves as the repo's `CLAUDE.md` (symlink), so it applies to Claude Code and to
other agents alike.

## Writing posts

Posts are the point of this repo. Each one is a Markdown file under `src/content/docs/`, grouped
into a topic folder. One post solves one problem.

### Before writing or editing any post

This repo enables the `no-ai-slop-writing-rules` plugin (see `.claude/settings.json`). Add its
marketplace once per machine so the plugin resolves:

```
/plugin marketplace add realrossmanngroup/no_ai_slop_writing_rules
```

Invoke both skills before writing or editing post prose, and run the `no-ai-slop` self-check pass
before opening the PR:

- `no-ai-slop-writing-rules:no-ai-slop` - strips AI writing tells (banned words, filler, em-dashes,
  hollow claims, repeated section shapes).
- `no-ai-slop-writing-rules:rossmann-voice` - the house voice: plain, direct, carried by testable
  facts, not adjectives.

### Post shape

Lead with the problem, give the fix, then a short why. Nothing else.

- Open on the symptom or the exact error, quotable as it appears. No warm-up, no "in this post".
- Give the fix as steps or a command block that runs as written.
- Explain the cause only as far as it helps someone apply or adapt the fix. Then stop.
- No conclusion, no sign-off, no sections that do not serve the fix.
- One post, one problem. A second problem is a second post.

Write for a competent peer who hit the same wall, not a beginner. Skip the background they have.

### Evidence

- Use real commands, real output, real version numbers. Show what you ran and what it printed.
- Cite external claims with a URL. If you are unsure, say so; do not fill the gap with a guess.
- When you say one thing differs from another, name the version, flag, or mechanism that makes the
  difference real. If you do not have that detail, do not imply the difference exists.

### Front matter and placement

- `title` and `description` are required. See [README.md](README.md) ("Adding a post") for the
  format and the topic-folder convention.
- The sidebar and search index build themselves from the file tree. A new post needs no config change.

### House rules

- Hyphens in prose, never em-dashes or en-dashes.
- No emoji in post body text.
- Headings name what they hold. They do not tease.

## Development

`npm run dev` serves the site locally with hot reload. See [README.md](README.md) for the full
command list and the deploy settings.

To run the dev server in the background:

```
astro dev --background
```

Manage it with `astro dev stop`, `astro dev status`, and `astro dev logs`.
