import { useEffect, useRef } from 'react';
import merchFlatlay from '@/assets/merch-flatlay.jpg';
import nfcChipDetail from '@/assets/nfc-chip-detail.jpg';
import toteBagStudio from '@/assets/tote-bag-studio.jpg';
import festivalWristband from '@/assets/festival-wristband.jpg';

export const WhatWeDo = () => {
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

  return (
    <section ref={sectionRef} className="py-12 sm:py-16 md:py-20 lg:py-24 bg-editorial-warm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          <div className="grid grid-cols-2 gap-4 fade-up">
            <div className="hover-zoom rounded overflow-hidden">
              <img
                src={merchFlatlay}
                alt="Flat-lay of premium branded merchandise including folded tee, cap, tote bag, and wristband on linen background"
                className="w-full h-full object-cover aspect-square"
                loading="lazy"
              />
            </div>
            <div className="hover-zoom rounded overflow-hidden">
              <img
                src={nfcChipDetail}
                alt="Extreme close-up of NFC chip embedded in woven fabric tag showing tactile detail"
                className="w-full h-full object-cover aspect-square"
                loading="lazy"
              />
            </div>
            <div className="hover-zoom rounded overflow-hidden">
              <img
                src={toteBagStudio}
                alt="Studio product shot of canvas tote bag with gold logo embossing"
                className="w-full h-full object-cover aspect-square"
                loading="lazy"
              />
            </div>
            <div className="hover-zoom rounded overflow-hidden">
              <img
                src={festivalWristband}
                alt="Festival attendee tapping smartphone to NFC wristband with colorful crowd in background"
                className="w-full h-full object-cover aspect-square"
                loading="lazy"
              />
            </div>
          </div>

          <div className="fade-up">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              We Turn Branded Merchandise Into Measurable Marketing Channels
            </h2>
            <div className="space-y-4 text-lg editorial-text text-muted-foreground">
              <p>Every brand gives out merch.<br />Only a few know what happens after.</p>
              <p>
                InteliMerch turns branded merchandise into living engagement channels.
              </p>
              <p>
                Each shirt, wristband, cap, or tote bag is embedded with NFC tech that tracks your audience's real-world interactions with your campaign and helps you stay connected to them over time.
              </p>
              <p>
                After the drop, you can launch new campaigns through the same merch, update offers, share new releases, or re-engage your audience with a single tap.
              </p>
              <p className="font-medium text-foreground">
                It's not just merch. It's a marketing loop that never ends.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
