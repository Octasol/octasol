import { sign } from "jsonwebtoken";
import { readFileSync } from "fs";
import axios from "axios";
import { getInstallationId, setUser } from "@/utils/dbUtils";
import { getCache, setCache } from "./cache";

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
  const installationIdInDB = await getInstallationId(githubId);
  if (githubId === 0 && installationIdInDB === 0) {
    return false;
  }
  await setUser(githubId, installationId);
  return true;
}

export async function getGithubIdbyAuthHeader(authHeader: string) {
  try {
    if (!authHeader) {
      return 0;
    }
    const cacheKey = `githubUserId:${authHeader}`;
    const githubId = getCache(cacheKey);
    if (githubId) {
      return githubId;
    }
    const response = await axios.get("https://api.github.com/user", {
      headers: {
        Authorization: `${authHeader}`,
        Accept: "application/vnd.github.v3+json",
      },
    });
    setCache(cacheKey, response.data.id);
    return response.data.id;
  } catch (error: any) {
    return 0;
  }
}

export async function getGithubProfileWithGithubID(githubId: number) {
  try {
    if (!githubId) {
      return null;
    }
    const cacheKey = `githubProfile:${githubId}`;
    const githubProfile = getCache(cacheKey);
    if (githubProfile) {
      return githubProfile;
    }
    const response = await axios.get(`https://api.github.com/user/${githubId}`);
    setCache(cacheKey, response.data);
    return response.data;
  } catch (error: any) {
    return null;
  }
}
