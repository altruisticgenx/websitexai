import React from "react";
import { Link } from "react-router-dom";

export default function FutureProofingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-300">AltruisticX AI</Link>
            <Link to="/" className="text-xs text-slate-400 hover:text-slate-200">← Back to home</Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 pb-24 pt-20 sm:px-6 lg:px-8">
        <section className="mb-16 grid gap-10 lg:grid-cols-[3fr,2fr] lg:items-center">
          <div>
            <p className="mb-3 inline-flex rounded-full border border-emerald-400/40 bg-emerald-400/10 px-3 py-1 text-xs font-medium uppercase tracking-wide text-emerald-300">
              Future-Proofing the Student
            </p>
            <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              Solving Division Through <span className="bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">Education, Not Outrage</span>
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
              A hands-on civic lab where students use real bills, real pilots, and real data to practice fixing systems—not just arguing opinions.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <button className="inline-flex items-center justify-center rounded-lg border border-emerald-400/60 bg-emerald-400/10 px-4 py-2 text-sm font-medium text-emerald-200 shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-400/20">
                Get the Classroom Starter Kit
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
