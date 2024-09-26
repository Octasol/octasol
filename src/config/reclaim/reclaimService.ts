import { Reclaim } from "@reclaimprotocol/js-sdk";
import { processHackerRankData } from "./hackerrank/service";
import { processSuperteamEarnData } from "./superteamearn/service";
import { setUsername } from "@/utils/dbUtils";
import { processLeetcodeData } from "./leetcode/service";
import { processGeeksForGeeksData } from "./geeksforgeeks/service";
import { processCodechefData } from "./codechef/service";

const reclaimAppID = process.env.RECLAIM_APP_ID!;
const reclaimAppSecret = process.env.RECLAIM_APP_SECRET!;

export async function signWithProviderID(
  githubId: any,
  providerId: string,
  providerName: string
) {
  const reclaimClient = new Reclaim.ProofRequest(reclaimAppID);
  await reclaimClient.buildProofRequest(providerId, true, "V2Linking");

  await reclaimClient.setRedirectUrl("https://octasol.io/connect");

  reclaimClient.setSignature(
    await reclaimClient.generateSignature(reclaimAppSecret)
  );

  const { requestUrl: signedUrl } =
    await reclaimClient.createVerificationRequest();

  await handleReclaimSession(githubId, reclaimClient, providerName);
  return signedUrl;
}

async function handleReclaimSession(
  githubId: any,
  reclaimClient: any,
  providerName: string
) {
  reclaimClient.startSession({
    onSuccessCallback: async (proof: any) => {
      try {
        let processedData;
        // let username;

        switch (providerName) {
          case "Hackerrank":
            processedData = await processHackerRankData(
              githubId,
              proof,
              providerName
            );
            // username = JSON.parse(proof[0].claimData.parameters).paramValues
            //   .username;
            // await setUsername(githubId, {
            //   hackerrankUsername: username,
            // });
            break;

          case "SuperteamEarn":
            processedData = await processSuperteamEarnData(
              githubId,
              proof,
              providerName
            );
            // let username = JSON.parse(proof[0].claimData.parameters).paramValues
            //   .username;
            // await setUsername(githubId, { superteamUsername: username });
            break;

          case "Leetcode":
            processedData = await processLeetcodeData(
              githubId,
              proof,
              providerName
            );
            break;

          case "Geeksforgeeks":
            processedData = await processGeeksForGeeksData(
              githubId,
              proof,
              providerName
            );
            break;

          case "Codechef":
            processedData = await processCodechefData(
              githubId,
              proof,
              providerName
            );
            // let username = JSON.parse(proof[0].claimData.parameters).paramValues
            //   .username;
            // await setUsername(githubId, { superteamUsername: username });
            break;

          default:
            throw new Error(`Unsupported provider: ${providerName}`);
        }
      } catch (error) {
        console.error(
          `Failed to process Reclaim proof for githubId: ${githubId}`,
          error
        );
      }
    },
    onFailureCallback: (error: any) => {
      console.error(`Verification failed for githubId: ${githubId}`, error);
    },
  });
}
