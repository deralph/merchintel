import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { ArrowUpRight, Sparkles, ShieldCheck, LineChart, MapPin, CircleDot, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const palette = [
  { swatch: "#FFFFFF", label: "Porcelain White" },
  { swatch: "#F6F5F3", label: "Feather Canvas" },
  { swatch: "#0B0B0B", label: "Ink Black" },
  { swatch: "#6B6B6B", label: "Museum Grey" },
  { swatch: "#D94F2F", label: "Terracotta Ember" },
  { swatch: "#C9A66B", label: "Honey Leather" },
  { swatch: "#F2EFEA", label: "Gallery Wash" },
  { swatch: "#E6E2DC", label: "Stone Whisper" },
];

const Landing = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    toast.success("Thanks for reaching out. The Merchly team will reply shortly.");
    setFormData({ name: "", email: "", company: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-[#F6F5F3]">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top,_rgba(201,166,107,0.18),_transparent_55%)]" />
      <div className="relative">
        <header className="sticky top-0 z-30 border-b border-white/10 bg-[#0B0B0B]/90 backdrop-blur-lg">
          <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-[#D94F2F]/20 ring-1 ring-[#D94F2F]/40" />
              <span className="text-xl font-semibold tracking-[0.22em] uppercase">Merchly</span>
            </div>
            <nav className="hidden items-center gap-8 text-sm text-[#E6E2DC]/80 md:flex">
              <a className="hover:text-[#F6F5F3] transition" href="#story">
                Story
              </a>
              <a className="hover:text-[#F6F5F3] transition" href="#flow">
                Tap Flow
              </a>
              <a className="hover:text-[#F6F5F3] transition" href="#palette">
                Palette
              </a>
              <a className="hover:text-[#F6F5F3] transition" href="#contact">
                Contact
              </a>
              <Link to="/client/login" className="hover:text-[#F6F5F3] transition">
                Client portal
              </Link>
              <Link to="/scan/demo?session=preview" className="flex items-center gap-2 text-[#C9A66B] hover:text-[#F6F5F3]">
                Experience demo
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </nav>
          </div>
        </header>

        <main>
          <section className="relative isolate overflow-hidden px-6 pb-24 pt-24 md:pb-32" id="story">
            <div className="mx-auto grid max-w-6xl items-center gap-16 md:grid-cols-2">
              <div className="space-y-8">
                <span className="inline-flex items-center gap-2 rounded-full border border-[#E6E2DC]/30 bg-[#F2EFEA]/10 px-4 py-2 text-xs uppercase tracking-[0.35em] text-[#E6E2DC]/80">
                  <Sparkles className="h-3.5 w-3.5" />
                  Tap-to-market intelligence
                </span>
                <div className="space-y-6">
                  <h1 className="text-5xl md:text-6xl leading-tight">
                    Fashion-grade storytelling, <span className="text-[#C9A66B]">data-grade precision</span>.
                  </h1>
                  <p className="max-w-lg text-base text-[#E6E2DC]/75">
                    Merchly turns every garment into an always-on channel. Pair tactile NFC moments with rich analytics so your brand knows who tapped, where, and why they came back.
                  </p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Link to="/admin">
                    <Button size="lg" className="bg-[#D94F2F] text-[#F6F5F3] hover:bg-[#c24629]">
                      Explore the dashboard
                      <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <a
                    href="#contact"
                    className="inline-flex items-center justify-center rounded-full border border-[#E6E2DC]/30 px-5 py-3 text-sm font-medium text-[#F6F5F3] hover:border-[#F6F5F3]"
                  >
                    Book a private walkthrough
                  </a>
                </div>
                <dl className="grid gap-6 text-sm uppercase tracking-[0.28em] text-[#E6E2DC]/60 sm:grid-cols-3">
                  <div>
                    <dt className="mb-2 text-xs text-[#E6E2DC]/40">Campaign lift</dt>
                    <dd className="text-2xl text-[#F6F5F3]">+41%</dd>
                  </div>
                  <div>
                    <dt className="mb-2 text-xs text-[#E6E2DC]/40">Average rescan rate</dt>
                    <dd className="text-2xl text-[#F6F5F3]">3.2×</dd>
                  </div>
                  <div>
                    <dt className="mb-2 text-xs text-[#E6E2DC]/40">Cities tracked</dt>
                    <dd className="text-2xl text-[#F6F5F3]">46</dd>
                  </div>
                </dl>
              </div>

              <div className="relative">
                <div className="absolute -inset-6 rounded-[3rem] border border-[#C9A66B]/20 bg-gradient-to-br from-[#F2EFEA]/10 via-transparent to-transparent" />
                <div className="relative overflow-hidden rounded-[3rem] border border-[#E6E2DC]/15 bg-[#0B0B0B]/70 p-8 shadow-[0_80px_160px_-80px_rgba(0,0,0,0.6)]">
                  <div className="space-y-6">
                    <div className="rounded-3xl border border-[#E6E2DC]/20 bg-[#F6F5F3]/5 p-6 text-[#E6E2DC]">
                      <div className="flex items-center justify-between text-xs uppercase tracking-[0.4em]">
                        <span>Tap moment</span>
                        <span className="text-[#C9A66B]">Merchly</span>
                      </div>
                      <p className="mt-4 text-lg leading-relaxed text-[#F6F5F3]">
                        “A single tap reactivates the drop, keeps your collectors returning, and keeps our analytics human.”
                      </p>
                    </div>
                    <div className="grid gap-4 text-sm text-[#E6E2DC]/70">
                      <div className="flex items-center gap-3 rounded-2xl border border-[#E6E2DC]/20 bg-[#0B0B0B]/80 px-5 py-4">
                        <ShieldCheck className="h-5 w-5 text-[#D94F2F]" />
                        <div>
                          <p className="text-[#F6F5F3]">One-time sessions</p>
                          <p>Every scan issues a time-boxed token. Refreshes demand a fresh tap—bookmarking can&apos;t bypass it.</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 rounded-2xl border border-[#E6E2DC]/20 bg-[#0B0B0B]/80 px-5 py-4">
                        <LineChart className="h-5 w-5 text-[#C9A66B]" />
                        <div>
                          <p className="text-[#F6F5F3]">Live journey intelligence</p>
                          <p>See where your merch travels, which cities rescan, and how experiences convert.</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 rounded-2xl border border-[#E6E2DC]/20 bg-[#0B0B0B]/80 px-5 py-4">
                        <MapPin className="h-5 w-5 text-[#F2EFEA]" />
                        <div>
                          <p className="text-[#F6F5F3]">Atlas ready</p>
                          <p>Connect to MongoDB Atlas in minutes—Merchly ships with clean env templates and modular services.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="border-y border-white/10 bg-[#0B0B0B]/40 py-20" id="flow">
            <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-3">
              {[
                {
                  icon: CircleDot,
                  title: "Tap",
                  description: "Collectors meet an NFC tag that resolves to a secure Merchly scan URL. Tokens expire within minutes.",
                },
                {
                  icon: ShieldCheck,
                  title: "Verify",
                  description: "Our API activates the session exactly once. Refreshing the browser immediately invalidates the link.",
                },
                {
                  icon: LineChart,
                  title: "Convert",
                  description: "Capture consent, unlock the drop, and push insights to Atlas or your downstream data stack.",
                },
              ].map((step, index) => (
                <Card key={step.title} className="bg-[#0B0B0B]/70 border border-[#E6E2DC]/20 p-8 text-[#E6E2DC]/80">
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full border border-[#E6E2DC]/30 bg-[#F2EFEA]/10 text-[#C9A66B]">
                    <step.icon className="h-6 w-6" />
                  </div>
                  <p className="text-xs uppercase tracking-[0.35em] text-[#E6E2DC]/50">Step 0{index + 1}</p>
                  <h3 className="mt-4 text-2xl text-[#F6F5F3]">{step.title}</h3>
                  <p className="mt-3 leading-relaxed">{step.description}</p>
                </Card>
              ))}
            </div>
          </section>

          <section className="py-20" id="palette">
            <div className="mx-auto max-w-5xl px-6">
              <div className="mb-12 flex flex-wrap items-center justify-between gap-6">
                <div className="space-y-3">
                  <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.4em] text-[#E6E2DC]/50">
                    <Palette className="h-4 w-4" />
                    Palette & finish
                  </p>
                  <h2 className="text-3xl text-[#F6F5F3]">Warm, tactile, editorial.</h2>
                  <p className="max-w-xl text-sm text-[#E6E2DC]/70">
                    Merchly pairs cinematic gradients with handcrafted typography. Headings use an editorial display, while the interface leans on a modern sans to keep data legible.
                  </p>
                </div>
                <div className="rounded-full border border-[#E6E2DC]/30 px-4 py-2 text-xs uppercase tracking-[0.35em] text-[#E6E2DC]/60">
                  #merchly / tap to market
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
                {palette.map((tone) => (
                  <div
                    key={tone.swatch}
                    className="flex flex-col gap-3 rounded-3xl border border-[#E6E2DC]/10 bg-[#0B0B0B]/70 p-6 text-sm text-[#E6E2DC]/70"
                  >
                    <div className="h-16 w-full rounded-2xl" style={{ backgroundColor: tone.swatch }} />
                    <div>
                      <p className="text-[#F6F5F3]">{tone.label}</p>
                      <p className="text-xs uppercase tracking-[0.3em]">{tone.swatch}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="border-t border-white/10 bg-[#0B0B0B]/60 py-24" id="contact">
            <div className="mx-auto grid max-w-5xl gap-16 px-6 md:grid-cols-[1.1fr,1fr]">
              <div className="space-y-6">
                <p className="text-xs uppercase tracking-[0.35em] text-[#E6E2DC]/50">Let&apos;s collaborate</p>
                <h3 className="text-4xl text-[#F6F5F3]">Bring your next capsule drop to life with Merchly.</h3>
                <p className="text-sm text-[#E6E2DC]/70">
                  Share a few details about your brand and the experiences you&apos;d like to craft. We&apos;ll arrange a strategy session to map the tap journey from tag provisioning to loyalty loop.
                </p>
                <div className="rounded-3xl border border-[#E6E2DC]/20 bg-[#0B0B0B]/70 p-6 text-sm text-[#E6E2DC]/80">
                  <p className="text-[#F6F5F3]">MongoDB Atlas ready</p>
                  <p className="mt-2 leading-relaxed">
                    Point Merchly to your Atlas cluster using the provided env template. JWT secrets, Data API keys, and client URLs are all documented.
                  </p>
                </div>
              </div>

              <Card className="border border-[#E6E2DC]/20 bg-[#0B0B0B]/70 p-8 text-[#E6E2DC]/70">
                <form className="space-y-5" onSubmit={handleSubmit}>
                  <div>
                    <label className="mb-2 block text-xs uppercase tracking-[0.3em] text-[#E6E2DC]/60" htmlFor="name">
                      Name
                    </label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(event) => setFormData({ ...formData, name: event.target.value })}
                      required
                      className="bg-[#0B0B0B] border-[#E6E2DC]/30 text-[#F6F5F3] placeholder:text-[#E6E2DC]/40"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-xs uppercase tracking-[0.3em] text-[#E6E2DC]/60" htmlFor="email">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(event) => setFormData({ ...formData, email: event.target.value })}
                      required
                      className="bg-[#0B0B0B] border-[#E6E2DC]/30 text-[#F6F5F3] placeholder:text-[#E6E2DC]/40"
                      placeholder="you@label.com"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-xs uppercase tracking-[0.3em] text-[#E6E2DC]/60" htmlFor="company">
                      House or collective
                    </label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(event) => setFormData({ ...formData, company: event.target.value })}
                      className="bg-[#0B0B0B] border-[#E6E2DC]/30 text-[#F6F5F3] placeholder:text-[#E6E2DC]/40"
                      placeholder="Brand name"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-xs uppercase tracking-[0.3em] text-[#E6E2DC]/60" htmlFor="message">
                      Vision
                    </label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(event) => setFormData({ ...formData, message: event.target.value })}
                      rows={4}
                      className="bg-[#0B0B0B] border-[#E6E2DC]/30 text-[#F6F5F3] placeholder:text-[#E6E2DC]/40"
                      placeholder="Share your idea, launch timeline, or collaborations"
                    />
                  </div>
                  <Button type="submit" className="w-full bg-[#D94F2F] text-[#F6F5F3] hover:bg-[#c24629]">
                    Send request
                  </Button>
                </form>
              </Card>
            </div>
          </section>
        </main>

        <footer className="border-t border-white/10 bg-[#0B0B0B]/90 py-10">
          <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 text-sm text-[#E6E2DC]/60 md:flex-row md:items-center md:justify-between">
            <p>&copy; {new Date().getFullYear()} Merchly. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <Link to="/admin" className="hover:text-[#F6F5F3]">
                Admin
              </Link>
              <Link to="/client/dashboard" className="hover:text-[#F6F5F3]">
                Client Dashboard
              </Link>
              <Link to="/scan/demo?session=preview" className="hover:text-[#F6F5F3]">
                Scan Experience
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Landing;
