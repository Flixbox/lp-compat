import { nanoquery } from '@nanostores/query'

const [createFetcherStore, _createMutatorStore] = nanoquery({
  fetcher: (...keys) => fetch(keys.join('')).then((r) => r.json()),
})

export { createFetcherStore }
