import { NextRequest, NextResponse } from "next/server";

export function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const installationId = searchParams.get("installation_id");
  console.log("Installation ID:", installationId);
  // if (!installationId) {
  //   return NextResponse.json({ error: 'Missing installation ID' }, { status: 400 });
  // }

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
    console.log("No installation ID");
    return;
  }
  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html",
    },
  });
}
