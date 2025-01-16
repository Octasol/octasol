"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FloatingDock } from "@/components/ui/floating-dock";
import { IconLayoutNavbarCollapse } from "@tabler/icons-react";

import {
  IconBrandX,
  IconExchange,
  IconHome,
  IconNewSection,
  IconTerminal2,
} from "@tabler/icons-react";
import { Dock, User } from "lucide-react";
import { useSelector } from "react-redux";

export function ProfileDropdown() {
  const user = useSelector((state: any) => state.user);

  const links = [
    {
      title: "Profile",
      icon: <User className="h-full w-full text-white dark:text-neutral-300" />,
      href: `/profile/${user.login}`,
    },
    {
      title: "Submissions",
      icon: <Dock className="h-full w-full text-white dark:text-neutral-300" />,
      href: `/profile/${user.login}/submission`,
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <IconLayoutNavbarCollapse size={32} className="cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-min h-full !bg-transparent !border-0">
        <FloatingDock items={links} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
