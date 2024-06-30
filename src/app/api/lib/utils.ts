import { sign } from "jsonwebtoken";
import { readFileSync } from "fs";
import axios from "axios";

export function getToken() {
  const basedir = process.cwd();
  const privateKeyFile = process.env.GITHUB_PRIVATE_KEY_FILE_NAME;
  var privateKeyPath;
  if (process.platform == "win32") {
    privateKeyPath = `${basedir}\\keys\\${privateKeyFile}`;
  } else {
    privateKeyPath = `${basedir}/keys/${privateKeyFile}`;
  }
  const privateKey = readFileSync(privateKeyPath as string);
  const appId = process.env.GITHUB_APP_ID as string;

  const payload = { iss: appId };
  const token = sign(payload, privateKey, {
    algorithm: "RS256",
    expiresIn: "9m",
  });

  return token;
}

export async function getAccessToken(installationId: number) {
  const token = getToken();
  const tokenResponse = await axios.post(
    `https://api.github.com/app/installations/${installationId}/access_tokens`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github.v3+json",
      },
    }
  );

  const accessToken = tokenResponse.data.token;
  return accessToken;
}
