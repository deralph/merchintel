import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Building2 } from 'lucide-react';

export const ConsultationSection = () => {
  const [formData, setFormData] = useState({
    organizationName: '',
    contactName: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll('.fade-up');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: 'Consultation Request Received!',
      description: "We'll get back to you within 24 hours.",
    });

    setFormData({
      organizationName: '',
      contactName: '',
      email: '',
      message: '',
    });
    setIsSubmitting(false);
  };

  return (
    <section ref={sectionRef} className="py-24 bg-editorial-light">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 fade-up">
            <Building2 className="w-16 h-16 text-primary mx-auto mb-4" strokeWidth={1.5} />
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Schedule a Consultation
            </h2>
            <p className="text-xl text-muted-foreground editorial-text">
              Let's discuss how InteliMerch can transform your branded merchandise into measurable marketing channels.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="fade-up bg-background p-8 md:p-12 rounded-lg border border-editorial-border">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <Label htmlFor="organizationName" className="text-base mb-2 block">
                  Organization Name *
                </Label>
                <Input
                  id="organizationName"
                  value={formData.organizationName}
                  onChange={(e) =>
                    setFormData({ ...formData, organizationName: e.target.value })
                  }
                  required
                  className="h-12"
                  placeholder="Your company or organization"
                />
              </div>
              <div>
                <Label htmlFor="contactName" className="text-base mb-2 block">
                  Contact Name *
                </Label>
                <Input
                  id="contactName"
                  value={formData.contactName}
                  onChange={(e) =>
                    setFormData({ ...formData, contactName: e.target.value })
                  }
                  required
                  className="h-12"
                  placeholder="Your full name"
                />
              </div>
            </div>

            <div className="mb-6">
              <Label htmlFor="email" className="text-base mb-2 block">
                Email Address *
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="h-12"
                placeholder="your.email@company.com"
              />
            </div>

            <div className="mb-6">
              <Label htmlFor="message" className="text-base mb-2 block">
                Tell us about your project
              </Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={5}
                className="resize-none"
                placeholder="Share details about your campaign goals, target audience, and what you'd like to achieve with smart merch..."
              />
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg py-6 h-auto"
            >
              {isSubmitting ? 'Sending...' : 'Request Consultation'}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};
