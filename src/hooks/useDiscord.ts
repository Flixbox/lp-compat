import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import { useQuery } from "react-query";

export type DiscordUser = {
  username: string;
  id: string;
};

// TODO Clean URL bar and move token to persistent state if available
export const useDiscord = () => {
  let accessToken;
  let tokenType;
  if (ExecutionEnvironment.canUseDOM) {
    const fragment = new URLSearchParams(window.location.hash.slice(1));
    [accessToken, tokenType] = [
      fragment.get("access_token"),
      fragment.get("token_type"),
    ];
  }
  const { data: discordUser } = useQuery<DiscordUser>("discord", async () =>
    (
      await fetch("https://discord.com/api/v9/users/@me", {
        method: "GET",
        headers: { authorization: `${tokenType} ${accessToken}` },
      })
    ).json()
  );

  console.log("discordUser", discordUser);

  return { discordUser };
};
