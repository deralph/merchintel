import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { CheckCircle2, MapPin, Mail } from "lucide-react";
import { toast } from "sonner";

const ScanGateway = () => {
  const { tag_uid } = useParams();
  const [showConsent, setShowConsent] = useState(true);
  const [email, setEmail] = useState("");
  const [locationConsent, setLocationConsent] = useState(false);
  const [emailConsent, setEmailConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Mock campaign data
  const campaign = {
    name: "Summer Festival 2025",
    brand: "Acme Events",
    logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=200&fit=crop",
    description: "Thanks for checking out our merch! Scan to unlock exclusive content.",
    destinationUrl: "https://acmeevents.com/summer-festival",
    primaryColor: "hsl(233, 47%, 51%)",
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!emailConsent) {
      toast.error("Please provide email consent to continue");
      return;
    }

    // Mock scan event POST
    const scanData = {
      tag_uid,
      email: emailConsent ? email : null,
      location_consent: locationConsent,
      timestamp: new Date().toISOString(),
      // In production, would capture coarse geohash here
    };

    console.log("Scan event:", scanData);
    
    setSubmitted(true);
    setShowConsent(false);

    // Redirect after 2 seconds
    setTimeout(() => {
      window.location.href = campaign.destinationUrl;
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
      <Card className="max-w-md w-full p-8 text-center animate-scale-in shadow-xl border border-border bg-card">
        {/* Campaign Branding */}
        <div className="mb-6">
          <img 
            src={campaign.logo} 
            alt={campaign.brand}
            className="w-20 h-20 rounded-full mx-auto mb-4 object-cover ring-4 ring-primary/20"
          />
          <h1 className="text-2xl font-bold text-card-foreground mb-2">{campaign.brand}</h1>
          <p className="text-muted-foreground">{campaign.name}</p>
        </div>

        {!submitted ? (
          <>
            <p className="text-card-foreground mb-6">{campaign.description}</p>
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
