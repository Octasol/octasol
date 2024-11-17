import { addToQueue } from "./queue";
import { QueuePriority } from "./types";

export const addUpdateGithubProfileToQueue = async (
  accessToken: string,
  githubId: string,
  priority: QueuePriority
) => {
  await addToQueue(
    {
      method: "updateGithubProfile",
      data: { accessToken, githubId },
    },
    priority
  );
};
