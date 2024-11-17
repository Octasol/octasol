import { addToQueue } from "./queue";
import { QueuePriority } from "./types";

export const addUpdateGithubProfileToQueue = async (
  accessToken: string,
  githubId: string,
  githubUsername: string,
  priority: QueuePriority
) => {
  if (priority === QueuePriority.High) {
    await addToQueue(
      {
        method: "updateGithubProfile",
        accessToken,
        githubId,
        githubUsername,
        setUsername: true,
      },
      QueuePriority.High
    );
    // action: set github username & update profile
  } else {
    await addToQueue(
      {
        method: "updateGithubProfile",
        accessToken,
        githubId,
        setUsername: false,
      },
      QueuePriority.Low
    );
  }
};
