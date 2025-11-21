import { Skeleton } from "@/components/ui/skeleton";

export function HeroSkeleton() {
  return (
    <section className="py-10 sm:py-14">
      <div className="grid gap-10 md:grid-cols-[minmax(0,1.4fr),minmax(0,1fr)] md:items-center">
        <div className="space-y-4">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-3/4" />
          <Skeleton className="h-20 w-full" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Skeleton className="h-24 w-full rounded-2xl" />
            <Skeleton className="h-24 w-full rounded-2xl" />
            <Skeleton className="h-24 w-full rounded-2xl" />
          </div>
          <div className="flex gap-3">
            <Skeleton className="h-10 w-40 rounded-full" />
            <Skeleton className="h-10 w-60" />
          </div>
        </div>
        <Skeleton className="h-96 w-full rounded-3xl" />
      </div>
    </section>
  );
}

export function CardsSkeleton({ count = 4 }: { count?: number }) {
  return (
    <section className="py-10 sm:py-14">
      <div className="space-y-4 mb-6">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-16 w-full max-w-xl" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="rounded-2xl border border-slate-800/70 bg-slate-900/70 p-4 space-y-3">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-16 w-full" />
            <div className="flex justify-between items-center">
              <Skeleton className="h-6 w-24 rounded-full" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function StepsSkeleton({ count = 3 }: { count?: number }) {
  return (
    <section className="border-t border-slate-900/80 py-10 sm:py-14">
      <div className="space-y-4 mb-6">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-12 w-full max-w-xl" />
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="rounded-2xl border border-slate-800/70 bg-slate-950/50 p-4 space-y-3">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-16 w-full" />
          </div>
        ))}
      </div>
    </section>
  );
}

export function TwoColumnSkeleton() {
  return (
    <section className="border-t border-slate-900/80 py-10 sm:py-14">
      <div className="grid gap-8 md:grid-cols-[minmax(0,1.3fr),minmax(0,1fr)] md:items-center">
        <div className="space-y-4">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-16 w-full" />
          <div className="space-y-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-6 w-full" />
            ))}
          </div>
          <div className="flex gap-3">
            <Skeleton className="h-10 w-40 rounded-full" />
            <Skeleton className="h-16 w-60" />
          </div>
        </div>
        <Skeleton className="h-80 w-full rounded-3xl" />
      </div>
    </section>
  );
}

export function FAQSkeleton({ count = 4 }: { count?: number }) {
  return (
    <section className="border-t border-slate-900/80 py-10 sm:py-14">
      <div className="space-y-4 mb-6">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-12 w-full max-w-xl" />
      </div>
      <div className="space-y-4">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="rounded-2xl border border-slate-800/80 bg-slate-950/60 p-4 space-y-3">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-12 w-full" />
          </div>
        ))}
      </div>
    </section>
  );
}

export function ContactSkeleton() {
  return (
    <section className="border-t border-slate-900/80 py-10 sm:py-14">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="space-y-4">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-12 w-full" />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-12 w-full rounded-lg" />
          <Skeleton className="h-12 w-full rounded-lg" />
          <Skeleton className="h-12 w-full rounded-lg" />
          <Skeleton className="h-32 w-full rounded-lg" />
          <Skeleton className="h-12 w-full rounded-full" />
        </div>
      </div>
    </section>
  );
}

export function CaseStudyDetailSkeleton() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-5xl px-4 py-4 sm:py-6">
        <article className="flex-1 min-w-0">
          {/* Back Button */}
          <Skeleton className="h-3 w-24" />
          
          {/* Header */}
          <div className="mt-3 space-y-2">
            <Skeleton className="h-4 w-32 rounded-full" />
            <Skeleton className="h-8 w-full sm:h-10" />
            <Skeleton className="h-3 w-3/4" />
          </div>

          {/* Timeline & Duration */}
          <div className="mt-3 flex gap-2">
            <Skeleton className="h-6 w-20 rounded-lg" />
            <Skeleton className="h-6 w-28 rounded-lg" />
          </div>

          {/* Summary Card */}
          <Skeleton className="mt-4 h-20 w-full rounded-lg" />

          {/* Challenge Section */}
          <div className="mt-6 space-y-2">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-16 w-full" />
          </div>

          {/* Solution Section */}
          <div className="mt-6 space-y-2">
            <Skeleton className="h-5 w-28" />
            <Skeleton className="h-16 w-full" />
          </div>

          {/* Outcomes Grid */}
          <div className="mt-6 space-y-3">
            <Skeleton className="h-5 w-32" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-16 w-full rounded-lg" />
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="mt-6 space-y-3">
            <Skeleton className="h-5 w-40" />
            <div className="space-y-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-24 w-full rounded-lg" />
              ))}
            </div>
          </div>

          {/* Technologies */}
          <div className="mt-6 space-y-3">
            <Skeleton className="h-5 w-36" />
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-6 w-24 rounded-full" />
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <Skeleton className="mt-8 mb-4 h-32 w-full rounded-lg" />
        </article>
      </div>
    </div>
  );
}

export function LocationsSkeleton() {
  return (
    <section className="border-t border-slate-900/80 py-6 sm:py-8">
      <div className="max-w-4xl space-y-2">
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-4 w-full max-w-md" />
      </div>
      <div className="mt-4 grid gap-2.5 sm:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-slate-800/70 bg-slate-950/50 p-3 space-y-2">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-12 w-full" />
          </div>
        ))}
      </div>
    </section>
  );
}

export function OrganizationTypesSkeleton() {
  return (
    <section className="py-6 sm:py-8">
      <div className="max-w-4xl space-y-2">
        <Skeleton className="h-7 w-56" />
      </div>
      <div className="mt-4 grid gap-2.5 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-border bg-card/30 p-3 text-center space-y-2">
            <Skeleton className="h-5 w-5 mx-auto" />
            <Skeleton className="h-4 w-32 mx-auto" />
            <Skeleton className="h-3 w-3 mx-auto" />
          </div>
        ))}
      </div>
    </section>
  );
}

export function TableSkeleton() {
  return (
    <section className="border-t border-slate-900/80 py-6 sm:py-8">
      <div className="max-w-4xl space-y-2">
        <Skeleton className="h-6 w-56" />
        <Skeleton className="h-4 w-full max-w-2xl" />
      </div>
      <div className="mt-4 overflow-x-auto rounded-xl border border-white/10">
        <div className="min-w-full">
          {/* Table header */}
          <div className="border-b border-white/10 bg-white/5 p-4 grid grid-cols-4 gap-4">
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-32" />
          </div>
          {/* Table rows */}
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="border-b border-white/5 p-4 grid grid-cols-4 gap-4">
              <Skeleton className="h-5 w-5" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
