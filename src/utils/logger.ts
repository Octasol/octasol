/**
 * Utility functions for logging to Discord. (Only for production server, accessibly only by the server admins)
 */
import axios from "axios";

const defaultWebhookUrl = process.env.DISCORD_WEBHOOK_URL;
const webhookUrls = {
  INFO: process.env.DISCORD_WEBHOOK_URL_INFO || defaultWebhookUrl,
  WARN: process.env.DISCORD_WEBHOOK_URL_WARN || defaultWebhookUrl,
  ERROR: process.env.DISCORD_WEBHOOK_URL_ERROR || defaultWebhookUrl,
};

if (!defaultWebhookUrl) {
  console.error("DISCORD_WEBHOOK_URL is not defined");
}

// Define log levels
type LogLevel = "INFO" | "WARN" | "ERROR";

// Emoji and styling for different log levels
const logStyles = {
  INFO: { emoji: "ℹ️", color: "#00BFFF" },
  WARN: { emoji: "⚠️", color: "#FFA500" },
  ERROR: { emoji: "❌", color: "#FF0000" },
};

/**
 * Convert current UTC time to IST.
 * @returns {string} Timestamp in IST
 */
const getISTTimestamp = (): string => {
  const now = new Date();

  // IST is UTC +5:30
  const offsetIST = 5 * 60 + 30; // in minutes
  const istTime = new Date(now.getTime() + offsetIST * 60000);

  return istTime.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
};

/**
 * Log a message to Discord with a specific log level.
 * @param message The message to log
 * @param level The log level (INFO, WARN, ERROR)
 */
export const logToDiscord = async (
  message: string,
  level: LogLevel = "INFO"
): Promise<void> => {
  try {
    const timestamp = getISTTimestamp();
    const { emoji, color } = logStyles[level];
    const webhookUrl = webhookUrls[level];

    const payload = {
      content: `${emoji} **[${level}]** [${timestamp} IST] \n\n${message}`,
      embeds: [
        {
          description: message,
          color: parseInt(color.substring(1), 16),
        },
      ],
    };

    if (webhookUrl) {
      await axios.post(webhookUrl, payload);
      console.log(`Logged to Discord [${level}]: ${message}`);
    } else {
      console.warn(
        `Webhook URL for ${level} is not defined. Skipping Discord log.`
      );
    }
  } catch (error) {
    console.error("Error logging to Discord:", error);
  }
};
