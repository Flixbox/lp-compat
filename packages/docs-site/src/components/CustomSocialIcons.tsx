import { useStore } from '@nanostores/react'
import { Providers } from '@/components/Providers'
import { $discordUserQuery, DEFAULT_DISCORD_LOGIN_URL } from '@/store'

const ExtraNavbarItems = () => {
  const { data } = useStore($discordUserQuery)

  return (
    <div>
      {data?.isLoggedIn ? (
        data.user.username
      ) : (
        <a href={DEFAULT_DISCORD_LOGIN_URL}>Login</a>
      )}
    </div>
  )
}

const CustomSocialIcons = () => (
  <Providers>
    <ExtraNavbarItems />
  </Providers>
)

export { CustomSocialIcons }
