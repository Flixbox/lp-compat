import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'
import react from '@astrojs/react'
import mdx from '@astrojs/mdx'
import babel from 'esbuild-plugin-babel'

// https://astro.build/config
export default defineConfig({
  base: '/lp-compat',
  integrations: [
    react(),
    starlight({
      title: 'LP-Tools',
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/Flixbox/lp-compat',
        },
      ],
      sidebar: [
        {
          label: 'Docs',
          autogenerate: { directory: 'docs', collapsed: false },
        },
      ],
    }),
    mdx(),
  ],
  vite: {
    plugins: [babel()],
  },
})
