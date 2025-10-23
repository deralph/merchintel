import { useEffect, useRef } from "react";
import rooftopPortrait from "@/assets/rooftop-portrait.jpg";
import capsStacked from "@/assets/caps-stacked.jpg";
import bwEditorial from "@/assets/bw-editorial.jpg";

const useCases = [
  {
    title: "Artists & Creators",
    description:
      "Transform fan merch into an always-on engagement tool. Fans can tap to join exclusive challenges, access unreleased content, or participate in post-concert campaigns that keep the hype alive long after the show.",
    image: rooftopPortrait,
    alt: "Editorial portrait of model wearing branded merch at dusk on urban rooftop",
  },
  {
    title: "Startups & Fintechs",
    description:
      "Turn your brand giveaways into measurable growth drivers. Track where your merch travels, measure engagement by city, and re-activate audiences with tap-to-join referral contests, cashback promos, or limited-time rewards.",
    image: capsStacked,
    alt: "Premium baseball caps with visible NFC tags in artistic composition",
  },
  {
    title: "Events & Festivals",
    description:
      "Upgrade event merch and wristbands into live engagement hubs. Attendees can tap to enter daily contests, unlock stage schedules, or receive sponsor offers while organizers see which cities or zones engage most.",
    image: bwEditorial,
    alt: "High-contrast black and white editorial photo emphasizing fabric texture",
  },
  {
    title: "Fashion & Lifestyle Brands",
    description:
      "Add digital depth to your apparel. Embed stories, care info, or new collection previews inside each piece and keep customers re-engaging with post-purchase campaigns like tap-to-earn loyalty programs.",
    image: rooftopPortrait,
    alt: "Fashion model in branded apparel with city backdrop",
  },
  {
    title: "Marketing Agencies",
    description:
      "Deliver data your clients can actually see. Run smarter campaigns with physical performance metrics — tap counts, engagement heatmaps, conversions — and prove ROI for every activation.",
    image: capsStacked,
    alt: "Detailed product shot of branded merchandise",
  },
];

export const UseCases = () => {
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
        <h2 className="fade-up mb-16 text-center text-4xl font-display font-bold md:text-5xl">Use Cases</h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {useCases.map((useCase, index) => (
            <div
              key={useCase.title}
              className="fade-up group cursor-pointer"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="hover-zoom mb-4 aspect-[4/5] overflow-hidden rounded">
                <img src={useCase.image} alt={useCase.alt} className="h-full w-full object-cover" loading="lazy" />
              </div>
              <h3 className="text-xl font-display font-bold transition-colors group-hover:text-primary">
                {useCase.title}
              </h3>
              <p className="editorial-text text-muted-foreground">{useCase.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
