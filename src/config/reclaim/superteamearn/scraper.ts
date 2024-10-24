import { logToDiscord } from "@/utils/logger";
import axios from "axios";
import * as cheerio from "cheerio";

export async function scrapeSuperteamStats(username: string) {
  const url = `https://earn.superteam.fun/t/${username}/`;

  try {
    const { data } = await axios.get(url);

    const $ = cheerio.load(data);

    const statsScript = $("script")
      .filter((i, el) => {
        const scriptContent = $(el).html();
        return scriptContent !== null && scriptContent.includes('"stats":');
      })
      .html();

    if (statsScript) {
      const match = statsScript.match(/({.*"stats".*})/);
      if (match && match[0]) {
        // Ensure match is not null
        const jsonString = match[0];
        const statsJson = JSON.parse(jsonString);

        return statsJson.props.pageProps.stats;
      } else {
        return null;
      }
    } else {
      return null;
    }
  } catch (error) {
    if (process.env.NODE_ENV === "production") {
      await logToDiscord(`${(error as any).message}`, "ERROR");
    }

    console.error("Error scraping data:", error);
    return null;
  }
}
