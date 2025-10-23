import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import dashboardMockup from "@mechhome-assets/dashboard-mockup.jpg";

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
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll(".fade-up");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-background py-24">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-5xl">
          <h2 className="fade-up mb-8 text-center text-4xl font-display font-bold md:text-5xl">
            See Your Data in Real-Time
          </h2>
          <p className="fade-up mb-12 text-center text-xl text-muted-foreground editorial-text">
            Track engagement metrics, tap counts, geographic distribution, and conversion data — all in one powerful dashboard.
          </p>

          <div className="fade-up hover-zoom mb-8 overflow-hidden rounded-lg">
            <img
              src={dashboardMockup}
              alt="InteliMerch analytics dashboard displaying engagement metrics, tap counts, and city heatmap on laptop and smartphone"
              className="w-full"
              loading="lazy"
            />
          </div>

          <div className="fade-up text-center">
            <Button
              onClick={onDemoClick}
              size="lg"
              className="h-auto px-12 py-6 text-lg font-semibold"
            >
              Show me a Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
