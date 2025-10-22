import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface DemoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const DemoModal = ({ open, onOpenChange }: DemoModalProps) => {
  const [email, setEmail] = useState('');
  const [brandName, setBrandName] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Save to database
      const { error: dbError } = await supabase
        .from('email_subscriptions')
        .insert([
          {
            email: email,
            brand_name: brandName,
          },
        ]);

      if (dbError) {
        console.error('Database error:', dbError);
        toast({
          title: 'Error',
          description: dbError.message.includes('duplicate')
            ? 'This email is already registered.'
            : 'Failed to submit request. Please try again.',
          variant: 'destructive',
        });
        setIsSubmitting(false);
        return;
      }

      // Send confirmation email
      const { error: emailError } = await supabase.functions.invoke('send-email', {
        body: {
          email: email,
          brandName: brandName,
        },
      });

      if (emailError) {
        console.error('Email error:', emailError);
      }

      setIsSubmitted(true);
      toast({
        title: 'Demo Request Submitted!',
        description: "We'll contact you soon to schedule your demo.",
      });
    } catch (error) {
      console.error('Submission error:', error);
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    }

    setIsSubmitting(false);
  };

  const handleClose = () => {
    onOpenChange(false);
    setTimeout(() => {
      setIsSubmitted(false);
      setEmail('');
      setBrandName('');
    }, 300);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-display">Request a Demo</DialogTitle>
        </DialogHeader>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="email" className="text-base mb-2 block">
                Email Address *
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12"
                placeholder="your.email@company.com"
              />
            </div>

            <div>
              <Label htmlFor="brandName" className="text-base mb-2 block">
                Brand Name *
              </Label>
              <Input
                id="brandName"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                required
                className="h-12"
                placeholder="Your brand or company name"
              />
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Request'}
            </Button>

            <p className="text-sm text-muted-foreground text-center">
              We'll send you a calendar link to schedule your personalized demo.
            </p>
          </form>
        ) : (
          <div className="py-8 text-center">
            <CheckCircle2 className="w-16 h-16 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-display font-bold mb-2">
              Request Received!
            </h3>
            <p className="text-muted-foreground mb-6 editorial-text">
              Check your email for a calendar link to schedule your demo. We look forward to showing you how InteliMerch can transform your branded merchandise.
            </p>
            <Button
              onClick={handleClose}
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
