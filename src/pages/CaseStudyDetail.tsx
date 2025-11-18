import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { getCaseStudyBySlug, getAllCaseStudies, CaseStudy } from "@/data/caseStudies";
import { CaseStudyHeader } from "@/components/case-studies/CaseStudyHeader";
import { CaseStudyContent } from "@/components/case-studies/CaseStudyContent";
import { CaseStudyCard } from "@/components/case-studies/CaseStudyCard";

function CaseStudyDetail() {
  const { id } = useParams<{ id: string }>();
  const [caseStudy, setCaseStudy] = useState<CaseStudy | null>(null);
  const [otherCaseStudies, setOtherCaseStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      const study = await getCaseStudyBySlug(id);
      if (!study) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      setCaseStudy(study);

      const allStudies = await getAllCaseStudies();
      const others = allStudies.filter((s) => s.id !== study.id);
      setOtherCaseStudies(others);
      setLoading(false);
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-50 flex items-center justify-center">
        <p className="text-slate-400">Loading case study...</p>
      </div>
    );
  }

  if (notFound || !caseStudy) {
    return <Navigate to="/portfolio" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          to="/portfolio"
          className="mb-8 inline-flex items-center gap-2 text-sm text-slate-400 hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Portfolio
        </Link>

        {/* Case Study Header */}
        <CaseStudyHeader caseStudy={caseStudy} />

        {/* Case Study Content */}
        <CaseStudyContent caseStudy={caseStudy} />

        {/* Call to Action */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-12 rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 to-accent/10 p-8 text-center backdrop-blur-sm"
        >
          <h2 className="mb-3 text-2xl font-bold text-slate-50">
            Ready to start your own pilot?
          </h2>
          <p className="mb-6 text-sm text-slate-300">
            Book a 30-min intro to discuss your pilot project and get a clear weekly plan.
          </p>
          <a
            href="mailto:hello@altruisticxai.com?subject=4-week%20pilot%20-%20AltruisticX%20AI"
            className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/30 hover:opacity-90 transition-opacity"
          >
            Book a 30-min intro
          </a>
        </motion.section>

        {/* More Case Studies */}
        {otherCaseStudies.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-16"
          >
            <h2 className="mb-8 text-2xl font-bold text-slate-50">
              More Case Studies
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {otherCaseStudies.slice(0, 3).map((study, index) => (
                <CaseStudyCard key={study.id} caseStudy={study} index={index} />
              ))}
            </div>
          </motion.section>
        )}
      </div>
    </div>
  );
}

export default CaseStudyDetail;
