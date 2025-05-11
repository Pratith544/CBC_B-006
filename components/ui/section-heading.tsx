import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  icon?: ReactNode;
}

export function SectionHeading({
  title,
  subtitle,
  align = "left",
  className,
  titleClassName,
  subtitleClassName,
  icon,
}: SectionHeadingProps) {
  const alignment = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  return (
    <div className={cn("mb-8", alignment[align], className)}>
      {icon && <div className="flex justify-center mb-4">{icon}</div>}
      <h2
        className={cn(
          "text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100",
          titleClassName
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-2 text-gray-600 dark:text-gray-400 max-w-2xl",
            align === "center" && "mx-auto",
            align === "right" && "ml-auto",
            subtitleClassName
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
