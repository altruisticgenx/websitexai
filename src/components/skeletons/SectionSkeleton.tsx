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
