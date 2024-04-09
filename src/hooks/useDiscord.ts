import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import { useLocalStorage } from "usehooks-ts";
import { useQuery } from "react-query";
import { useEffect } from "react";

export type DiscordUser = {
  username: string;
  id: string;
};

export type DiscordUserQueryResult = {
  /** Only available if request succeeds (i. e. user is authorized) */
  username?: string;
  /** Only available if request succeeds (i. e. user is authorized) */
  id?: string;
  /** Only available if request fails (i. e. user is unauthorized) */
  code?: number;
  /** Only available if request fails (i. e. user is unauthorized) */
  message?: string;
};

const UNAUTHORIZED_MESSAGE = "401: Unauthorized";

export const useDiscord = () => {
  const [storedDiscordUserAccessToken, setStoredDiscordUserAccessToken] =
    useLocalStorage<string>("storedDiscordUserAccessToken", "");
  const [storedDiscordUserTokenType, setStoredDiscordUserTokenType] =
    useLocalStorage<string>("storedDiscordUserTokenType", "");

  console.log("storedDiscordUserAccessToken", storedDiscordUserAccessToken);
  console.log("storedDiscordUserTokenType", storedDiscordUserTokenType);

  const resetTokens = () => {
    setStoredDiscordUserAccessToken("");
    setStoredDiscordUserTokenType("");
  };

  useEffect(() => {
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
  }, [storedDiscordUserAccessToken, storedDiscordUserTokenType]);

  const { data: discordUser } = useQuery<DiscordUserQueryResult>(
    "discord",
    async () =>
      (
        await fetch("https://discord.com/api/v9/users/@me", {
          method: "GET",
          headers: {
            authorization: `${storedDiscordUserTokenType} ${storedDiscordUserAccessToken}`,
          },
        })
      ).json()
  );

  useEffect(() => {
    // If the request is unauthorized, the user needs to log in again.
    if (discordUser?.message === UNAUTHORIZED_MESSAGE) resetTokens();
  }, [discordUser?.message]);

  console.log("discordUser", discordUser);

  const isLoggedIn = Boolean(discordUser?.username && discordUser?.id);

  return { discordUser, isLoggedIn };
};
