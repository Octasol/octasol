import axios from "axios";
import * as cheerio from 'cheerio';

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
        const statsJson = JSON.parse(jsonString); // Parse the JSON
        console.log("stats >", statsJson.props.pageProps.stats);

        return statsJson.props.pageProps.stats; // Return the parsed stats
      } else {
        console.log("No match found for the stats JSON.");
        return null;
      }
    } else {
      console.log("No stats found in the script tags.");
      return null;
    }
  } catch (error) {
    console.error("Error scraping data:", error);
    return null;
  }
}
