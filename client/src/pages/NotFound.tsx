import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0B0B0B] px-6">
      <div className="max-w-lg rounded-[2.5rem] border border-[#E6E2DC]/20 bg-[#0B0B0B]/80 p-12 text-center text-[#E6E2DC]/70 shadow-[0_40px_120px_-60px_rgba(0,0,0,0.7)]">
        <p className="text-xs uppercase tracking-[0.4em] text-[#E6E2DC]/50">Merchly</p>
        <h1 className="mt-4 text-6xl text-[#F6F5F3]">404</h1>
        <h2 className="mt-3 text-2xl text-[#F6F5F3]">The look you&apos;re chasing isn&apos;t here.</h2>
        <p className="mt-4 text-sm">
          This tap session has slipped away. For fresh access, bring your device back to the NFC tag and let Merchly reopen the experience.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-[#D94F2F] px-6 py-2.5 text-sm font-medium text-[#F6F5F3] hover:bg-[#c24629]"
          >
            Return home
          </a>
          <a
            href="mailto:support@merchly.app"
            className="inline-flex items-center justify-center rounded-full border border-[#E6E2DC]/30 px-6 py-2.5 text-sm font-medium text-[#F6F5F3] hover:border-[#F6F5F3]"
          >
            Contact Merchly
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
