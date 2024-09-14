import axios from "axios";

export async function processCodechefData(
  githubId: string,
  proof: any,
  providerName: string
) {
  const username = JSON.parse(proof[0].claimData.context).extractedParameters
    .URL_PARAMS_GRD;
  console.log("CodeChef Username:", username);

  const lastUpdateTimeStamp = proof[0].claimData.timestampS;
  console.log("Proof is:", proof[0]);

  try {
    const response = await axios.get(`https://codechef-api.vercel.app/handle/${username}`);
    
    console.log("CodeChef API Response:", response.data);

    return true;
  } catch (error) {
    console.error(`Failed to fetch CodeChef data for username: ${username}`, error);
    throw new Error("Error fetching CodeChef data");
  }
}
