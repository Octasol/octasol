"use client";
import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableRow,
} from "@/components/ui/table";

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

export function RepoInitializeForm() {
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);
  const repositories = useSelector((state: any) => state.repo);
  const error = useSelector((state: any) => state.error);
  const installationId = useSelector((state: any) => state.installationId);
  const searchTerm = useSelector((state: any) => state.search.query);

  useEffect(() => {
    if (session) {
      const storedInstallationId = localStorage.getItem("installationId");
      dispatch(setInstallationId(storedInstallationId ?? ""));
      if (storedInstallationId) {
        fetchRepositories(storedInstallationId);
      }
    }
  }, [session]);

  const fetchRepositories = async (installationId: string) => {
    try {
      dispatch(clearError());
      if (!installationId) return;
      const response = await fetch(
        `/api/github-repos?installationId=${installationId}`
      );
      const data = await response.json();
      console.log(data.repositories);
      dispatch(setRepositories(data.repositories));
    } catch (err: any) {
      dispatch(setError(err.message));
    }
  };

  useEffect(() => {
    fetchRepositories(installationId);
  }, []);

  useEffect(() => {
    console.log(error);
  }, [error]);

  const filteredRepositories = repositories.filter((repo: any) =>
    repo.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-xl min-h-[500px] w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <div className=" relative group/btn block w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]">
        <p className="font-bold text-2xl text-neutral-800 dark:text-neutral-200 text-center">
          Select Github Repository
        </p>
        <BottomGradient />
      </div>

      <div className="my-8 flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4 items-center w-full justify-center">
        <div className="w-full md:w-1/2">
          <SelectUser data={user?.name} image={user?.photo} />
        </div>
        <div className="w-full md:w-1/2">
          <RepoSearch />
        </div>
      </div>

      <div className="max-h-80 flex flex-col overflow-scroll">
        <Table>
          <TableCaption>A list of your recent Repository.</TableCaption>

          <TableBody>
            {filteredRepositories.map((repo: any) => (
              <TableRow key={repo.id}>
                <TableCell className="1-9/12">{repo.full_name}</TableCell>
                <TableCell className="text-right">
                  <ImportButton>
                    <>
                      <span className="text-sm md:text-base">Import&nbsp;</span>
                    </>
                  </ImportButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
