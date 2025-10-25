import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface DemoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const DemoModal = ({ open, onOpenChange }: DemoModalProps) => {
  const [email, setEmail] = useState("");
  const [brandName, setBrandName] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const reset = () => {
    setEmail("");
    setBrandName("");
    setIsSubmitted(false);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    const scriptURL = "https://script.google.com/macros/s/AKfycbyFBEoCpaTEFTACqUx2IkF9yOIQ4u8A2j69E4LdRZO0qxxD_rn9DFdw2dwwCMgGWVbZ/exec"; // ← replace this

    try {
      const formData = new FormData();
      formData.append("Email Address", email);
      formData.append("Brand Name", brandName);
      formData.append("Date", new Date().toISOString());

      const response = await fetch(scriptURL, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // success
      setIsSubmitted(true);
      toast({
        title: "Demo Request Submitted!",
        description: "We'll contact you soon to schedule your demo.",
      });
    } catch (error) {
      console.error("Error submitting form to Google Sheets:", error);
      toast({
        title: "Submission Failed",
        description: "There was an issue submitting your request. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = (nextOpen: boolean) => {
    if (!nextOpen) {
      onOpenChange(false);
      setTimeout(reset, 300);
    } else {
      onOpenChange(true);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">
            Request a Demo
          </DialogTitle>
        </DialogHeader>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="email" className="mb-2 block text-base">
                Email Address *
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                className="h-12"
                placeholder="your.email@company.com"
              />
            </div>

            <div>
              <Label htmlFor="brandName" className="mb-2 block text-base">
                Brand Name *
              </Label>
              <Input
                id="brandName"
                value={brandName}
                onChange={(event) => setBrandName(event.target.value)}
                required
                className="h-12"
                placeholder="Your brand or company name"
              />
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="w-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90"
            >
              {isSubmitting ? "Submitting..." : "Submit Request"}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              We'll send you a calendar link to schedule your personalized demo.
            </p>
          </form>
        ) : (
          <div className="py-8 text-center">
            <CheckCircle2 className="mx-auto mb-4 h-16 w-16 text-primary" />
            <h3 className="mb-2 text-xl font-display font-bold">
              Request Received!
            </h3>
            <p className="editorial-text mb-6 text-muted-foreground">
              Check your email for a calendar link to schedule your demo. We
              look forward to showing you how we can transform your branded
              merchandise.
            </p>
            <Button
              onClick={() => handleClose(false)}
              variant="outline"
              className="mx-auto"
            >
              Close
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
