import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const data = await getHackerrankStats("Q_2022_23_26");
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  return NextResponse.json({ message: "Hello World" });
}

async function getHackerrankProfile(username: string) {
  const response = await axios.get(
    `https://www.hackerrank.com/rest/hackers/${username}/badges`,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
      },
    }
  );
  return response.data;
}

async function getHackerrankStats(username: string) {
  const data = await getHackerrankProfile(username);
  let stars = 0;
  let currentPoints = 0;
  data.models.forEach((model: any) => {
    currentPoints += model.current_points;
    stars += model.stars;
  });
  return { currentPoints, stars };
}
