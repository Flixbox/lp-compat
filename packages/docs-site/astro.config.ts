import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'
import react from '@astrojs/react'
import mdx from '@astrojs/mdx'
import babel from 'esbuild-plugin-babel'
import { visit, type Root } from '@astrojs/starlight/expressive-code/hast'

const BASE_PATH = '/lp-compat/'

/**
 * Create a rehype plugin that prefixes root-relative <a href="/..."> links
 * with the provided base path (e.g., "/lp-compat/").
 */
function rehypePrefixBase(base = BASE_PATH) {
  normalizeBase(base)

  return function attacher() {
    return function transformer(tree: Root) {
      visit(tree, 'element', (node) => {
        if (node.tagName !== 'a') return
        const props = node.properties ?? {}
        const href = typeof props.href === 'string' ? props.href : undefined
        if (!href) return

        if (isExternal(href) || isRelative(href)) return

        props.href = base + href.slice(1)
        node.properties = props
      })
    }
  }
}

/** Validate and normalize the base string at definition time. */
function normalizeBase(base: string): void {
  if (!base.startsWith('/') || !base.endsWith('/')) {
    throw new Error(
      `Invalid base "${base}". It must start and end with "/". Example: "/lp-compat/".`,
    )
  }
}

/** Check if a URL is external (absolute). */
function isExternal(href: string): boolean {
  return /^https?:\/\//i.test(href)
}

/** Check if a URL is relative (starts with "./" or "../"). */
function isRelative(href: string): boolean {
  return /^\.{1,2}\//.test(href)
}

// https://astro.build/config
export default defineConfig({
  base: BASE_PATH,
  site: 'https://flixbox.github.io/lp-compat/',
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
  markdown: {
    rehypePlugins: [rehypePrefixBase()],
  },
  vite: {
    plugins: [babel()],
  },
})
