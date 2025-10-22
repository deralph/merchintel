import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import dashboardMockup from '@/assets/dashboard-mockup.jpg';

interface DashboardPreviewProps {
  onDemoClick: () => void;
}

export const DashboardPreview = ({ onDemoClick }: DashboardPreviewProps) => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll('.fade-up');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-center mb-8 fade-up">
            See Your Data in Real-Time
          </h2>
          <p className="text-xl text-center text-muted-foreground mb-12 fade-up editorial-text">
            Track engagement metrics, tap counts, geographic distribution, and conversion data — all in one powerful dashboard.
          </p>

          <div className="fade-up hover-zoom rounded-lg overflow-hidden mb-8">
            <img
              src={dashboardMockup}
              alt="InteliMerch analytics dashboard displaying engagement metrics, tap counts, and city heatmap on laptop and smartphone"
              className="w-full"
              loading="lazy"
            />
          </div>

          <div className="text-center fade-up">
            <Button
              onClick={onDemoClick}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg px-12 py-6 h-auto"
            >
              Show me a Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
