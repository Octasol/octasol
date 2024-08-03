import axios from 'axios';
import { ReclaimServiceResponse } from '../../../utils/reclaimServiceResponse';

export async function processHackerRankData(proof: any, providerName: string, userId: string) {
  const username = JSON.parse(proof[0].claimData.context).extractedParameters.userName;
  const lastUpdateTimeStamp = proof[0].claimData.timestampS;

  const { currentPoints, stars } = await getHackerrankStats(username);

  return new ReclaimServiceResponse(providerName, lastUpdateTimeStamp, username, { currentPoints, stars }, proof[0], userId);
}

export async function getHackerrankProfile(username: string) {
  try {
    const response = await axios.get(
      `https://www.hackerrank.com/rest/hackers/${username}/badges`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch HackerRank profile for username: ${username}`, error);
    throw new Error('Error fetching HackerRank profile');
  }
}

export async function getHackerrankStats(username: string) {
  const data = await getHackerrankProfile(username);
  let stars = 0;
  let currentPoints = 0;
  data.models.forEach((model: any) => {
    currentPoints += model.current_points;
    stars += model.stars;
  });
  return { currentPoints, stars };
}