import nodemailer from "nodemailer";
import fs from "fs";
import { promisify } from "util";
import Mail from "nodemailer/lib/mailer";
import path from "path";
import { logToDiscord } from "@/utils/logger";

const readFileAsync = promisify(fs.readFile);

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER,
  port: parseInt(process.env.EMAIL_PORT || "587"),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const replacePlaceholders = (
  template: string,
  placeholders: { [key: string]: string }
) => {
  let updatedTemplate = template;
  for (const [key, value] of Object.entries(placeholders)) {
    updatedTemplate = updatedTemplate.replace(
      new RegExp(`{{${key}}}`, "g"),
      value
    );
  }
  return updatedTemplate;
};

export const sendMail = async (
  to: string,
  subject: string,
  placeholders: { [key: string]: string }
) => {
  try {
    const emailTemplatePath = path.resolve(
      process.cwd(),
      "src",
      "templates",
      "email.html"
    );

    const htmlTemplate = await readFileAsync(emailTemplatePath, "utf-8");

    let htmlContent = replacePlaceholders(htmlTemplate, placeholders);

    const mailOptions: Mail.Options = {
      from: `Octasol ${process.env.EMAIL_USER}`,
      to,
      subject,
      html: htmlContent,
      replyTo: process.env.EMAIL_USER,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    await logToDiscord(`nodemailer/sendMail: ${(error as any).message}`, "ERROR");

    console.error("Error sending email:", error);
  }
};
