import type { ReactNode } from "react";

interface SectionProps {
  id?: string;
  eyebrow?: string;
  title: string;
  intro?: string;
  children?: ReactNode;
}

export function Section({ id, eyebrow, title, intro, children }: SectionProps) {
  return (
    <section id={id} className="py-10 md:py-16">
      <div className="mx-auto w-full max-w-5xl px-4 md:px-6">
        {eyebrow && (
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            {eyebrow}
          </p>
        )}
        <h2 className="mt-2 text-xl font-semibold tracking-tight text-foreground sm:text-2xl lg:text-3xl">
          {title}
        </h2>
        {intro && (
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
            {intro}
          </p>
        )}
        {children && <div className="mt-6">{children}</div>}
      </div>
    </section>
  );
}
