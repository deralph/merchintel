import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-image.jpg";

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

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="parallax-container relative h-screen w-full overflow-hidden">
      <div
        ref={parallaxRef}
        className="parallax-element absolute inset-0"
        style={{ transform: `translateY(${offsetY * 0.5}px)` }}
      >
        <img
          src={heroImage}
          alt="Editorial street-style photo of young adults wearing branded merchandise, demonstrating NFC tap technology"
          className="h-full w-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/20 to-transparent" />
      </div>

      <div className="container relative mx-auto flex h-full items-center justify-center px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="max-w-4xl text-center text-background">
          <h1 className="text-3xl font-display font-bold leading-[1.1] tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
            The Smartest Way to Measure Real-World Engagement
          </h1>
          <p className="editorial-text mx-auto mt-6 max-w-2xl text-base opacity-90 sm:text-lg md:mt-8 md:text-xl lg:text-2xl">
            Turn every merch drop into an ongoing marketing channel.
          </p>
          <Button
            onClick={onDemoClick}
            size="lg"
            className="mt-6 h-auto px-6 py-3 text-sm font-semibold sm:px-8 sm:py-4 sm:text-base md:px-10 md:py-5 md:text-lg"
          >
            Show me a Demo
          </Button>
        </div>
      </div>
    </section>
  );
};
