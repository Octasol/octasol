import { setCodeChefDatabyGithubId, setUsername } from "@/utils/dbUtils";
import { logToDiscord } from "@/utils/logger";
import axios from "axios";

export async function processCodechefData(
  githubId: string,
  proof: any,
  providerName: string
) {
  const username = JSON.parse(proof[0].claimData.context).extractedParameters
    .URL_PARAMS_GRD;

  const lastUpdateTimeStamp = proof[0].claimData.timestampS;

  try {
    const response = await axios.get(
      `https://codechef-api.vercel.app/handle/${username}`
    );

    await setUsername(BigInt(githubId), {
      codechefUsername: username,
    });

    await setCodeChefDatabyGithubId(
      BigInt(githubId),
      response.data.currentRating
    );
    return true;
  } catch (error) {
    await logToDiscord(`processCodechefData: ${(error as any).message}`, "ERROR");

    console.error(
      `Failed to fetch CodeChef data for username: ${username}`,
      error
    );
    throw new Error("Error fetching CodeChef data");
  }
}
