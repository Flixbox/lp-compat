import { nanoquery } from '@nanostores/query'

const [createFetcherStore, createMutatorStore] = nanoquery({
  fetcher: (...keys) => fetch(keys.join('')).then((r) => r.json()),
})

export { createFetcherStore, createMutatorStore }
