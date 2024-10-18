import { cn } from "@/lib/utils";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    title: string;
    number: string;
    body: string;
    assignees: [];
    comments: number;
    repository_url: string;
  }[];
  className?: string;
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const router = useRouter();
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4  py-10 !bg-black",
        className
      )}
    >
      {items.map((item, idx) => (
        <div
          key={idx}
          className={cn(
            "relative group  block p-2 h-full w-full cursor-pointer",
            item.assignees.length > 1 && "!cursor-not-allowed opacity-50"
          )}
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
          onClick={() => {
            if (item.assignees.length > 1) return;
            router.push(
              `/repoinitialize/${item.repository_url.split("/")[5]}/${
                item.number
              }`
            );
          }}
        >
          <Card>
            <div
              className={cn(
                "rounded-2xl h-full w-full p-4 overflow-hidden bg-black border border-transparent dark:border-white/30 group-hover:border-slate-700 hover:shadow-lg hover:shadow-slate-800 relative z-20 min-h-44 flex flex-col justify-between",
                item.assignees.length > 1 &&
                  "hover:shadow-none group-hover:border-white/30",
                className
              )}
            >
              <div>
                <CardTitle className="text-lg flex justify-between items-center ">
                  <span className="truncate pe-5">{item.title}&nbsp;</span>
                  <span className="text-gray-500">#{item.number}</span>
                </CardTitle>
                <CardDescription className="truncate pe-8">
                  {item.body}
                </CardDescription>
              </div>
              <div className="pt-6 w-full flex justify-between items-center gap-1">
                <span
                  className={cn(
                    "flex rounded-full  focus:outline-none border-[1px] px-4 py-1.5  justify-center items-center  text-sm",
                    item.assignees.length == 0
                      ? "border-[#4380be] text-[#488bcd] "
                      : item.assignees.length > 1
                      ? "border-red-800 text-red-600 "
                      : "border-purple-400 text-purple-400"
                  )}
                >
                  {item.assignees.length == 0
                    ? "Open"
                    : item.assignees.length > 1
                    ? "Too Many Assignees"
                    : "Assigned"}
                </span>
              </div>
            </div>
          </Card>
        </div>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="relative z-50">
      <div className="p-2">{children}</div>
    </div>
  );
};
export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4 className={cn("text-zinc-100 font-bold tracking-wide ", className)}>
      {children}
    </h4>
  );
};
export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "mt-2 text-zinc-400 tracking-wide leading-relaxed text-sm",
        className
      )}
    >
      {children}
    </p>
  );
};
