"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableRow,
} from "@/components/ui/table";

import ImportButton from "../Button/ImportButton";
import RepoSearch from "../Input/RepoSearch";
import SelectUser from "../Input/SelectUser";
import { useSelector } from "react-redux";

export function RepoInitializeForm() {
  const user = useSelector((state: any) => state.user);

  return (
    <div className="max-w-xl max-h-[500px] w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <div className=" relative group/btn block w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]">
        <p className="font-bold text-2xl text-neutral-800 dark:text-neutral-200 text-center">
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

      <div className="h-80 flex flex-col overflow-scroll">
        <Table>
          <TableCaption>A list of your recent Repository.</TableCaption>

          <TableBody>
            <TableRow>
              <TableCell className="1-9/12">Repo Name</TableCell>
              <TableCell className="text-right">
                <ImportButton>
                  <>
                    <span className="text-sm md:text-base">Import&nbsp;</span>
                  </>
                </ImportButton>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="1-9/12">Repo Name</TableCell>
              <TableCell className="text-right">
                <ImportButton>
                  <>
                    <span className="text-sm md:text-base">Import&nbsp;</span>
                  </>
                </ImportButton>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="1-9/12">Repo Name</TableCell>
              <TableCell className="text-right">
                <ImportButton>
                  <>
                    <span className="text-sm md:text-base">Import&nbsp;</span>
                  </>
                </ImportButton>
              </TableCell>
            </TableRow>{" "}
            <TableRow>
              <TableCell className="1-9/12">Repo Name</TableCell>
              <TableCell className="text-right">
                <ImportButton>
                  <>
                    <span className="text-sm md:text-base">Import&nbsp;</span>
                  </>
                </ImportButton>
              </TableCell>
            </TableRow>{" "}
            <TableRow>
              <TableCell className="1-9/12">Repo Name</TableCell>
              <TableCell className="text-right">
                <ImportButton>
                  <>
                    <span className="text-sm md:text-base">Import&nbsp;</span>
                  </>
                </ImportButton>
              </TableCell>
            </TableRow>{" "}
            <TableRow>
              <TableCell className="1-9/12">Repo Name</TableCell>
              <TableCell className="text-right">
                <ImportButton>
                  <>
                    <span className="text-sm md:text-base">Import&nbsp;</span>
                  </>
                </ImportButton>
              </TableCell>
            </TableRow>{" "}
            <TableRow>
              <TableCell className="1-9/12">Repo Name</TableCell>
              <TableCell className="text-right">
                <ImportButton>
                  <>
                    <span className="text-sm md:text-base">Import&nbsp;</span>
                  </>
                </ImportButton>
              </TableCell>
            </TableRow>{" "}
            <TableRow>
              <TableCell className="1-9/12">Repo Name</TableCell>
              <TableCell className="text-right">
                <ImportButton>
                  <>
                    <span className="text-sm md:text-base">Import&nbsp;</span>
                  </>
                </ImportButton>
              </TableCell>
            </TableRow>{" "}
            <TableRow>
              <TableCell className="1-9/12">Repo Name</TableCell>
              <TableCell className="text-right">
                <ImportButton>
                  <>
                    <span className="text-sm md:text-base">Import&nbsp;</span>
                  </>
                </ImportButton>
              </TableCell>
            </TableRow>{" "}
            <TableRow>
              <TableCell className="1-9/12">Repo Name</TableCell>
              <TableCell className="text-right">
                <ImportButton>
                  <>
                    <span className="text-sm md:text-base">Import&nbsp;</span>
                  </>
                </ImportButton>
              </TableCell>
            </TableRow>{" "}
            <TableRow>
              <TableCell className="1-9/12">Repo Name</TableCell>
              <TableCell className="text-right">
                <ImportButton>
                  <>
                    <span className="text-sm md:text-base">Import&nbsp;</span>
                  </>
                </ImportButton>
              </TableCell>
            </TableRow>
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
