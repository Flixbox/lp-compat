import type { App } from '@lp-compat/shared'
import type { PayloadAction } from '@reduxjs/toolkit'
import { createAction, createSlice } from '@reduxjs/toolkit'

interface DiscordUser {
  MFAEnabled: boolean
  avatar: string
  discriminator: string
  email: null
  flags: number
  id: string
  locale: string
  tag: string
  username: string
}

interface Dialogs {
  EDIT_APP: { open: boolean; appId?: App['appId'] }
}

interface SystemState {
  appsListUpdated: number
  appsListPage: number
  discordUser?: DiscordUser
  discordGuilds?: []
  dialogs: Dialogs
}

const initialState = {
  appsListUpdated: Date.now(),
  appsListPage: 0,
  discordUser: undefined,
  discordGuilds: [],
  dialogs: {
    EDIT_APP: { open: false },
  },
} as SystemState

const clearState = createAction('clear')

const systemSlice = createSlice({
  name: 'system',
  initialState,
  reducers: {
    setAppsListUpdated(state, action: PayloadAction<number>) {
      state.appsListUpdated = action.payload
    },
    setAppsListPage(state, action: PayloadAction<number>) {
      state.appsListPage = action.payload
    },
    openDialog(
      state,
      action: PayloadAction<{ dialog: keyof Dialogs; data: any }>,
    ) {
      state.dialogs[action.payload.dialog] = {
        open: true,
        ...action.payload.data,
      }
    },
    closeDialog(state, action: PayloadAction<{ dialog: keyof Dialogs }>) {
      state.dialogs[action.payload.dialog] = {
        open: false,
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(clearState, (state, action) => initialState)
  },
})

export const { setAppsListUpdated, setAppsListPage, openDialog, closeDialog } =
  systemSlice.actions
export { systemSlice, clearState }
