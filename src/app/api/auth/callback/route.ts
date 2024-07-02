import { getGithubIdbyInstallationId, getInstallationIdbyGithubId, setUserbyInstallationId } from "@/lib/apiUtils";
import { NextRequest, NextResponse } from "next/server";

export function GET(req: NextRequest) {
  // console.log("Session:", session);
  // if (session) {
  //   const array = session?.user?.image?.split("/");
  //   if (array && array.length > 0) {
  //     const id = array[array.length - 1];
  //     return NextResponse.redirect(`/auth/callback?installation_id=${id}`);
  //   }
  // }
  const { searchParams } = new URL(req.url);
  const installationId = searchParams.get("installation_id");
  setUserbyInstallationId(Number(installationId));

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Setting Installation ID</title>
        <script type="text/javascript">
          localStorage.setItem('installationId', '${installationId}');
          window.location.href = '/repoinitialize';
        </script>
      </head>
      <body>
      </body>
    </html>
  `;
  if (!installationId) {
    // console.log("No installation ID");
    return NextResponse.redirect("/dashboard");
  }
  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html",
    },
  });
}
