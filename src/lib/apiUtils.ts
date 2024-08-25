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
    const accessToken = authHeader.split(" ")[1];
    return await getGithubIdbyAccessToken(accessToken);
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

export async function getUserByAuthHeader(authHeader: string) {
  return await getGithubProfileWithGithubID(
    await getGithubIdbyAuthHeader(authHeader)
  );
}

export async function getGithubIdbyAccessToken(accessToken: string) {
  try {
    const cacheKey = `githubUserId:${accessToken}`;
    const githubId = getCache(cacheKey);
    if (githubId) {
      return githubId;
    }
    const response = await axios.get("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/vnd.github.v3+json",
      },
    });
    setCache(cacheKey, response.data.id);
    return response.data.id;
  } catch (error: any) {
    console.error("Failed to fetch Github ID", error);
    return 0;
  }
}

export async function getHackerrankProfileByApi(username: string) {
  try {
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
  } catch (error) {
    console.error(
      `Failed to fetch HackerRank profile for username: ${username}`,
      error
    );
    throw new Error("Error fetching HackerRank profile");
  }
}
