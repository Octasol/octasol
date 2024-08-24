import { Reclaim } from "@reclaimprotocol/js-sdk";
import { processHackerRankData } from "./hackerrank/service";
import { processSuperteamEarnData } from "./superteamearn/service";
import { setUsername } from "@/utils/dbUtils";

const reclaimAppID = process.env.RECLAIM_APP_ID!;
const reclaimAppSecret = process.env.RECLAIM_APP_SECRET!;

export async function signWithProviderID(
  userId: string,
  githubId: any,
  providerId: string,
  providerName: string
) {
  const reclaimClient = new Reclaim.ProofRequest(reclaimAppID);
  await reclaimClient.buildProofRequest(providerId);
  reclaimClient.setSignature(
    await reclaimClient.generateSignature(reclaimAppSecret)
  );

  const { requestUrl: signedUrl } =
    await reclaimClient.createVerificationRequest();

  await handleReclaimSession(userId, githubId, reclaimClient, providerName);
  return signedUrl;
}

async function handleReclaimSession(
  userId: string,
  githubId: any,
  reclaimClient: any,
  providerName: string
) {
  reclaimClient.startSession({
    onSuccessCallback: async (proof: any) => {
      try {
        let processedData;
        let username;

        switch (providerName) {
          case "Hackerrank":
            processedData = await processHackerRankData(
              proof,
              providerName,
              userId
            );
            username = JSON.parse(proof[0].claimData.parameters).paramValues
              .username;
            await setUsername(githubId, {
              hackerrankUsername: username,
            });
            break;

          case "SuperteamEarn":
            processedData = await processSuperteamEarnData(
              proof,
              providerName,
              userId
            );
            username = JSON.parse(proof[0].claimData.parameters).paramValues
              .username;
            await setUsername(githubId, { superteamUsername: username });
            break;

          default:
            throw new Error(`Unsupported provider: ${providerName}`);
        }
      } catch (error) {
        console.error(
          `Failed to process Reclaim proof for userId: ${userId}`,
          error
        );
      }
    },
    onFailureCallback: (error: any) => {
      console.error(`Verification failed for userId: ${userId}`, error);
    },
  });
}
