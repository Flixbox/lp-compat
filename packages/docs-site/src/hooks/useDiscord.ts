import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useLocalStorage } from 'usehooks-ts'

type DiscordUser = {
  username: string
  id: string
}

type DiscordUserQueryResult = {
  /** Only available if request succeeds (i. e. user is authorized) */
  username?: string
  /** Only available if request succeeds (i. e. user is authorized) */
  id?: string
  /** Only available if request fails (i. e. user is unauthorized) */
  code?: number
  /** Only available if request fails (i. e. user is unauthorized) */
  message?: string
}

const UNAUTHORIZED_MESSAGE = '401: Unauthorized'

const getDiscordLoginUrl = (client_id, redirect_uri) =>
  `https://discord.com/api/oauth2/authorize?client_id=${client_id}&redirect_uri=${encodeURI(
    redirect_uri,
  )}&response_type=token&scope=identify%20guilds%20guilds.members.read`

const useDiscord = () => {
  const [storedDiscordUserAccessToken, setStoredDiscordUserAccessToken] =
    useLocalStorage<string>('storedDiscordUserAccessToken', '')
  const [storedDiscordUserTokenType, setStoredDiscordUserTokenType] =
    useLocalStorage<string>('storedDiscordUserTokenType', '')

  const resetTokens = () => {
    setStoredDiscordUserAccessToken('')
    setStoredDiscordUserTokenType('')
  }

  useEffect(() => {
    let accessToken
    let tokenType
    const fragment = new URLSearchParams(window.location.hash.slice(1))
    ;[accessToken, tokenType] = [
      fragment.get('access_token'),
      fragment.get('token_type'),
    ]

    if (accessToken && tokenType) {
      setStoredDiscordUserAccessToken(accessToken)
      setStoredDiscordUserTokenType(tokenType)

      if (
        storedDiscordUserAccessToken &&
        storedDiscordUserTokenType &&
        localStorage.getItem('storedDiscordUserAccessToken') !== '""' &&
        localStorage.getItem('storedDiscordUserTokenType') !== '""'
      ) {
        // Clear sensitive token from address bar
        const newUrl = window.location.href.split('#')[0]
        location.replace(newUrl)
      }
    }
  }, [storedDiscordUserAccessToken, storedDiscordUserTokenType])

  const { data: discordUser } = useQuery<DiscordUserQueryResult>(
    ['discord'],
    async () =>
      (
        await fetch('https://discord.com/api/v9/users/@me', {
          method: 'GET',
          headers: {
            authorization: `${storedDiscordUserTokenType} ${storedDiscordUserAccessToken}`,
          },
        })
      ).json(),
  )

  useEffect(() => {
    // If the request is unauthorized, the user needs to log in again.
    if (discordUser?.message === UNAUTHORIZED_MESSAGE) resetTokens()
  }, [discordUser?.message])

  const isLoggedIn = Boolean(discordUser?.username && discordUser?.id)

  return { discordUser, isLoggedIn, resetTokens }
}

export { useDiscord, getDiscordLoginUrl, type DiscordUser }
