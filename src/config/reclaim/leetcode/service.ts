import { QuestionData } from "@/lib/types";
import { setUsername, setLeetCodeDatabyGithubId } from "@/utils/dbUtils";
import { logToDiscord } from "@/utils/logger";

export async function processLeetcodeData(
  githubId: any,
  proof: any,
  providerName: string
) {
  const username = JSON.parse(proof[0].claimData.context).extractedParameters
    .username;
  await setUsername(githubId, {
    leetcodeUsername: username,
  });

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

  const url = "https://leetcode.com/graphql/";
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables }),
    });

    const data = await response.json();
    const questionData: QuestionData[] =
      data.data.userProfileUserQuestionProgressV2.numAcceptedQuestions;

    const easyQues =
      questionData.find((q) => q.difficulty === "EASY")?.count || 0;
    const mediumQues =
      questionData.find((q) => q.difficulty === "MEDIUM")?.count || 0;
    const hardQues =
      questionData.find((q) => q.difficulty === "HARD")?.count || 0;

    await setLeetCodeDatabyGithubId(githubId, easyQues, mediumQues, hardQues);

    return true;
  } catch (error) {
    if (process.env.NODE_ENV === "production") {
      await logToDiscord(`${(error as any).message}`, "ERROR");
    }

    console.error("Error fetching Leetcode data:", error);
    return false;
  }
}
