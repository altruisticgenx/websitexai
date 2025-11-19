import { SiteNav } from "@/components/SiteNav";

export default function Solutions() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <main className="mx-auto max-w-6xl px-3 sm:px-4 py-6 sm:py-8">
        <h1 className="text-lg sm:text-xl font-semibold mb-3">Solutions</h1>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Explore our offerings and solutions.
        </p>
      </main>
    </div>
  );
}
