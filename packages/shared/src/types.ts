interface App {
  appId: string;
  features: string[];
  dateModified: number;
  title: string;
  summary: string;
  installs: string;
  minInstalls: number;
  price: number;
  free: boolean;
  score: number;
  scoreText: string;
  priceText: string;
  androidVersion: string;
  androidVersionText: string;
  developer: string;
  developerId: string;
  genre: string;
  genreId: string;
  icon: string;
  headerImage: string;
  screenshots: string[];
  adSupported: boolean;
  updated: number;
  version: string;
  recentChanges: string;
  url: string;
  offersIAP?: boolean;
  IAPRange?: string;
  editedBy: {
    userName: string;
    userId: string;
  };
}

type DiscordUserQueryResult = {
  /** Only available if request succeeds (i. e. user is authorized) */
  username?: string;
  /** Only available if request succeeds (i. e. user is authorized) */
  id?: string;
  /** Only available if request fails (i. e. user is unauthorized) */
  code?: number;
  /** Only available if request fails (i. e. user is unauthorized) */
  message?: string;
};

type DiscordUser = { isLoggedIn: boolean; user: DiscordUserQueryResult };

interface EnqueueAppRequest {
  app: App;
  discordUser: DiscordUserQueryResult;
}

export type { App, DiscordUserQueryResult, DiscordUser, EnqueueAppRequest };
