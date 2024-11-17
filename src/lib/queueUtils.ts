import { addToQueue } from "./queue";
import { QueuePriority } from "./types";

export const addUpdateGithubProfileToQueue = async (
  accessToken: string,
  githubId: string,
  priority: QueuePriority,
  lastUpdated?: Date
) => {
  if (lastUpdated) {
    console.log(new Date(), new Date().getTime())
    console.log(lastUpdated, lastUpdated.getTime())
    console.log(new Date().getTime() - lastUpdated.getTime());
  }
  if (
    priority === QueuePriority.Low &&
    lastUpdated &&
    new Date().getTime() - lastUpdated.getTime() < 2 * 60 * 1000
  ) {
    console.log("Not adding to queue, last updated less than 2 minutes ago");
    return;
  }

  await addToQueue(
    {
      method: "updateGithubProfile",
      data: { accessToken, githubId, lastUpdated },
    },
    priority
  );
};
