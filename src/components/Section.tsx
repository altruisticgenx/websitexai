import * as React from "react";
import { cn } from "@/lib/utils";
import { Container } from "./layout/Container";

type SectionSpacing = "compact" | "normal" | "spacious";
type SectionBorder = "top" | "bottom" | "both" | "none";

const spacingMap: Record<SectionSpacing, string> = {
  compact: "py-8 sm:py-10",
  normal: "py-10 sm:py-14 lg:py-16",
  spacious: "py-12 sm:py-16 lg:py-20",
};

const borderMap: Record<SectionBorder, string> = {
  none: "",
  top: "border-t border-white/10",
  bottom: "border-b border-white/10",
  both: "border-y border-white/10",
};

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  spacing?: SectionSpacing;
  border?: SectionBorder;
  containerSize?: React.ComponentProps<typeof Container>["size"];
  containerClassName?: string;
}

export function Section({
  spacing = "normal",
  border = "none",
  containerSize = "xl",
  containerClassName,
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        "relative w-full",
        spacingMap[spacing],
        borderMap[border],
        className
      )}
      {...props}
    >
      <Container size={containerSize} className={containerClassName}>
        {children}
      </Container>
    </section>
  );
}
