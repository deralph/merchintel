import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-image.jpg';

interface HeroProps {
  onDemoClick: () => void;
}

export const Hero = ({ onDemoClick }: HeroProps) => {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffsetY(window.pageYOffset);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden parallax-container">
      <div
        ref={parallaxRef}
        className="absolute inset-0 parallax-element"
        style={{ transform: `translateY(${offsetY * 0.5}px)` }}
      >
        <img
          src={heroImage}
          alt="Editorial street-style photo of young adults wearing branded merchandise, demonstrating NFC tap technology"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/20 to-transparent" />
      </div>

      <div className="relative h-full container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="max-w-4xl text-background py-8 sm:py-12 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4 sm:mb-6 leading-[1.1] tracking-tight">
            The Smartest Way to Measure Real-World Engagement
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 editorial-text opacity-90 mx-auto max-w-2xl leading-relaxed">
            Turn every merch drop into an ongoing marketing channel.
          </p>
          <Button
            onClick={onDemoClick}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-sm sm:text-base md:text-lg px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 h-auto"
          >
            Show me a Demo
          </Button>
        </div>
      </div>
    </section>
  );
};
