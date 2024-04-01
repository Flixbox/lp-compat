import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import { usePersistentState } from "react-persistent-state";
import { useQuery } from "react-query";

export type DiscordUser = {
  username: string;
  id: string;
};

// TODO Clean URL bar and move token to persistent state if available
export const useDiscord = () => {
  const [storedDiscordUserAccessToken, setStoredDiscordUserAccessToken] =
    usePersistentState<string>("", {
      storageKey: "storedDiscordUserAccessToken",
    });
  const [storedDiscordUserTokenType, setStoredDiscordUserTokenType] =
    usePersistentState<string>("", {
      storageKey: "storedDiscordUserTokenType",
    });

  console.log("storedDiscordUserAccessToken", storedDiscordUserAccessToken);
  console.log("storedDiscordUserTokenType", storedDiscordUserTokenType);

  if (ExecutionEnvironment.canUseDOM) {
    let accessToken;
    let tokenType;
    const fragment = new URLSearchParams(window.location.hash.slice(1));
    [accessToken, tokenType] = [
      fragment.get("access_token"),
      fragment.get("token_type"),
    ];
    if (accessToken && tokenType) {
      console.log("Setting stored auth ", { accessToken, tokenType });
      setStoredDiscordUserAccessToken(accessToken);
      setStoredDiscordUserTokenType(tokenType);

      if (
        storedDiscordUserAccessToken &&
        storedDiscordUserTokenType &&
        localStorage.getItem("storedDiscordUserAccessToken") !== '""' &&
        localStorage.getItem("storedDiscordUserTokenType") !== '""'
      ) {
        // Clear sensitive token from address bar
        const newUrl = window.location.href.split("#")[0];
        location.replace(newUrl);
      }
    }
  }

  const { data: discordUser } = useQuery<DiscordUser>("discord", async () =>
    (
      await fetch("https://discord.com/api/v9/users/@me", {
        method: "GET",
        headers: {
          authorization: `${storedDiscordUserTokenType} ${storedDiscordUserAccessToken}`,
        },
      })
    ).json()
  );

  console.log("discordUser", discordUser);

  return { discordUser };
};
