"use client";
import React, { useEffect } from "react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { v4 as uuidv4 } from "uuid";
import cookie from "js-cookie";
import { useSession } from "next-auth/react";
import ImportButton from "../Button/ImportButton";
import SelectUser from "../Input/SelectUser";
import RepoSearch from "../Input/RepoSearch";
import { useSelector } from "react-redux";
import { cn } from "@/lib/utils";
import { setRepositories } from "@/app/Redux/Features/git/repoInitialize";
import { useDispatch } from "react-redux";
import { setInstallationId } from "@/app/Redux/Features/git/githubInstallation";
import { clearError, setError } from "@/app/Redux/Features/error/error";
import { useRouter } from "next/navigation";
import { githubIcon } from "@/components/Svg/svg";
import { Lock } from "lucide-react";
import { POST } from "@/config/axios/requests";
import { githubInstallations } from "@/config/axios/Breakpoints";

export function RepoInitializeForm() {
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);
  const repositories = useSelector((state: any) => state.repo);
  const error = useSelector((state: any) => state.error);
  const installationId = useSelector((state: any) => state.installationId);
  const searchTerm = useSelector((state: any) => state.search.query);
  const router = useRouter();

  const dispatchInstallationId = async () => {
    if (session) {
      var id;
      const array = session?.user?.image?.split("/");
      if (array && array.length > 0) {
        id = array[array.length - 1];
        id = id.split("?")[0];
      }
      const { response, error } = await POST(githubInstallations, {
        githubId: id,
      });
      if (response) {
        dispatch(setInstallationId(response?.data?.installationId ?? ""));
        if (response?.data?.installationId) {
          localStorage.setItem(
            "installationId",
            response?.data?.installationId
          );
          fetchRepositories(response?.data?.installationId);
        }
      } else {
        console.error(error);
        // dispatch(setError(error));
      }
    }
  };

  useEffect(() => {
    dispatchInstallationId();
  }, [session]);

  const fetchRepositories = async (installationId: string) => {
    try {
      dispatch(clearError());
      if (!installationId) return;
      const response = await fetch(
        `/api/github-repos?installationId=${installationId}`
      );
      const data = await response.json();
      dispatch(setRepositories(data.repositories));
    } catch (err: any) {
      dispatch(setError(err.message));
    }
  };

  useEffect(() => {
    fetchRepositories(installationId);
  }, []);

  const filteredRepositories = repositories.filter((repo: any) =>
    repo.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInstall = () => {
    const clientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID ?? "";
    const redirectUri =
      process.env.NEXT_PUBLIC_GITHUB_APP_INSTALLATION_CALLBACK_URL ?? "";
    const state = uuidv4();
    cookie.set("oauth_state", state, {
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    const installUrl = `https://github.com/apps/Octasol-DEV-app/installations/new?state=${state}&client_id=${clientId}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}`;
    // openInNewWindow(installUrl);
    // window.open(installUrl, "_blank");
    router.push(installUrl);
  };

  return (
    <div className="max-w-xl min-h-[500px] w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <div className=" relative group/btn block w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]">
        <p className="font-bold text-base md:text-2xl text-neutral-800 dark:text-neutral-200 text-center">
          Select Github Repository
        </p>
        <BottomGradient />
      </div>

      <div className="my-8 flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4 items-center w-full justify-center">
        <div className="w-full md:w-1/2">
          <SelectUser data={user?.name} />
        </div>
        <div className="w-full md:w-1/2">
          <RepoSearch />
        </div>
      </div>

      {filteredRepositories.length === 0 ? (
        <div className="flex flex-col justify-center items-center h-52 gap-8">
          <p className="text-lg text-neutral-500 dark:text-neutral-400">
            No repositories found
          </p>

          <button
            className="w-10/12 bg-slate-700 hover:bg-gray-600 rounded-md py-2 flex justify-center items-center font-semibold gap-4"
            onClick={handleInstall}
          >
            {githubIcon()}
            <span className="text-white ">Add Repositories</span>
          </button>
        </div>
      ) : (
        <div className="max-h-80 flex flex-col overflow-scroll">
          <Table>
            <TableBody>
              {filteredRepositories.map((repo: any) => (
                <TableRow
                  key={repo.id}
                  className={cn("flex items-center justify-between w-full ", {
                    "opacity-70 cursor-not-allowed": repo.private == true,
                  })}
                >
                  <TableCell className="1-9/12 flex items-center gap-2">
                    <span>{repo.full_name.split("/")[1]}</span>
                    {repo.private && (
                      <Lock size={12} className="text-green-400" />
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <ImportButton privateFlag={repo.private} data={repo}>
                      <>
                        <span className="text-sm md:text-base">
                          Import&nbsp;
                        </span>
                      </>
                    </ImportButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <p className="text-sm py-2 w-full flex flex-col md:flex-row items-center justify-center">
            Missing Git Repository ?
            <span
              className="text-blue-500 cursor-pointer"
              onClick={handleInstall}
            >
              &nbsp;Adjust Github Permission !
            </span>
          </p>
        </div>
      )}
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="opacity-100 block transition duration-500  absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="opacity-100 blur-sm block transition duration-500  absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};
