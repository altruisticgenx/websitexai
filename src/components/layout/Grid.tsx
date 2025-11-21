import * as React from "react";
import { cn } from "@/lib/utils";

type GridGap = "xs" | "sm" | "md" | "lg";

const gapMap: Record<GridGap, string> = {
  xs: "gap-2",
  sm: "gap-4",
  md: "gap-6 sm:gap-8",
  lg: "gap-8 sm:gap-10",
};

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: {
    mobile?: 1 | 2;
    tablet?: 2 | 3 | 4;
    desktop?: 2 | 3 | 4 | 6;
  };
  gap?: GridGap;
}

export function Grid({
  columns = { mobile: 1, tablet: 2, desktop: 3 },
  gap = "md",
  className,
  ...props
}: GridProps) {
  const mobileCols = columns.mobile ?? 1;
  const tabletCols = columns.tablet ?? 2;
  const desktopCols = columns.desktop ?? 3;

  return (
    <div
      className={cn(
        "grid",
        `grid-cols-${mobileCols} sm:grid-cols-${tabletCols} lg:grid-cols-${desktopCols}`,
        gapMap[gap],
        className
      )}
      {...props}
    />
  );
}
