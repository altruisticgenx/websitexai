import React from "react";
import { ScrollToTop } from "@/components/ScrollToTop";
import { ScrollProgress } from "@/components/ScrollProgress";
import { PilotsLandingPage } from "@/PilotsLandingPage";

export default function Index() {
  return (
    <>
      <ScrollProgress />
      <PilotsLandingPage />
      <ScrollToTop />
    </>
  );
}
