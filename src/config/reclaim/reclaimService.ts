import { Reclaim } from '@reclaimprotocol/js-sdk';
import { processHackerRankData } from './hackerrank/service';

export async function signWithProviderID(userId: string, providerId: string, providerName: string) {
  const reclaimAppID = "0xf19F6eB61a9fcE88f1A9008d018884B10D9b8319";
  const reclaimAppSecret = "0x9ad895ba1dc1ef750d5418341b2225686ab87ece2e375d608a4915e011b1cf97";

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
        const processedData = await processHackerRankData(proof, providerName);
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
