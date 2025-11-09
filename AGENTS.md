# AGENTS.md

## Stack
 - Bun only
 - Biome instead of ESLint
 - Monorepo with multiple packages
 - Astro Starlight in @lp-compat/docs-site

## Setup commands
- Install dependencies: `bun i`
- Start dev server: `bun start`

## Code style
- TypeScript strict mode
- Single quotes, no semicolons
- Prefer `const func = () => {}` over `function func() {}`
- You must document functions & anything exported (constants etc) with JSDoc if you discover them (Use advanced features like @link)
- Default exports are banned, inline exports are banned

## Agent instructions
- Document new functions with JSDoc
- Prefer async/await over callbacks

