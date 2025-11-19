import {
  APPS_WORKER_BASE_URL,
  type App,
  type DiscordUser,
  SCRAPER_BASE_URL,
} from '@lp-compat/shared'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { clearState, setAppsListPage } from '@/redux/systemSlice'

const pageSize = 5000

const fetchApps = createAsyncThunk('apps/all', async () => {
  const response = await fetch(`${APPS_WORKER_BASE_URL}/read`)
  if (!response.ok) throw new Error(`Failed to load apps: ${response.status}`)
  return (await response.json()) as App[]
})

const fetchApp = createAsyncThunk<any, { appId: string }>(
  'apps/get',
  async ({ appId }) => {
    const response = await fetch(`${APPS_WORKER_BASE_URL}/read`)
    if (!response.ok) throw new Error(`Failed to load apps: ${response.status}`)
    const data = (await response.json()) as App[]
    return data.find((a) => a.appId === appId)
  },
)

const fetchAppsByPage = createAsyncThunk<any, { page: number }>(
  'apps/page',
  async ({ page }, thunkAPI) => {
    const response = await fetch(`${APPS_WORKER_BASE_URL}/read`)
    if (!response.ok) throw new Error(`Failed to load apps: ${response.status}`)
    const data = (await response.json()) as App[]
    const start = page * pageSize
    const pageSlice = data.slice(start, start + pageSize)
    thunkAPI.dispatch(setAppsListPage(page + 1))
    return pageSlice
  },
)

const fetchAppCount = createAsyncThunk('apps/count', async () => {
  const response = await fetch(`${APPS_WORKER_BASE_URL}/read`)
  if (!response.ok) throw new Error(`Failed to load apps: ${response.status}`)
  const data = (await response.json()) as App[]
  return data.length
})

const addApp = createAsyncThunk<any, { app: App; discordUser: DiscordUser }>(
  'apps/add',
  async ({ app, discordUser }) => {
    // The worker expects the App object and discordUser in the request body at /enqueue.
    const res = await fetch(`${APPS_WORKER_BASE_URL}/enqueue`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ app, discordUser: discordUser.user }),
    })
    if (!res.ok) {
      const text = await res.text()
      throw new Error(`Failed to add app via worker: ${res.status} ${text}`)
    }
    return await res.json()
  },
)

const editApp = createAsyncThunk<any, { app: App; discordUser: DiscordUser }>(
  'apps/edit',
  async ({ app, discordUser }) => {
    // The worker expects the App object and discordUser in the request body at /enqueue.
    const res = await fetch(`${APPS_WORKER_BASE_URL}/enqueue`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ app, discordUser: discordUser.user }),
    })
    if (!res.ok) {
      const text = await res.text()
      throw new Error(`Failed to edit app via worker: ${res.status} ${text}`)
    }
    return await res.json()
  },
)

const getPlayStoreData = createAsyncThunk<any, { appId: string }>(
  'playstore/get',
  async ({ appId }) => {
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
    return await res.json()
  },
)

const searchPlayStoreData = createAsyncThunk<any, { query: string }>(
  'playstore/search',
  async ({ query }) => {
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
    return await res.json()
  },
)

// Define the initial state using that type
const initialState: App[] = []

const appsSlice = createSlice({
  name: 'apps',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(clearState, (state, action) => initialState)
    builder.addCase(fetchApps.fulfilled, (state, action) => action.payload)
    builder.addCase(fetchApp.fulfilled, (state, action) => {
      const index = state.findIndex((app) => action.payload.appId === app.appId)
      if (index < 0) state.push(action.payload)
      state[index] = action.payload
    })
    builder.addCase(fetchAppsByPage.fulfilled, (state, action) => {
      return [...state, ...action.payload]
    })
  },
})

export {
  appsSlice,
  searchPlayStoreData,
  getPlayStoreData,
  editApp,
  fetchApps,
  addApp,
}
