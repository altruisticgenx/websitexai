import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { getAllCaseStudies } from "@/data/caseStudies";
import { CaseStudyCard } from "@/components/case-studies/CaseStudyCard";

function Portfolio() {
  const caseStudies = getAllCaseStudies();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <Link
            to="/"
            className="mb-6 inline-flex items-center gap-2 text-sm text-slate-400 hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="mb-4 text-3xl font-bold text-slate-50 sm:text-4xl lg:text-5xl">
              Recent Builds & Pilots
            </h1>
            <p className="max-w-2xl text-lg text-slate-300">
              Real examples from energy, education, and founder-backed work. The details
              change, but the pattern is the same: pick a small surface area and ship
              something real.
            </p>
          </motion.div>
        </div>

        {/* Case Studies Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {caseStudies.map((study, index) => (
            <CaseStudyCard key={study.id} caseStudy={study} index={index} />
          ))}
        </div>

        {/* Call to Action */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 to-accent/10 p-8 text-center backdrop-blur-sm"
        >
          <h2 className="mb-3 text-2xl font-bold text-slate-50">
            Want to see how this approach fits your pilot?
          </h2>
          <p className="mb-6 text-sm text-slate-300">
            Send a quick Loom or doc about your project. If it's a fit, we can start
            shipping next week.
          </p>
          <a
            href="mailto:hello@altruisticxai.com?subject=4-week%20pilot%20-%20AltruisticX%20AI"
            className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/30 hover:opacity-90 transition-opacity"
          >
            Book a 30-min intro
          </a>
        </motion.section>
      </div>
    </div>
  );
}

export default Portfolio;
