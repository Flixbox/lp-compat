import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import { usePersistentState } from "react-persistent-state";
import { useQuery } from "react-query";

export type DiscordUser = {
  username: string;
  id: string;
};

export type DiscordUserAuth = {
  accessToken: string;
  tokenType: string;
};

// TODO Clean URL bar and move token to persistent state if available
export const useDiscord = () => {
  const [storedDiscordUserAuth, setStoredDiscordUserAuth] = usePersistentState<
    DiscordUserAuth | undefined
  >(undefined, { storageKey: "discordUserAuth" });

  if (ExecutionEnvironment.canUseDOM) {
    let accessToken;
    let tokenType;
    const fragment = new URLSearchParams(window.location.hash.slice(1));
    [accessToken, tokenType] = [
      fragment.get("access_token"),
      fragment.get("token_type"),
    ];
    if (accessToken && tokenType) {
      setStoredDiscordUserAuth({ accessToken, tokenType });

      // Clear sensitive token from address bar
      const newUrl = window.location.href.split("#")[0];
      location.replace(newUrl);
    }
  }
  const { data: discordUser } = useQuery<DiscordUser>("discord", async () =>
    (
      await fetch("https://discord.com/api/v9/users/@me", {
        method: "GET",
        headers: {
          authorization: `${storedDiscordUserAuth.tokenType} ${storedDiscordUserAuth.accessToken}`,
        },
      })
    ).json()
  );

  console.log("discordUser", discordUser);

  return { discordUser };
};
