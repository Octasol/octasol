import { cn } from "@/lib/utils";
import { githubIcon } from "../Svg/svg";

type Props = {
  data: string | null | undefined;
};

export default function SelectUser({ data }: Props) {
  return (
    <LabelInputContainer className=" bg-gradient-to-br from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 py-2 rounded-md ">
      <div className="flex justify-start items-center px-4 gap-8">
        {githubIcon()}
        <span>{data?.toString() || ""}</span>
      </div>
    </LabelInputContainer>
  );
}

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
