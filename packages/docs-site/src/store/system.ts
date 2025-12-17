import type { App } from '@lp-compat/shared'
import { atom, map } from 'nanostores'
import { $discordGuilds, $discordUser } from './discord'

export interface Dialogs {
  EDIT_APP: { open: boolean; appId?: App['appId'] }
}

export type DialogKey = keyof Dialogs

export const $dialogs = map<Dialogs>({
  EDIT_APP: { open: false },
})

export const $appsListUpdated = atom<number>(Date.now())

export function openDialog<K extends DialogKey>(
  dialog: K,
  data: Omit<Dialogs[K], 'open'>,
) {
  $dialogs.setKey(dialog, {
    open: true,
    ...data,
  } as Dialogs[K])
}

export function closeDialog(dialog: DialogKey) {
  $dialogs.setKey(dialog, {
    open: false,
  } as Dialogs[DialogKey])
}

export function clearState() {
  $appsListUpdated.set(Date.now())
  $discordUser.set(undefined)
  $discordGuilds.set([])
  $dialogs.set({
    EDIT_APP: { open: false },
  })
}
