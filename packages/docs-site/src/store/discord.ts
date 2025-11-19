import {
  DISCORD_CLIENT_ID,
  DISCORD_OAUTH_REDIRECT_URI,
  type DiscordUser,
  type DiscordUserQueryResult,
} from '@lp-compat/shared'
import { persistentAtom } from '@nanostores/persistent'
import { createFetcherStore } from '@/store/_fetcher'

const DISCORD_USER_QUERY_URL = 'https://discord.com/api/v9/users/@me'

const UNAUTHORIZED_MESSAGE = '401: Unauthorized'

const getDiscordLoginUrl = (client_id: string, redirect_uri: string) =>
  `https://discord.com/api/oauth2/authorize?client_id=${client_id}&redirect_uri=${encodeURI(
    redirect_uri,
  )}&response_type=token&scope=identify%20guilds%20guilds.members.read`

const DEFAULT_DISCORD_LOGIN_URL = getDiscordLoginUrl(
  DISCORD_CLIENT_ID,
  DISCORD_OAUTH_REDIRECT_URI,
)

const persistedDiscordUserAccessToken = persistentAtom<string>(
  'persistedDiscordUserAccessToken',
  '',
)
const persistedDiscordUserTokenType = persistentAtom<string>(
  'persistedDiscordUserTokenType',
  '',
)

/**
 * When the page loads, the user might've navigated here from a Discord login flow.
 * Set the state and clear the address bar.
 */

let accessToken: string | null
let tokenType: string | null

// Guard against SSR
if (typeof window !== 'undefined') {
  const fragment = new URLSearchParams(window.location.hash.slice(1))
  ;[accessToken, tokenType] = [
    fragment.get('access_token'),
    fragment.get('token_type'),
  ]

  if (accessToken && tokenType) {
    persistedDiscordUserAccessToken.set(accessToken)
    persistedDiscordUserTokenType.set(tokenType)

    if (
      persistedDiscordUserAccessToken.get() &&
      persistedDiscordUserTokenType.get()
    ) {
      // Clear sensitive token from address bar
      const newUrl = window.location.href.split('#')[0]
      location.replace(newUrl)
    }
  }
}

const resetTokens = () => {
  persistedDiscordUserAccessToken.set('')
  persistedDiscordUserTokenType.set('')
}

const discordUserQueryStore = createFetcherStore<DiscordUser>(
  [DISCORD_USER_QUERY_URL],
  {
    fetcher: async () => {
      const result: DiscordUserQueryResult = await (
        await fetch(DISCORD_USER_QUERY_URL, {
          method: 'GET',
          headers: {
            authorization: `${persistedDiscordUserTokenType.get()} ${persistedDiscordUserAccessToken.get()}`,
          },
        })
      ).json()
      if (result?.message === UNAUTHORIZED_MESSAGE) resetTokens()
      return {
        user: result,
        isLoggedIn: Boolean(result?.username && result?.id),
      }
    },
  },
)

export { discordUserQueryStore, getDiscordLoginUrl, DEFAULT_DISCORD_LOGIN_URL }
