// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	base: '/lp-compat',
	integrations: [
		starlight({
			title: 'LP-Tools',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/Flixbox/lp-compat' }],
			sidebar: [
				{
					label: 'Docs',
					autogenerate: { directory: 'docs' },
				},
			],
		}),
	],
});
