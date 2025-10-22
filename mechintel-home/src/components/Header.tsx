import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  onDemoClick: () => void;
}

export const Header = ({ onDemoClick }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between">
        <h1 className="text-lg sm:text-xl md:text-2xl font-display font-bold tracking-tight">InteliMerch</h1>
        <Button 
          onClick={onDemoClick}
          size="default"
          className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-4 sm:px-6 text-sm sm:text-base"
        >
          <span className="hidden sm:inline">Show me a Demo</span>
          <span className="sm:hidden">Demo</span>
        </Button>
      </div>
    </header>
  );
};
