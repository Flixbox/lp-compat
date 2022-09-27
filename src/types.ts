export interface App {
  _id: string;
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
  androidVersion: number;
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
  editedBy: {
    userName: string
    userId: string
  }
}
