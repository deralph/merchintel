import { useState } from 'react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { WhatWeDo } from '@/components/WhatWeDo';
import { HowItWorks } from '@/components/HowItWorks';
import { WhyChooseMerchly } from '@/components/WhyChooseMerchly';
import { UseCases } from '@/components/UseCases';
import { DashboardPreview } from '@/components/DashboardPreview';
import { FinalCTA } from '@/components/FinalCTA';
import { Footer } from '@/components/Footer';
import { DemoModal } from '@/components/DemoModal';

const Index = () => {
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  const handleDemoClick = () => {
    setDemoModalOpen(true);
  };

  return (
    <div className="min-h-screen">
      <Header onDemoClick={handleDemoClick} />
      <Hero onDemoClick={handleDemoClick} />
      <WhatWeDo />
      <HowItWorks />
      <WhyChooseMerchly />
      <UseCases />
      <DashboardPreview onDemoClick={handleDemoClick} />
      <FinalCTA onDemoClick={handleDemoClick} />
      <Footer />
      <DemoModal open={demoModalOpen} onOpenChange={setDemoModalOpen} />
    </div>
  );
};

export default Index;
