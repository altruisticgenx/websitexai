import * as React from "react";

interface LazySectionProps {
  children: React.ReactNode;
  minHeight?: number;
}

export function LazySection({ children, minHeight = 360 }: LazySectionProps) {
  return (
    <React.Suspense
      fallback={<div style={{ minHeight }} aria-hidden="true" />}
    >
      {children}
    </React.Suspense>
  );
}
