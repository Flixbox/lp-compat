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
- The following types/pieces of code are banned: "any", "object", "as unknown as".
- Type everything properly.
- Single quotes, no semicolons
- Prefer `const func = () => {}` over `function func() {}`
- You must document functions & anything exported (constants etc) with JSDoc if you discover them (Use advanced features like @link)
- Default exports are banned, inline exports are banned => `export { HeaderWrapper }` ✅  | [Exception: Certain workers and services as well as some configs require default exports]
- You may only use full alias imports, like `import {stuff} from "@/redux"`
- As for Knip: Sometimes it doesn't detect Astro imports, so you may need to add them manually to knip.json. You may not, however, add any other exports to knip.json. You must delete redundant code.
- We use nanostores, not redux or react-query. Check the @/stores folder when you navigate packages/docs-site. One store per file, split things if you hit this limit. All requests, mutations, and other shared data handling must use nanostores.

## Agent instructions
- When working inside packages/docs-site, always check astro.config.ts first
- Document new functions with JSDoc
- Prefer async/await over callbacks
- After editing any file, check it for issues
- When fixing issues, operate iteratively. Run the lint command and once you see the first batch of issues, fix them. Then continue running the command and fix. No need to get the whole list at once.

