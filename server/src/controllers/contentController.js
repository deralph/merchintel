import store from "../services/dataStore.js";

export const getLandingContent = async (_req, res) => {
  const [tagCount, scanCount, recentEvents] = await Promise.all([
    store.countTags(),
    store.countEvents(),
    store.getRecentEvents(3),
  ]);

  res.json({
    hero: {
      kicker: "Trace every touchpoint",
      headline: "Turn physical merch into always-on marketing loops",
      subheading:
        "Tap-to-experience microsites help you understand who is interacting with your garments and when. NFC-powered journeys mean you never miss a moment of engagement.",
      primaryCta: { label: "Book a strategy session", href: "#contact" },
      secondaryCta: { label: "See how it works", href: "#how-it-works" },
    },
    metrics: [
      { label: "Tracked garments", value: tagCount },
      { label: "Verified interactions", value: scanCount },
      { label: "Avg. rescan interval", value: "< 12 hrs" },
    ],
    features: [
      {
        title: "One-tap consumer journeys",
        description:
          "Deliver gated stories, drops, and care instructions that only unlock when customers tap the embedded NFC chip.",
      },
      {
        title: "Real-time identity graph",
        description:
          "See where merch travels, how often it is tapped, and which campaigns convert with minute-by-minute telemetry.",
      },
      {
        title: "Automated loyalty capture",
        description:
          "Capture opt-in emails and preferences directly from the scan flow to power remarketing and loyalty programs.",
      },
    ],
    timeline: [
      {
        title: "Tag production",
        description: "Assign NFC chips or QR twins to every SKU straight from the dashboard.",
      },
      {
        title: "NFC scan",
        description: "Fans tap the garment and receive a one-time link that expires after first load.",
      },
      {
        title: "Insight loop",
        description: "Engagement, consent, and conversion data syncs back instantly to your CRM stack.",
      },
    ],
    testimonials: recentEvents.map((event) => ({
      quote: event.email
        ? `${event.email} just tapped their merch from ${new Date(event.createdAt).toLocaleDateString()}`
        : "New anonymous tap captured.",
      author: event.email ?? "Anonymous fan",
    })),
    cta: {
      headline: "Ready to launch your next tap-to-market experience?",
      subheading:
        "We'll help you storyboard the flow, provision the tags, and capture the data that matters.",
      primaryCta: { label: "Schedule onboarding", href: "#contact" },
    },
  });
};
