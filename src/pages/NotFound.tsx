import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-subtle px-4">
      <div className="text-center max-w-md">
        <h1 className="mb-4 text-6xl font-bold text-foreground">404</h1>
        <h2 className="mb-3 text-2xl font-semibold text-card-foreground">This item wandered off.</h2>
        <p className="mb-8 text-muted-foreground">
          Looks like this merch went off to a good home. Try scanning another item or go back to Resurge.
        </p>
        <div className="flex gap-4 justify-center">
          <a 
            href="/" 
            className="inline-flex items-center justify-center px-6 py-2 bg-primary text-primary-foreground font-medium rounded-md hover:bg-primary-hover transition-colors"
          >
            Go Home
          </a>
          <a 
            href="mailto:support@resurge.com" 
            className="inline-flex items-center justify-center px-6 py-2 border border-border text-card-foreground font-medium rounded-md hover:bg-muted transition-colors"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
