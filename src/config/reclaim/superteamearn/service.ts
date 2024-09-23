import { scrapeSuperteamStats } from "./scraper";
import { setUsername } from "@/utils/dbUtils";

export async function processSuperteamEarnData(
  githubId: any,
  proof: any,
  providerName: string
) {
  const username = JSON.parse(proof[0].claimData.context).extractedParameters
    .username;
  await setUsername(githubId, {
    superteamUsername: username,
  });

  const stats = await scrapeSuperteamStats(username);

  if (stats) {
    console.log("Participations:", stats.participations);
    console.log("Wins:", stats.wins);
    console.log("Total Winnings:", stats.totalWinnings);
  } else {
    console.log("Failed to fetch Superteam stats.");
  }

  const lastUpdateTimeStamp = proof[0].claimData.timestampS;
  console.log("Proof is:", proof[0]);

  return true;
}
