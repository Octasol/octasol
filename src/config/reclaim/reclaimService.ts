// src/config/reclaim/reclaimService.ts
import { Reclaim } from '@reclaimprotocol/js-sdk';
import { processHackerRankData } from './hackerrank/service';

export async function signWithProviderID(userId: string, providerId: string, providerName: string) {
  const reclaimAppID = process.env.HACKERRANK_RECLAIM_APP_ID!;
  const reclaimAppSecret = process.env.HACKERRANK_RECLAIM_APP_SECRET!;

  const reclaimClient = new Reclaim.ProofRequest(reclaimAppID);
  await reclaimClient.buildProofRequest(providerId);
  reclaimClient.setSignature(await reclaimClient.generateSignature(reclaimAppSecret));

  const { requestUrl: signedUrl } = await reclaimClient.createVerificationRequest();

  await handleReclaimSession(userId, reclaimClient, providerName);
  return signedUrl;
}

async function handleReclaimSession(userId: string, reclaimClient: any, providerName: string) {
  reclaimClient.startSession({
    onSuccessCallback: async (proof: any) => {
      try {
        const processedData = await processHackerRankData(proof, providerName, userId);
        console.log('Proof is: ', proof);
        console.log(`Processed data: ${JSON.stringify(processedData)}`);
      } catch (error) {
        console.error(`Failed to process Reclaim proof for userId: ${userId}`, error);
      }
    },
    onFailureCallback: (error: any) => {
      console.error(`Verification failed for userId: ${userId}`, error);
    },
  });
}