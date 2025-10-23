import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";

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
    <section ref={sectionRef} className="bg-foreground py-16 text-background sm:py-20 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 text-center sm:px-6 lg:px-8">
        <h2 className="fade-up mx-auto max-w-4xl text-2xl font-display font-bold leading-tight tracking-tight sm:text-3xl md:text-4xl lg:text-5xl">
          Let&apos;s Turn Your Merch Into a Marketing Channel That Never Ends
        </h2>
        <div className="fade-up mt-8">
          <Button
            onClick={onDemoClick}
            size="lg"
            className="h-auto w-full px-6 py-3 text-sm font-semibold sm:w-auto sm:px-8 sm:py-4 sm:text-base md:px-10 md:py-5 md:text-lg"
          >
            Show me a Demo
          </Button>
        </div>
      </div>
    </section>
  );
};
