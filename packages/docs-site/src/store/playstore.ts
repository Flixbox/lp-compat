import { type App, SCRAPER_BASE_URL } from '@lp-compat/shared'
import { createMutatorStore } from '@/store/_fetcher'

export const $getPlayStoreData = createMutatorStore<string>(
  async ({ data: appId }) => {
    const res = await fetch(`${SCRAPER_BASE_URL}/app`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ appId }),
    })
    if (!res.ok) {
      const text = await res.text()
      throw new Error(
        `Failed to fetch playstore data from scraper: ${res.status} ${text}`,
      )
    }
    return (await res.json()) as App
  },
  { throttleCalls: false },
)

export const $searchPlayStoreData = createMutatorStore<string>(
  async ({ data: query }) => {
    const res = await fetch(`${SCRAPER_BASE_URL}/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ term: query, num: 10 }),
    })
    if (!res.ok) {
      const text = await res.text()
      throw new Error(
        `Failed to search playstore data from scraper: ${res.status} ${text}`,
      )
    }
    return (await res.json()) as App[]
  },
  { throttleCalls: false },
)
