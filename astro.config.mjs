import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import rehypeExternalLinks from 'rehype-external-links'

import cloudflare from '@astrojs/cloudflare'

export default defineConfig({
	integrations: [react()],
	output: 'static',

	markdown: {
		rehypePlugins: [
			[
				rehypeExternalLinks,
				{ target: '_blank', rel: ['noopener', 'noreferrer'] },
			],
		],
	},

	adapter: cloudflare(),
})
