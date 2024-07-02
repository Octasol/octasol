import { sign } from "jsonwebtoken";
import { readFileSync } from "fs";
import axios from "axios";
import { setUser } from "@/utils/dbUtils";

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

/**
 * Unused function
 * @returns installations of the app, error if any
 */
async function getInstallations() {
  const token = getToken();
  try {
    const response = await axios.get(
      "https://api.github.com/app/installations",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github.v3+json",
        },
      }
    );
    return { installations: response.data, error: "" };
  } catch (error: any) {
    return { installations: [], error: error.message };
  }
}

/**
 * Unused function
 * @param githubId Github Id of user
 * @returns installationId of the app for the user
 */
export async function getInstallationIdbyGithubId(githubId: number) {
  const installations = await getInstallations();
  if (installations.error != "") {
    return 0;
  }
  const installation = installations.installations.find(
    (installation: any) => installation.account.id === githubId
  );
  if (!installation) {
    return 0;
  }
  return installation.id;
}

export async function getGithubIdbyInstallationId(installationId: number) {
  const token = getToken();
  try {
    const response = await axios.get(
      `https://api.github.com/app/installations/${installationId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github.v3+json",
        },
      }
    );
    return response.data.account.id;
  } catch (error: any) {
    return 0;
  }
}

export async function setUserbyInstallationId(installationId: number) {
  const githubId = await getGithubIdbyInstallationId(installationId);
  if (githubId === 0) {
    return false;
  }
  setUser(githubId, installationId);
  return true;
}
