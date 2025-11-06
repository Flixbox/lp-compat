const getDiscordLoginUrl = (client_id, redirect_uri) =>
  `https://discord.com/api/oauth2/authorize?client_id=${client_id}&redirect_uri=${encodeURI(
    redirect_uri
  )}&response_type=token&scope=identify%20guilds%20guilds.members.read`;

export { getDiscordLoginUrl };
