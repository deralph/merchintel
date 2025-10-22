import { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import heroImage from '@/assets/hero-image.jpg';
import merchFlatlay from '@/assets/merch-flatlay.jpg';
import nfcChipDetail from '@/assets/nfc-chip-detail.jpg';
import toteBagStudio from '@/assets/tote-bag-studio.jpg';
import festivalWristband from '@/assets/festival-wristband.jpg';
import rooftopPortrait from '@/assets/rooftop-portrait.jpg';
import dashboardMockup from '@/assets/dashboard-mockup.jpg';
import unboxingShot from '@/assets/unboxing-shot.jpg';
import capsStacked from '@/assets/caps-stacked.jpg';
import bwEditorial from '@/assets/bw-editorial.jpg';

const galleryImages = [
  { src: heroImage, alt: 'Editorial street-style photo of branded merchandise demonstration', tall: true },
  { src: merchFlatlay, alt: 'Flat-lay of premium branded merchandise collection' },
  { src: nfcChipDetail, alt: 'Macro detail of NFC chip embedded in fabric tag' },
  { src: toteBagStudio, alt: 'Studio shot of canvas tote bag with gold logo' },
  { src: festivalWristband, alt: 'Festival attendee using NFC wristband' },
  { src: rooftopPortrait, alt: 'Editorial fashion portrait on urban rooftop', tall: true },
  { src: dashboardMockup, alt: 'InteliMerch analytics dashboard on laptop and phone' },
  { src: unboxingShot, alt: 'Unboxing experience of branded merchandise delivery' },
  { src: capsStacked, alt: 'Premium caps with NFC technology detail' },
  { src: bwEditorial, alt: 'High-contrast editorial portrait in branded hoodie' },
  { src: merchFlatlay, alt: 'Branded merchandise collection on linen background' },
  { src: toteBagStudio, alt: 'Canvas tote product photography' },
];

export const Gallery = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const openLightbox = (index: number) => {
    setSelectedImage(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'unset';
  };

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen]);

  return (
    <section ref={sectionRef} className="py-24 bg-editorial-warm">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-display font-bold text-center mb-16 fade-up">
          Lookbook
        </h2>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className={`fade-up hover-zoom cursor-pointer break-inside-avoid ${
                image.tall ? 'aspect-[3/4]' : 'aspect-square'
              }`}
              onClick={() => openLightbox(index)}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover rounded"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-foreground/95 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-background hover:text-muted transition-colors"
            aria-label="Close lightbox"
          >
            <X className="w-8 h-8" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            className="absolute left-4 text-background hover:text-muted transition-colors text-4xl font-light"
            aria-label="Previous image"
          >
            ←
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            className="absolute right-4 text-background hover:text-muted transition-colors text-4xl font-light"
            aria-label="Next image"
          >
            →
          </button>
          <img
            src={galleryImages[selectedImage].src}
            alt={galleryImages[selectedImage].alt}
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
};
