import { getUserByAuthHeader } from "@/lib/apiUtils";
import { adminGithub } from "@/lib/constants";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File;
  const authHeader = req.headers.get("Authorization");
  if (!authHeader) {
    return NextResponse.json(
      { error: "Authorization header is required" },
      { status: 400 }
    );
  }
  const user = await getUserByAuthHeader(authHeader);
  if (!user) {
    return NextResponse.json(
      { error: "Invalid Authorization Header" },
      { status: 401 }
    );
  }
  // AUTH FOR ADMIN
  if (!((user.login as string).toLowerCase() in adminGithub)) {
    return NextResponse.json(
      { error: "You are not authorized to perform this action" },
      { status: 401 }
    );
  }
  if (!file) {
    return NextResponse.json(
      { success: false, message: "No file provided" },
      { status: 400 }
    );
  }

  const awsClient = new S3Client({ region: process.env.AWS_REGION });
  const bucket = process.env.AWS_BUCKET_NAME || "";
  const key = `uploads/${randomUUID()}`; // Define your folder structure as desired

  try {
    // Upload to S3
    const uploadParams = {
      Bucket: bucket,
      Key: key,
      Body: Buffer.from(await file.arrayBuffer()), // Convert file to buffer
      ContentType: file.type,
    };
    await awsClient.send(new PutObjectCommand(uploadParams));

    // Return the S3 URL
    const url = `https://${bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
    return NextResponse.json({ success: true, url });
  } catch (error) {
    console.error("Error uploading file", error);
    return NextResponse.json(
      { success: false, message: (error as any).message },
      { status: 500 }
    );
  }
}
