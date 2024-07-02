import { setUserbyInstallationId } from "@/lib/apiUtils";
import { NextRequest } from "next/server";
import { redirect } from "next/navigation";

export function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const installationId = searchParams.get("installation_id");
  setUserbyInstallationId(Number(installationId));
  return redirect(`/repoinitialize`);
}
