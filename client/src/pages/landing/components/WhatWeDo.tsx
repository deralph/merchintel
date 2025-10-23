import { useEffect, useRef } from "react";
import merchFlatlay from "@mechhome-assets/merch-flatlay.jpg";
import nfcChipDetail from "@mechhome-assets/nfc-chip-detail.jpg";
import toteBagStudio from "@mechhome-assets/tote-bag-studio.jpg";
import festivalWristband from "@mechhome-assets/festival-wristband.jpg";

export const WhatWeDo = () => {
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
    <section ref={sectionRef} className="bg-editorial-warm py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 sm:gap-12 lg:gap-16 md:grid-cols-2">
          <div className="fade-up grid grid-cols-2 gap-4">
            <div className="hover-zoom overflow-hidden rounded">
              <img
                src={merchFlatlay}
                alt="Flat-lay of premium branded merchandise including folded tee, cap, tote bag, and wristband on linen background"
                className="aspect-square h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="hover-zoom overflow-hidden rounded">
              <img
                src={nfcChipDetail}
                alt="Extreme close-up of NFC chip embedded in woven fabric tag showing tactile detail"
                className="aspect-square h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="hover-zoom overflow-hidden rounded">
              <img
                src={toteBagStudio}
                alt="Studio product shot of canvas tote bag with gold logo embossing"
                className="aspect-square h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="hover-zoom overflow-hidden rounded">
              <img
                src={festivalWristband}
                alt="Festival attendee tapping smartphone to NFC wristband with colorful crowd in background"
                className="aspect-square h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>

          <div className="fade-up">
            <h2 className="text-4xl font-display font-bold md:text-5xl">
              We Turn Branded Merchandise Into Measurable Marketing Channels
            </h2>
            <div className="editorial-text mt-6 space-y-4 text-lg text-muted-foreground">
              <p>Every brand gives out merch.<br />Only a few know what happens after.</p>
              <p>InteliMerch turns branded merchandise into living engagement channels.</p>
              <p>
                Each shirt, wristband, cap, or tote bag is embedded with NFC tech that tracks your audience&apos;s real-world
                interactions with your campaign and helps you stay connected to them over time.
              </p>
              <p>
                After the drop, you can launch new campaigns through the same merch, update offers, share new releases, or re-engage
                your audience with a single tap.
              </p>
              <p className="font-medium text-foreground">It&apos;s not just merch. It&apos;s a marketing loop that never ends.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
