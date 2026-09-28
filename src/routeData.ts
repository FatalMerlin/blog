import { defineRouteMiddleware } from '@astrojs/starlight/route-data';

// Per-page SEO head tags Starlight does not emit on its own:
//   1. og:image / twitter:image -> the build-time card from src/pages/open-graph (astro-og-canvas)
//   2. JSON-LD TechArticle structured data (skipped on the splash home page - not an article)
//
// Added through route-data middleware rather than a Head component override on purpose: Starlight
// documents the Head override as a last resort and the route `head` array as the sanctioned hook
// for per-page tags. Registered via `routeMiddleware` in astro.config.mjs.
export const onRequest = defineRouteMiddleware((context) => {
	const { entry, head } = context.locals.starlightRoute;
	const site = context.site;
	// No origin configured means no absolute URLs to emit; leave the head untouched.
	if (!site) return;

	const canonical = new URL(context.url.pathname, site).href;
	// Starlight reports the home page's entry id as '' whereas the content collection (and so the
	// og-image route in src/pages/open-graph) keys it as 'index'; reconcile so the home card resolves.
	const ogKey = entry.id || 'index';
	const ogImage = new URL(`open-graph/${ogKey}.png`, site).href;

	head.push(
		{ tag: 'meta', attrs: { property: 'og:image', content: ogImage } },
		{ tag: 'meta', attrs: { name: 'twitter:image', content: ogImage } }
	);

	// The home page uses the `splash` template: a landing page, not a technical article. Tagging it
	// as a TechArticle would misdescribe it, so emit the article schema only for real content pages.
	if (entry.data.template === 'splash') return;

	const schema = {
		'@context': 'https://schema.org',
		'@type': 'TechArticle',
		headline: entry.data.title,
		...(entry.data.description ? { description: entry.data.description } : {}),
		url: canonical,
		inLanguage: 'en',
		// lastUpdated is a Date only when set explicitly in front matter; otherwise omit dateModified.
		...(entry.data.lastUpdated instanceof Date
			? { dateModified: entry.data.lastUpdated.toISOString() }
			: {}),
	};

	head.push({
		tag: 'script',
		attrs: { type: 'application/ld+json' },
		content: JSON.stringify(schema),
	});
});
