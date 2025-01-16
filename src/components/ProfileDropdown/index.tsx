import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FloatingDock } from "@/components/ui/floating-dock";

import {
  IconBrandX,
  IconExchange,
  IconHome,
  IconNewSection,
  IconTerminal2,
} from "@tabler/icons-react";

const links = [
  {
    title: "Home",
    icon: (
      <IconHome className="h-full w-full text-white dark:text-neutral-300" />
    ),
    href: "#hero",
  },
  {
    title: "About",
    icon: (
      <IconTerminal2 className="h-full w-full text-white dark:text-neutral-300" />
    ),
    href: "#about",
  },
  {
    title: "Programs",
    icon: (
      <IconNewSection className="h-full w-full text-white dark:text-neutral-300" />
    ),
    href: "#program",
  },
  {
    title: "Courses",
    icon: (
      <IconExchange className="h-full w-full text-white dark:text-neutral-300" />
    ),
    href: "#courses",
  },
  {
    title: "Workshop",
    icon: (
      <IconBrandX className="h-full w-full text-white dark:text-neutral-300" />
    ),
    href: "#workshop",
  },
];

export function ProfileDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-min h-full !bg-transparent !border-0">
        <FloatingDock items={links} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
