export async function processCodechefData(
    githubId: string,
    proof: any,
    providerName: string
  ) {
    const username = JSON.parse(proof[0].claimData.context).extractedParameters
      .URL_PARAMS_GRD;
    console.log(username)
    const lastUpdateTimeStamp = proof[0].claimData.timestampS;
    console.log("proof is:", proof[0])
    return true;
  }
  