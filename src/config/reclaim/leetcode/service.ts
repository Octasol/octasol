import { QuestionData } from "@/lib/types";

export async function processLeetcodeData(
  githubId: string,
  proof: any,
  providerName: string
) {
  const username = JSON.parse(proof[0].claimData.context).extractedParameters.username;
  console.log(username);

  // Leetcode GraphQL query and variables
  const query = `
    query userProfileUserQuestionProgressV2($userSlug: String!) {
      userProfileUserQuestionProgressV2(userSlug: $userSlug) {
        numAcceptedQuestions {
          count
          difficulty
        }
      }
    }
  `;

  const variables = {
    userSlug: username,
  };

  const url = 'https://leetcode.com/graphql/';
  try {
    // Make the POST request to Leetcode's GraphQL API
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, variables }),
    });

    const data = await response.json();
    const questionData: QuestionData[] = data.data.userProfileUserQuestionProgressV2.numAcceptedQuestions;

    console.log("data:", data);
    console.log("Question Data:", questionData);

    const easyQues = questionData.find(q => q.difficulty === 'EASY')?.count || 0;
    const mediumQues = questionData.find(q => q.difficulty === 'MEDIUM')?.count || 0;
    const hardQues = questionData.find(q => q.difficulty === 'HARD')?.count || 0;

    console.log(`Easy Questions: ${easyQues}`);
    console.log(`Medium Questions: ${mediumQues}`);
    console.log(`Hard Questions: ${hardQues}`);

    return true;
  } catch (error) {
    console.error('Error fetching Leetcode data:', error);
    return false;
  }
}