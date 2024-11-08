import { Queue } from "bullmq";
import Redis from "ioredis";

const redisConnection = new Redis(process.env.REDIS_URL || "");

// Initialize the queue
export const taskQueue = new Queue("taskQueue", {
  connection: redisConnection,
});

// Function to add tasks
export const addToQueue = async (taskData: object) => {
  await taskQueue.add("task", taskData);
};
