import { useEffect, useRef } from "react";
import { Award, Package, Repeat, TrendingUp, Zap } from "lucide-react";

const benefits = [
  {
    icon: Package,
    title: "End-to-End Service",
    description:
      "We handle everything from your merchandise design and production to chip embedding, link setup, and analytics.",
  },
  {
    icon: TrendingUp,
    title: "Measurable Impact",
    description: "See where, when, and how people interact with your merch through real-time dashboards.",
  },
  {
    icon: Repeat,
    title: "Post-Drop Campaigns",
    description: "Relaunch challenges, offers, or experiences through the same merch to drive repeat engagement.",
  },
  {
    icon: Zap,
    title: "Frictionless Experience",
    description: "Tap, don\'t scan. NFC feels premium, instant, and delightfully simple.",
  },
  {
    icon: Award,
    title: "Brand Positioning",
    description:
      "Smart merch signals forward-thinking. Using InteliMerch shows your audience and partners that your brand embraces technology, creativity, and next-generation marketing.",
  },
];

export const WhyChooseMerchly = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll(".fade-up");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-editorial-light py-24">
      <div className="container mx-auto px-6">
        <h2 className="fade-up mb-16 text-center text-4xl font-display font-bold md:text-5xl">
          Why Brands Choose InteliMerch
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={benefit.title}
                className="fade-up rounded border border-editorial-border bg-background p-8 transition-colors duration-300 hover:border-primary"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <Icon className="mb-4 h-12 w-12 text-primary" strokeWidth={1.5} />
                <h3 className="mb-3 text-xl font-display font-bold">{benefit.title}</h3>
                <p className="editorial-text text-muted-foreground">{benefit.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
