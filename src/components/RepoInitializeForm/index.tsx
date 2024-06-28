'use client';

import React, { useEffect, useState } from 'react';
import { Input } from '../../components/ui/input';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { ChevronDown, Search } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import ImportButton from '../../components/Button/ImportButton';

interface Repository {
  id: number;
  name: string;
  full_name: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

export default function RepoInitializeForm() {
  const { data: session } = useSession();
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [installationId, setInstallationId] = useState<string | null>(null);

  useEffect(() => {
    if (session) {
      const storedInstallationId = localStorage.getItem('installationId');
      setInstallationId(storedInstallationId);
      if (storedInstallationId) {
        fetchRepositories(storedInstallationId);
      }
    }
  }, [session]);

  const fetchRepositories = async (installationId: string) => {
    try {
      if (!installationId) return;

      const response = await fetch(`/api/github-repos?installationId=${installationId}`);
      const data = await response.json();
      console.log(data.repositories);
      setRepositories(data.repositories);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredRepositories = repositories.filter((repo) =>
    repo.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-xl w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <div className="relative group/btn block w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]">
        <p className="font-bold text-2xl text-neutral-800 dark:text-neutral-200 text-center">
          Select Github Repository
        </p>
        <BottomGradient />
      </div>

      <form className="my-8">
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4 items-center">
          <LabelInputContainer>
            <DropdownMenu>
              <DropdownMenuTrigger className="!outline-none bg-gradient-to-br from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 py-2 rounded-md">
                <div className="flex gap-4 justify-between items-center px-4">
                  {session?.user?.name}
                  <ChevronDown size={20} />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="md:!w-[252px] border-0 bg-gradient-to-br from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 py-2 rounded-md">
                <DropdownMenuLabel>
                  <div className="flex items-center gap-4">
                    <div className="px-4 md:px-4 flex justify-between w-full gap-8">
                      <Image
                        src={session?.user?.image || ''}
                        alt="user profile image"
                        width={20}
                        height={20}
                        className="rounded-full"
                      />
                      <span className="text-base">{session?.user?.name}</span>
                    </div>
                  </div>
                </DropdownMenuLabel>
              </DropdownMenuContent>
            </DropdownMenu>
          </LabelInputContainer>
          <LabelInputContainer>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <Search size={14} />
              </span>
              <Input
                id="search"
                placeholder="Search Repo"
                type="text"
                className="pl-8 bg-gradient-to-br from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
          </LabelInputContainer>
        </div>
      </form>
      <Table>
        <TableCaption>A list of your recent Repository.</TableCaption>

        <TableBody>
          {filteredRepositories.map((repo) => (
            <TableRow key={repo.id}>
              <TableCell className="1-9/12">{repo.full_name}</TableCell>
              <TableCell className="text-right">
                <ImportButton
                  children={<span className="text-sm md:text-base">Import&nbsp;</span>}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
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
  return <div className={cn('flex flex-col space-y-2 w-full', className)}>{children}</div>;
};
