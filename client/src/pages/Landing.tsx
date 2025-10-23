import { useState } from "react";
import { Header } from "./landing/components/Header";
import { Hero } from "./landing/components/Hero";
import { WhatWeDo } from "./landing/components/WhatWeDo";
import { HowItWorks } from "./landing/components/HowItWorks";
import { WhyChooseMerchly } from "./landing/components/WhyChooseMerchly";
import { UseCases } from "./landing/components/UseCases";
import { DashboardPreview } from "./landing/components/DashboardPreview";
import { FinalCTA } from "./landing/components/FinalCTA";
import { Footer } from "./landing/components/Footer";
import { DemoModal } from "./landing/components/DemoModal";

const Landing = () => {
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  const handleDemoClick = () => {
    setDemoModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onDemoClick={handleDemoClick} />
      <main>
        <Hero onDemoClick={handleDemoClick} />
        <WhatWeDo />
        <HowItWorks />
        <WhyChooseMerchly />
        <UseCases />
        <DashboardPreview onDemoClick={handleDemoClick} />
        <FinalCTA onDemoClick={handleDemoClick} />
      </main>
      <Footer />
      <DemoModal open={demoModalOpen} onOpenChange={setDemoModalOpen} />
    </div>
  );
};

export default Landing;
