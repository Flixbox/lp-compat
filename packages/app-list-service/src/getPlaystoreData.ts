import { SCRAPER_BASE_URL } from "@lp-compat/shared";

export interface PlayStoreData {
  appId?: string;
  title?: string;
  summary?: string;
  installs?: string | number;
  minInstalls?: number;
  price?: number;
  free?: boolean;
  score?: number;
  scoreText?: string;
  priceText?: string;
  androidVersion?: string | number;
  androidVersionText?: string;
  developer?: string;
  developerId?: string;
  genre?: string;
  genreId?: string;
  icon?: string;
  headerImage?: string;
  screenshots?: string[];
  adSupported?: boolean;
  updated?: string;
  version?: string;
  recentChanges?: string;
  url?: string;
  offersIAP?: boolean;
  IAPRange?: string;
}

const getPlaystoreData = async (
  appId: string,
): Promise<PlayStoreData | null> => {
  if (!appId) return null;

  async function postTo(method: string, body: unknown) {
    const res = await fetch(`${SCRAPER_BASE_URL}/${method}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(
        `Scraper ${method} responded with ${res.status}: ${text}`,
      );
    }
    return res.json();
  }

  try {
    let found: PlayStoreData | null = null;
    try {
      found = (await postTo("app", { appId })) as PlayStoreData;
    } catch (e) {
      // If /app fails, try /search with term=appId and num=1
      try {
        const searchRes = (await postTo("search", {
          term: appId,
          num: 1,
        })) as PlayStoreData[];
        found =
          Array.isArray(searchRes) && searchRes.length > 0
            ? (searchRes[0] as PlayStoreData)
            : null;
      } catch (err) {
        console.error("Scraper search fallback failed for", appId, err);
        found = null;
      }
    }

    if (!found) return null;

    console.info(`App ID ${appId} successfully retrieved! App:`);
    console.info(found);

    // Normalize fields similarly to original implementation
    if (!found.installs && found.minInstalls !== undefined)
      found.installs = found.minInstalls;
    if (!found.scoreText && typeof found.score === "number")
      found.scoreText = String(found.score.toFixed(1));

    return found;
  } catch (e) {
    console.error("Error fetching playstore data from scraper for", appId, e);
    return null;
  }
};

export { getPlaystoreData };
