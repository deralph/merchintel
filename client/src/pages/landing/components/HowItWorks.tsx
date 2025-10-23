import { useEffect, useRef } from "react";

const steps = [
  {
    number: "01",
    title: "Design & Produce",
    description:
      "We work with your team to design and manufacture high-quality merchandise like shirts, caps, wristbands, tote bags, or any other custom products that reflect your brand identity and campaign goals.",
  },
  {
    number: "02",
    title: "Embed & Program",
    description:
      "Each item is embedded with an invisible NFC chip programmed to launch a custom digital web-based experience when tapped (no apps or QR codes needed).",
  },
  {
    number: "03",
    title: "Launch & Engage",
    description:
      "After distribution, every item becomes a marketing trigger. Taps can unlock discounts, contest entries, loyalty points, early access to new products, or event invites. And because you control the experience behind the tap, you can change it anytime — so your merch keeps pulling your audience back, again and again.",
  },
  {
    number: "04",
    title: "Track & Re-Engage",
    description:
      "View live engagement data in your InteliMerch dashboard which includes tap counts, top-performing cities, conversions, etc. You can also launch new campaigns through the same merch to keep your audience connected and engaged long after the initial drop.",
  },
];

export const HowItWorks = () => {
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
    <section ref={sectionRef} className="bg-background py-24">
      <div className="container mx-auto px-6">
        <h2 className="fade-up text-center text-4xl font-display font-bold md:text-5xl">
          We help you go from design to data in four simple steps.
        </h2>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="fade-up rounded border border-editorial-border bg-card p-8 transition-shadow duration-300 hover:shadow-lg"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="mb-4 text-6xl font-display font-bold text-secondary">{step.number}</div>
              <h3 className="mb-4 text-2xl font-display font-bold">{step.title}</h3>
              <p className="editorial-text leading-relaxed text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
