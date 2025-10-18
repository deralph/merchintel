import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { api } from "@/lib/api";
import type { CompleteScanPayload } from "@/types/api";

const useSessionToken = () => {
  const location = useLocation();
  return useMemo(() => new URLSearchParams(location.search).get("session"), [location.search]);
};

const ScanGateway = () => {
  const { tag_uid } = useParams();
  const token = useSessionToken();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [emailConsent, setEmailConsent] = useState(false);
  const [locationConsent, setLocationConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!token) {
      toast.warning("You need to tap the NFC tag again to unlock this look.");
    }
  }, [token]);

  const sessionQuery = useQuery({
    queryKey: ["scan-session", token],
    enabled: Boolean(token),
    queryFn: () => {
      if (!token) {
        throw new Error("Missing scan token");
      }
      return api.consumeScanSession(token);
    },
    retry: false,
  });

  const completeMutation = useMutation({
    mutationFn: async (payload: CompleteScanPayload) => {
      if (!token) {
        throw new Error("Missing scan token");
      }
      return api.completeScanSession(token, payload);
    },
    onSuccess: (response) => {
      setSubmitted(true);
      toast.success("Scan captured. Redirecting you to the drop…");
      setTimeout(() => {
        window.location.href = response.redirectUrl;
      }, 2000);
    },
    onError: (error: Error) => {
      toast.error(error.message || "We couldn't save that scan. Please tap again.");
    },
  });

  const handleRescan = () => {
    navigate("/", { replace: true });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!emailConsent) {
      toast.error("Email consent is required to unlock the experience.");
      return;
    }

    const payload: CompleteScanPayload = {
      email,
      emailConsent,
      locationConsent,
    };

    completeMutation.mutate(payload);
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-[#0B0B0B] flex items-center justify-center px-4 py-16">
        <Card className="max-w-md w-full bg-[#0B0B0B]/80 border border-[#E6E2DC]/20 text-[#F6F5F3] p-10 space-y-6">
          <AlertCircle className="w-14 h-14 text-[#D94F2F] mx-auto" />
          <div className="space-y-3 text-center">
            <h1 className="text-3xl font-serif tracking-tight">Tap required</h1>
            <p className="text-sm text-[#E6E2DC]/70">
              This garment story opens only with a fresh NFC tap. Bring your device to the tag to relive the experience.
            </p>
          </div>
          <Button onClick={handleRescan} variant="secondary" className="bg-[#F2EFEA] text-[#0B0B0B] hover:bg-[#E6E2DC]">
            Return home
          </Button>
        </Card>
      </div>
    );
  }

  if (sessionQuery.isError) {
    return (
      <div className="min-h-screen bg-[#0B0B0B] flex items-center justify-center px-4 py-16">
        <Card className="max-w-md w-full bg-[#0B0B0B]/80 border border-[#E6E2DC]/20 text-[#F6F5F3] p-10 space-y-6">
          <AlertCircle className="w-14 h-14 text-[#D94F2F] mx-auto" />
          <div className="space-y-3 text-center">
            <h1 className="text-3xl font-serif tracking-tight">Session expired</h1>
            <p className="text-sm text-[#E6E2DC]/70">
              The secure link tied to this tag has already been opened or expired. Tap the merch again to continue.
            </p>
          </div>
          <Button onClick={handleRescan} variant="secondary" className="bg-[#F2EFEA] text-[#0B0B0B] hover:bg-[#E6E2DC]">
            Start over
          </Button>
        </Card>
      </div>
    );
  }

  if (sessionQuery.isLoading || !sessionQuery.data) {
    return (
      <div className="min-h-screen bg-[#0B0B0B] flex flex-col items-center justify-center text-[#F6F5F3] space-y-6">
        <div className="w-16 h-16 rounded-full border-2 border-[#F2EFEA]/40 border-t-[#D94F2F] animate-spin" />
        <p className="text-sm uppercase tracking-[0.4em] text-[#E6E2DC]/60">Authenticating scan</p>
      </div>
    );
  }

  const { tag, expiresAt } = sessionQuery.data;

  return (
    <div className="min-h-screen bg-[#0B0B0B] flex items-center justify-center px-4 py-16 text-[#F6F5F3]">
      <Card className="w-full max-w-2xl bg-[#0B0B0B]/80 border border-[#E6E2DC]/20 p-10 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.7)]">
        <div className="grid gap-10 md:grid-cols-[1.2fr,1fr]">
          <div className="space-y-6">
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.35em] text-[#E6E2DC]/60">{tag.campaign}</p>
              <h1 className="text-4xl font-serif tracking-tight">{tag.brand}</h1>
              <p className="text-sm text-[#E6E2DC]/70 leading-relaxed">{tag.description}</p>
            </div>
            <div className="rounded-xl border border-[#E6E2DC]/15 bg-[#F2EFEA]/5 px-6 py-4 text-sm text-[#E6E2DC]/80">
              <p className="font-medium text-[#F6F5F3]">Tag details</p>
              <p>Material: {tag.material}</p>
              <p>Session expires at {new Date(expiresAt).toLocaleTimeString()}</p>
              {tag_uid && (
                <p className="text-xs text-[#E6E2DC]/60 mt-2">Tag ID: {tag_uid}</p>
              )}
            </div>
            <Button
              variant="ghost"
              onClick={handleRescan}
              className="text-[#C9A66B] hover:text-[#F6F5F3] hover:bg-[#F2EFEA]/5"
            >
              Rescan merch
            </Button>
          </div>

          <div className="bg-[#F2EFEA]/10 border border-[#E6E2DC]/20 rounded-2xl p-6 backdrop-blur-sm">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm uppercase tracking-[0.25em] text-[#E6E2DC]/60">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@example.com"
                    required
                    className="bg-[#0B0B0B] border-[#E6E2DC]/30 text-[#F6F5F3] placeholder:text-[#E6E2DC]/40"
                  />
                </div>

                <div className="space-y-4 text-sm text-[#E6E2DC]/80">
                  <label className="flex items-start space-x-3">
                    <Checkbox checked={emailConsent} onCheckedChange={(value) => setEmailConsent(Boolean(value))} />
                    <span>
                      I consent to receive drops, collection stories, and exclusive invites tied to this merch.
                    </span>
                  </label>
                  <label className="flex items-start space-x-3">
                    <Checkbox checked={locationConsent} onCheckedChange={(value) => setLocationConsent(Boolean(value))} />
                    <span>Share my approximate location for limited-run insights.</span>
                  </label>
                </div>

                <Button
                  type="submit"
                  disabled={completeMutation.isPending}
                  className="w-full bg-[#D94F2F] hover:bg-[#c24629] text-[#F6F5F3]"
                >
                  {completeMutation.isPending ? "Saving…" : "Unlock the experience"}
                </Button>

                <p className="text-xs text-[#E6E2DC]/60 text-center">
                  This link closes after use. Bookmarking won&apos;t work—keep the NFC tag close when you want to return.
                </p>
              </form>
            ) : (
              <div className="text-center space-y-4 py-10">
                <CheckCircle2 className="w-14 h-14 text-[#C9A66B] mx-auto" />
                <div className="space-y-2">
                  <p className="text-xl font-serif">Captured</p>
                  <p className="text-sm text-[#E6E2DC]/70">Hold tight while we whisk you to the exclusive content.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ScanGateway;
