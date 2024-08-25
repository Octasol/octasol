import axios from 'axios';
import { ReclaimServiceResponse } from '../../../utils/reclaimServiceResponse';

export async function processSuperteamEarnData(githubId: string, proof: any, providerName: string) {
  const username = JSON.parse(proof[0].claimData.context).extractedParameters.userName;
  const lastUpdateTimeStamp = proof[0].claimData.timestampS;

  return new ReclaimServiceResponse(providerName, lastUpdateTimeStamp, username, username, proof[0], githubId);
}

