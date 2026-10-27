import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { logToDiscord } from "@/utils/logger";

const DEFAULT_LIMIT = 15;
const SEARCH_LIMIT = 30;
const MAX_LIMIT = 100;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const page = Math.max(1, Number(body.page) || 1);
    const limit = Math.min(
      MAX_LIMIT,
      Math.max(1, Number(body.limit) || DEFAULT_LIMIT)
    );
    const search =
      typeof body.search === "string" ? body.search.trim() : "";

    // search returns matches from the whole table, not just the current page
    let take = search ? SEARCH_LIMIT : limit;
    let skip = search ? 0 : (page - 1) * limit;

    const where = search
      ? { githubUsername: { contains: search, mode: "insensitive" as const } }
      : {};

    const [total, pageRows, top3] = await Promise.all([
      db.user.count({ where }),
      db.user.findMany({
        where,
        orderBy: [{ totalPoints: "desc" }, { githubId: "asc" }],
        skip,
        take,
        select: { githubId: true, githubUsername: true, totalPoints: true },
      }),
      // podium is global, independent of paging
      db.user.findMany({
        orderBy: [{ totalPoints: "desc" }, { githubId: "asc" }],
        take: 3,
        select: { githubUsername: true, totalPoints: true },
      }),
    ]);

    const offset = search ? 0 : (page - 1) * limit;
    const serializedProfile = pageRows.map(
      ({ githubId, githubUsername, totalPoints }, index) => ({
        githubId: githubId.toString(),
        githubUsername,
        totalPoints,
        rank: offset + index + 1,
      })
    );

    const response = NextResponse.json({
      profiles: serializedProfile,
      top3,
      page,
      limit,
      total,
      totalPages: Math.max(1, Math.ceil(total / limit)),
    });
    return response;
  } catch (error) {
    await logToDiscord(`leaderboard: ${(error as any).message}`, "ERROR");

    console.error(error);
    return NextResponse.json(
      { error: (error as any).message },
      { status: 500 }
    );
  }
}
