import { setGFGDatabyGithubId, setUsername } from "@/utils/dbUtils";

export async function processGeeksForGeeksData(
  githubId: string,
  proof: any,
  providerName: string
) {
  const score = parseInt(JSON.parse(proof[0].claimData.context).extractedParameters
    .score);

  const problemsSolved = parseInt(JSON.parse(proof[0].claimData.context)
    .extractedParameters.total_problems_solved);

  const username = JSON.parse(proof[0].claimData.context).extractedParameters
    .URL_PARAMS_1;

  const lastUpdateTimeStamp = proof[0].claimData.timestampS;

  await setUsername(BigInt(githubId), {
    gfgUsername: username,
  });
  await setGFGDatabyGithubId(BigInt(githubId), score, problemsSolved);
  return true;
}
