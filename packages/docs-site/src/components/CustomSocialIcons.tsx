import { useStore } from '@nanostores/react'
import { Providers } from '@/components/Providers'
import { DEFAULT_DISCORD_LOGIN_URL, discordUserQueryStore } from '@/store'

const ExtraNavbarItems = () => {
  const { data } = useStore(discordUserQueryStore)

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
