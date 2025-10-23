import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onDemoClick: () => void;
}

export const Header = ({ onDemoClick }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
        <h1 className="text-lg font-display font-bold tracking-tight sm:text-xl md:text-2xl">InteliMerch</h1>
        <Button
          onClick={onDemoClick}
          size="default"
          className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 text-sm font-medium sm:px-6 sm:text-base"
        >
          <span className="hidden sm:inline">Show me a Demo</span>
          <span className="sm:hidden">Demo</span>
        </Button>
      </div>
    </header>
  );
};
