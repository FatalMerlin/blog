import type { APIRoute } from 'astro';

// Serves /robots.txt. Generated rather than a static public/ file so the public origin stays
// defined in exactly ONE place - `site` in astro.config.mjs - which this reads from the endpoint
// context. Its job is discovery: point every crawler at Starlight's auto-generated sitemap index
// so search engines find the full page list without a manual submission.
//
// Note on Cloudflare: the zone may inject a managed "content signals" robots.txt. When an origin
// robots.txt exists (this one), Cloudflare appends its signal block to ours rather than replacing
// it, so both the Sitemap directive and the signals are served. Verify after the first deploy.
export const GET: APIRoute = ({ site }) => {
	// `site` is guaranteed by the `site` setting in astro.config.mjs; the fallback keeps the
	// endpoint honest if that setting is ever removed.
	const sitemap = site ? new URL('sitemap-index.xml', site).href : '/sitemap-index.xml';

	const body = `User-agent: *
Allow: /

Sitemap: ${sitemap}
`;

	return new Response(body, {
		headers: { 'Content-Type': 'text/plain; charset=utf-8' },
	});
};
