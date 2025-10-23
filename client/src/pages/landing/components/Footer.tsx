import { Instagram, Linkedin, Mail, Twitter } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-editorial-warm border-t border-editorial-border py-12">
      <div className="container mx-auto px-6">
        <div className="mb-8 grid gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-2xl font-display font-bold">InteliMerch</h3>
            <p className="editorial-text text-sm text-muted-foreground">
              Turn branded merchandise into measurable marketing channels.
            </p>
          </div>

          <div>
            <h4 className="mb-4 font-display font-semibold">Product</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#features" className="text-muted-foreground transition-colors hover:text-primary">
                  Features
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="text-muted-foreground transition-colors hover:text-primary">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#use-cases" className="text-muted-foreground transition-colors hover:text-primary">
                  Use Cases
                </a>
              </li>
              <li>
                <a href="#pricing" className="text-muted-foreground transition-colors hover:text-primary">
                  Pricing
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-display font-semibold">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#about" className="text-muted-foreground transition-colors hover:text-primary">
                  About Us
                </a>
              </li>
              <li>
                <a href="#blog" className="text-muted-foreground transition-colors hover:text-primary">
                  Blog
                </a>
              </li>
              <li>
                <a href="#careers" className="text-muted-foreground transition-colors hover:text-primary">
                  Careers
                </a>
              </li>
              <li>
                <a href="#contact" className="text-muted-foreground transition-colors hover:text-primary">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-display font-semibold">Connect</h4>
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-primary"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-primary"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-primary"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="mailto:hello@intelimerch.com"
                className="text-muted-foreground transition-colors hover:text-primary"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-editorial-border pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} InteliMerch. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
