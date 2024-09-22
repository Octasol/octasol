import { setGFGDatabyGithubId, setUsername } from "@/utils/dbUtils";

export async function processGeeksForGeeksData(
  githubId: string,
  proof: any,
  providerName: string
) {
  const score = parseInt(JSON.parse(proof[0].claimData.context).extractedParameters
    .score);
  console.log(score);
  const problemsSolved = parseInt(JSON.parse(proof[0].claimData.context)
    .extractedParameters.total_problems_solved);
  console.log(problemsSolved);
  const username = JSON.parse(proof[0].claimData.context).extractedParameters
    .URL_PARAMS_1;
  console.log(username);
  const lastUpdateTimeStamp = proof[0].claimData.timestampS;
  console.log("proof is:", proof[0]);
  await setUsername(BigInt(githubId), {
    gfgUsername: username,
  });
  await setGFGDatabyGithubId(BigInt(githubId), score, problemsSolved);
  return true;
}
