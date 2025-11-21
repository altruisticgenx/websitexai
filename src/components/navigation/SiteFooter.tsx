import React from "react";

export const SiteFooter: React.FC = React.memo(() => {
  return (
    <footer className="border-t border-slate-900/80 py-4">
      <div className="body-sm flex flex-col items-start justify-between gap-2 text-slate-500 sm:flex-row sm:items-center">
        <div>© {new Date().getFullYear()} AltruisticX AI</div>
        <div className="flex flex-wrap gap-2">
          <span>Async · privacy-aware · built for pilots</span>
        </div>
      </div>
    </footer>
  );
});

SiteFooter.displayName = "SiteFooter";
