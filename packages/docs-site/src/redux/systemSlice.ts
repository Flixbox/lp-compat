import type { App, DiscordUserQueryResult } from '@lp-compat/shared'
import type { PayloadAction } from '@reduxjs/toolkit'
import { createAction, createSlice } from '@reduxjs/toolkit'

interface Dialogs {
  EDIT_APP: { open: boolean; appId?: App['appId'] }
}

interface SystemState {
  appsListUpdated: number
  appsListPage: number
  discordUser?: DiscordUserQueryResult
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
    /**
     * Opens a dialog with the provided data.
     */
    openDialog(
      state,
      action: PayloadAction<
        {
          [K in keyof Dialogs]: {
            dialog: K
            data: Omit<Dialogs[K], 'open'>
          }
        }[keyof Dialogs]
      >,
    ) {
      const { dialog, data } = action.payload
      state.dialogs[dialog] = {
        open: true,
        ...data,
      } as Dialogs[keyof Dialogs]
    },
    closeDialog(state, action: PayloadAction<{ dialog: keyof Dialogs }>) {
      state.dialogs[action.payload.dialog] = {
        open: false,
      } as Dialogs[keyof Dialogs]
    },
  },
  extraReducers: (builder) => {
    builder.addCase(clearState, () => initialState)
  },
})

export const { setAppsListPage, openDialog, closeDialog } = systemSlice.actions
export { systemSlice, clearState }
