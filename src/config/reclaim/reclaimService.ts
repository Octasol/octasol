import { Reclaim } from "@reclaimprotocol/js-sdk";
import { processHackerRankData } from "./hackerrank/service";
import { processSuperteamEarnData } from "./superteamearn/service";
import { processLeetcodeData } from "./leetcode/service";
import { processGeeksForGeeksData } from "./geeksforgeeks/service";
import { processCodechefData } from "./codechef/service";
import { logToDiscord } from "@/utils/logger";

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

        switch (providerName) {
          case "Hackerrank":
            processedData = await processHackerRankData(
              githubId,
              proof,
              providerName
            );
            break;

          case "SuperteamEarn":
            processedData = await processSuperteamEarnData(
              githubId,
              proof,
              providerName
            );
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
            break;

          default:
            throw new Error(`Unsupported provider: ${providerName}`);
        }
      } catch (error) {
        if (process.env.NODE_ENV === "production") {
          await logToDiscord(`${(error as any).message}`, "ERROR");
        }

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
