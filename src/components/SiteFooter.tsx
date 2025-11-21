import React from "react";

export const SiteFooter: React.FC = React.memo(() => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-12 border-t border-slate-900/80 py-6 text-center text-xs text-slate-500">
      <div className="mx-auto max-w-5xl px-4">
        <p>&copy; {currentYear} AltruisticX AI. Built with React and Tailwind CSS.</p>
        <p className="mt-1">
          <a href="#" className="hover:text-slate-300 transition-colors">
            Privacy
          </a>{" "}
          |{" "}
          <a href="#" className="hover:text-slate-300 transition-colors">
            Terms
          </a>
        </p>
      </div>
    </footer>
  );
});

SiteFooter.displayName = "SiteFooter";
