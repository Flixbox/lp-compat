import { persistentAtom } from '@nanostores/persistent'

export const $persistedAppsTitleFilter = persistentAtom<string>(
  'appsTitleFilter',
  '',
)

export const APPS_SORTING_OPTIONS = [
  'name-asc',
  'installs-asc',
  'date-modified',
] as const

export type AppsSorting = (typeof APPS_SORTING_OPTIONS)[number]

export const $persistedAppsSorting = persistentAtom<AppsSorting>(
  'apps-sorting',
  'installs-asc',
  {
    encode: (value) => value,
    decode: (value) => {
      return APPS_SORTING_OPTIONS.includes(value as AppsSorting)
        ? (value as AppsSorting)
        : 'installs-asc'
    },
  },
)

// Default visibility settings
const DEFAULT_VISIBILITY = ['compatible', 'unclear-iap', 'incompatible']

export const $persistedAppsVisibilitySettings = persistentAtom<string[]>(
  'onlyShowTheseVisibilitySettings',
  DEFAULT_VISIBILITY,
  {
    encode: JSON.stringify,
    decode: JSON.parse,
  },
)
