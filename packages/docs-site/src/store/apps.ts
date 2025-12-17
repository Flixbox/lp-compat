import {
  APPS_WORKER_BASE_URL,
  type App,
  type DiscordUser,
  type EnqueueAppRequest,
} from '@lp-compat/shared'
import { createFetcherStore, createMutatorStore } from '@/store/_fetcher'

export const $apps = createFetcherStore<App[]>(['/apps/read'], {
  fetcher: async () => {
    const response = await fetch(`${APPS_WORKER_BASE_URL}/read`)
    if (!response.ok) throw new Error(`Failed to load apps: ${response.status}`)
    return (await response.json()) as App[]
  },
})

export const $addApp = createMutatorStore<{
  app: App
  discordUser: DiscordUser
}>(async ({ data: { app, discordUser } }) => {
  const requestBody: EnqueueAppRequest = {
    app,
    discordUser: discordUser.user,
  }
  const res = await fetch(`${APPS_WORKER_BASE_URL}/enqueue`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestBody),
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Failed to add app via worker: ${res.status} ${text}`)
  }
  const data = await res.json()
  $apps.revalidate()
  return data
})

export const $editApp = createMutatorStore<{
  app: App
  discordUser: DiscordUser
}>(async ({ data: { app, discordUser } }) => {
  const requestBody: EnqueueAppRequest = {
    app,
    discordUser: discordUser.user,
  }
  const res = await fetch(`${APPS_WORKER_BASE_URL}/enqueue`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestBody),
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Failed to edit app via worker: ${res.status} ${text}`)
  }
  const data = await res.json()
  $apps.revalidate()
  return data
})
