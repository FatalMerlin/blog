import { OGImageRoute } from 'astro-og-canvas';
import { getCollection } from 'astro:content';

// Build-time Open Graph card images, one per docs page, via astro-og-canvas (by Starlight's own
// author - see AGENTS.md, "don't reinvent the wheel"). Each map key becomes the route, so an entry
// with id `m365/foo` is served at /open-graph/m365/foo.png. src/routeData.ts points every page's
// og:image / twitter:image at its matching card. Without this, shared links render a blank card:
// Starlight sets og:type=article and twitter:card=summary_large_image but never an og:image.
const entries = await getCollection('docs');

// Key by the collection entry id so the generated route matches what routeData.ts references.
const pages = Object.fromEntries(entries.map((entry) => [entry.id, entry.data]));

export const { getStaticPaths, GET } = await OGImageRoute({
	pages,
	getImageOptions: (_path, page) => ({
		title: page.title,
		description: page.description,
		// Dark, neutral card matching the site's minimal wordmark. Tweak freely - purely cosmetic.
		bgGradient: [
			[13, 17, 23],
			[22, 27, 34],
		],
	}),
});
