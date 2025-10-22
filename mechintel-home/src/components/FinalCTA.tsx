import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';

interface FinalCTAProps {
  onDemoClick: () => void;
}

export const FinalCTA = ({ onDemoClick }: FinalCTAProps) => {
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
    <section ref={sectionRef} className="py-16 sm:py-20 md:py-24 lg:py-32 bg-foreground text-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6 sm:mb-8 fade-up max-w-4xl mx-auto leading-tight tracking-tight">
          Let's Turn Your Merch Into a Marketing Channel That Never Ends
        </h2>
        <div className="fade-up">
          <Button
            onClick={onDemoClick}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-sm sm:text-base md:text-lg px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 h-auto w-full sm:w-auto"
          >
            Show me a Demo
          </Button>
        </div>
      </div>
    </section>
  );
};
