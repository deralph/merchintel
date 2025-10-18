import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { CheckCircle2, MapPin, Mail, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/lib/api";
import type { TagExperienceResponse } from "@/types/api";

const ScanGateway = () => {
  const { clientSlug, tag_uid } = useParams();
  const [showConsent, setShowConsent] = useState(true);
  const [email, setEmail] = useState("");
  const [locationConsent, setLocationConsent] = useState(false);
  const [emailConsent, setEmailConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [tagData, setTagData] = useState<TagExperienceResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isClaimed, setIsClaimed] = useState(false);
  const sessionIdRef = useRef<string | null>(null);
  const heartbeatIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch tag data and start heartbeat
  useEffect(() => {
    const fetchTagData = async () => {
      try {
        if (!tag_uid) {
          setError("Tag identifier missing");
          setLoading(false);
          return;
        }

        const tagExperience = await api.getTagExperience(tag_uid, clientSlug);

        setTagData(tagExperience);
        setIsClaimed(tagExperience.is_claimed);
        setLoading(false);

        const sessionId = `session_${Date.now()}_${Math.random().toString(36).slice(2)}`;
        sessionIdRef.current = sessionId;
        await api.startSession({ sessionId, tagUid: tag_uid, clientSlug });

        heartbeatIntervalRef.current = setInterval(() => {
          if (sessionIdRef.current) {
            api.heartbeat(sessionIdRef.current).catch(() => {
              // best-effort heartbeat
            });
          }
        }, 10000);
      } catch (err) {
        console.error(err);
        setError("Tag not found or invalid");
        setLoading(false);
      }
    };

    fetchTagData();

    // Cleanup heartbeat on unmount
    return () => {
      if (heartbeatIntervalRef.current) {
        clearInterval(heartbeatIntervalRef.current);
      }
    };
  }, [clientSlug, tag_uid]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!emailConsent) {
      toast.error("Please provide email consent to continue");
      return;
    }

    // Stop heartbeat
    if (heartbeatIntervalRef.current) {
      clearInterval(heartbeatIntervalRef.current);
    }

    try {
      await api.recordScanEvent({
        tag_uid: tag_uid ?? "",
        client_slug: clientSlug,
        email: emailConsent ? email : null,
        location_consent: locationConsent,
        session_id: sessionIdRef.current,
        timestamp: new Date().toISOString(),
      });
    } catch (submissionError) {
      toast.error("We couldn't record your scan. Please try again.");
      console.error(submissionError);
      return;
    }

    setSubmitted(true);
    setShowConsent(false);

    // Redirect after 2 seconds
    setTimeout(() => {
      if (tagData) {
        window.location.href = tagData.redirect_url;
      }
    }, 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-8 text-center">
          <AlertCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-card-foreground mb-2">Tag Not Found</h2>
          <p className="text-muted-foreground mb-6">{error}</p>
          <a href="/" className="text-primary hover:text-primary-hover underline">
            Return to Home
          </a>
        </Card>
      </div>
    );
  }

  if (isClaimed) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-8 text-center">
          <AlertCircle className="w-16 h-16 text-accent mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-card-foreground mb-2">Already Claimed</h2>
          <p className="text-muted-foreground mb-6">
            This item has already found its home! If you think this is an error, please contact support.
          </p>
          <a href="/" className="text-primary hover:text-primary-hover underline">
            Scan Another Item
          </a>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
      <Card className="max-w-md w-full p-8 text-center animate-scale-in shadow-xl border border-border bg-card">
        {/* Campaign Branding */}
        <div className="mb-6">
          <img
            src={tagData.logo}
            alt={tagData.brand}
            className="w-20 h-20 rounded-full mx-auto mb-4 object-cover ring-4 ring-primary/20"
          />
          <h1 className="text-2xl font-bold text-card-foreground mb-2">{tagData.brand}</h1>
          <p className="text-muted-foreground">{tagData.campaign_name}</p>
          <p className="text-xs text-muted-foreground mt-1">Material: {tagData.material}</p>
        </div>

        {!submitted ? (
          <>
            <p className="text-card-foreground mb-6">{tagData.description}</p>
            <Button
              onClick={() => setShowConsent(true)}
              size="lg"
              className="w-full bg-primary hover:bg-primary-hover text-primary-foreground shadow-lg"
            >
              Continue to Experience
            </Button>
            <p className="text-xs text-muted-foreground mt-4">
              Tag ID: {tag_uid}
            </p>
            <p className="text-xs text-muted-foreground">
              💡 Tip: Use the same email for all your merch to track your collection!
            </p>
          </>
        ) : (
          <div className="py-8 animate-fade-in">
            <CheckCircle2 className="w-16 h-16 text-success mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-card-foreground mb-2">Success!</h2>
            <p className="text-muted-foreground mb-4">
              Your scan has been recorded. Redirecting you now...
            </p>
          </div>
        )}
      </Card>

      {/* Consent Modal */}
      <Dialog open={showConsent} onOpenChange={setShowConsent}>
        <DialogContent className="sm:max-w-md bg-card">
          <DialogHeader>
            <DialogTitle className="text-card-foreground">Data Consent</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              We'd like to collect some information to personalize your experience and improve our campaigns.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6 mt-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-card-foreground mb-2">
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="bg-background"
                required={emailConsent}
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="email-consent"
                  checked={emailConsent}
                  onCheckedChange={(checked) => setEmailConsent(checked as boolean)}
                  className="mt-1"
                />
                <label htmlFor="email-consent" className="text-sm text-card-foreground leading-relaxed cursor-pointer">
                  <Mail className="w-4 h-4 inline mr-1 text-primary" />
                  I agree to receive updates about this campaign (required)
                </label>
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="location-consent"
                  checked={locationConsent}
                  onCheckedChange={(checked) => setLocationConsent(checked as boolean)}
                  className="mt-1"
                />
                <label htmlFor="location-consent" className="text-sm text-card-foreground leading-relaxed cursor-pointer">
                  <MapPin className="w-4 h-4 inline mr-1 text-primary" />
                  Share approximate location for regional insights (optional)
                </label>
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <Button 
                type="submit" 
                className="w-full bg-accent hover:bg-accent-hover text-accent-foreground"
                disabled={!emailConsent}
              >
                Continue
              </Button>
              <p className="text-xs text-muted-foreground mt-3 text-center">
                Your data is encrypted and never shared with third parties. See our{" "}
                <a href="#" className="underline hover:text-card-foreground">Privacy Policy</a>.
              </p>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ScanGateway;
