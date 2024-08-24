import { POST } from "@/config/axios/requests";
import { cn } from "@/lib/utils";
import { useSelector } from "react-redux";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[20rem] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 max-w-9xl px-6 py-4 md:py-0",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  button,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  button?: React.ReactNode;
}) => {
  const user = useSelector((state: any) => state.user);
  const handleConnect = async (type: any) => {
    let data = type.props.children.props.children.props.children;

    switch (data) {
      case "Hackerrank":
        const response = await POST("/devprofile/hackerrank", {
          userId: "rbcrocks",
          providerId: "173b32e0-a611-42ad-9cb7-ab4029c0a72a",
        });
        break;
      default:
        break;
    }
  };

  return (
    <div
      className={cn(
        "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-white border border-transparent justify-between flex flex-col space-y-4 w-72",
        className
      )}
    >
      <div className="flex w-full justify-center items-center h-full">
        {header}
      </div>

      <div className="group-hover/bento:translate-x-2 transition duration-200">
        {icon}
        <div className="w-full h-min flex justify-between items-between">
          <div className="font-sans font-bold text-neutral-600 dark:text-neutral-200 mb-2 mt-2">
            {title}
          </div>
          <div
            onClick={() => handleConnect(title)}
            className={cn(
              "bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6 text-white inline-block"
            )}
          >
            <span className="absolute inset-0 overflow-hidden rounded-full">
              <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
            </span>
            <div className="relative flex space-x-2 justify-between items-center z-10 rounded-full bg-zinc-950 py-2 px-5 ring-1 ring-white/10 ">
              <span className="text-sm md:text-base">Connect&nbsp;</span>
            </div>
            <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40"></span>
          </div>
        </div>
        <div className="font-sans font-normal text-neutral-600 text-xs dark:text-neutral-300">
          {title == "Github" ? `${user?.name}` : description}
        </div>
      </div>
    </div>
  );
};
