import { Queue } from "bullmq";
import Redis from "ioredis";
import { QueuePriority } from "./types";

const redisConnection = new Redis(process.env.REDIS_URL || "");

const highPriorityQueueName = "highPriorityQueue";
const lowPriorityQueueName = "lowPriorityQueue";

// Initialize the high priority queue
const highPriorityQueue = new Queue(highPriorityQueueName, {
  connection: redisConnection,
});

// Initialize the low priority queue
const lowPriorityQueue = new Queue(lowPriorityQueueName, {
  connection: redisConnection,
});

// Function to add tasks to the appropriate queue
export const addToQueue = async (taskData: object, priority: QueuePriority) => {
  const queue =
    priority === QueuePriority.High ? highPriorityQueue : lowPriorityQueue;
  await queue.add("task", taskData);
};
