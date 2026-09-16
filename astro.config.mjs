// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	// Canonical public URL. Drives sitemap, canonical <link> tags, and RSS/OG absolute URLs.
	// This is the ONLY place the public origin is hardcoded — change it here (and repoint the
	// custom domain in Cloudflare Pages) to move the site, e.g. to a future Arkanis eng-blog.
	site: 'https://ftdr.dev',
	integrations: [
		starlight({
			// Neutral wordmark. Kept intentionally light/personal so a later rebrand is a one-line change.
			title: 'ftdr.dev',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/FatalMerlin/blog' }],
			// No explicit `sidebar`: Starlight auto-generates it from the src/content/docs file tree.
			// Adding a post (or a topic folder) requires no config change — the sidebar updates itself.
		}),
	],
});
