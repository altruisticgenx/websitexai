import * as React from "react";
import { cn } from "@/lib/utils";

type StackGap = "xs" | "sm" | "md" | "lg" | "xl";
type StackDirection = "vertical" | "horizontal";
type StackAlign = "start" | "center" | "end" | "stretch";

const gapMap: Record<StackGap, string> = {
  xs: "gap-2",
  sm: "gap-3 sm:gap-4",
  md: "gap-4 sm:gap-6",
  lg: "gap-6 sm:gap-8",
  xl: "gap-8 sm:gap-10",
};

const dirMap: Record<StackDirection, string> = {
  vertical: "flex-col",
  horizontal: "flex-row",
};

const alignMap: Record<StackAlign, string> = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
};

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  gap?: StackGap;
  direction?: StackDirection;
  align?: StackAlign;
}

export function Stack({
  gap = "md",
  direction = "vertical",
  align = "start",
  className,
  ...props
}: StackProps) {
  return (
    <div
      className={cn(
        "flex",
        dirMap[direction],
        gapMap[gap],
        alignMap[align],
        className
      )}
      {...props}
    />
  );
}
