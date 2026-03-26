import { Link } from "react-router-dom";
import { GraduationCap, Phone, Mail, MapPin, Facebook, Twitter, Youtube, Instagram } from "lucide-react";
import { getPublicContent } from "@/lib/erpStore";

export default function Footer() {
  const c = getPublicContent();

  return (
    <footer className="gradient-hero text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* School Info */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gold rounded-full flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-gold-foreground" />
              </div>
              <div>
                <div className="font-bold text-lg leading-tight">Bright Future</div>
                <div className="text-xs text-white/70 leading-tight">Senior Secondary School</div>
              </div>
            </div>
            <p className="text-sm text-white/70 leading-relaxed mb-1">
              Nurturing minds, building futures. Committed to excellence in education since {c.established}.
            </p>
            <p className="text-xs text-white/50 mb-4">Affiliated: {c.affiliation}</p>
            {/* Social Media Links */}
            <div className="flex gap-2 mt-2 flex-wrap">
              <a href={c.facebookUrl} target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-blue-600/60 transition-colors" title="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href={c.twitterUrl} target="_blank" rel="noopener noreferrer" aria-label="Twitter/X"
                className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-sky-500/60 transition-colors" title="Twitter / X">
                <Twitter className="w-4 h-4" />
              </a>
              <a href={c.youtubeUrl} target="_blank" rel="noopener noreferrer" aria-label="YouTube"
                className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-red-600/60 transition-colors" title="YouTube">
                <Youtube className="w-4 h-4" />
              </a>
              <a href={c.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-pink-600/60 transition-colors" title="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-white/70">
              {[
                { label: "Home", href: "/" },
                { label: "About Us", href: "/about" },
                { label: "Academics", href: "/academics" },
                { label: "Admissions", href: "/admissions" },
                { label: "Gallery", href: "/gallery" },
                { label: "Contact Us", href: "/contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ERP Portal */}
          <div>
            <h3 className="font-semibold text-gold mb-4">ERP Portal</h3>
            <ul className="space-y-2 text-sm text-white/70">
              {[
                { label: "Student Login", href: "/login" },
                { label: "Teacher Login", href: "/login" },
                { label: "Admin Login", href: "/login" },
                { label: "Developer Login", href: "/login" },
                { label: "Fee Payment", href: "/login" },
                { label: "Results & Report Card", href: "/login" },
              ].map((item) => (
                <li key={item.label}>
                  <Link to={item.href} className="hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-gold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm text-white/70">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-gold" />
                <span>{c.footerAddress}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 shrink-0 text-gold" />
                <a href={`tel:${c.footerPhone.replace(/\s/g, "")}`} className="hover:text-white transition-colors">
                  {c.footerPhone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 shrink-0 text-gold" />
                <a href={`mailto:${c.footerEmail}`} className="hover:text-white transition-colors">
                  {c.footerEmail}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-white/50">
          <span>© {new Date().getFullYear()} {c.schoolName}. All rights reserved.</span>
          <span>
            Designed with ❤️ for Education — Dev by{" "}
            <a href="/erp/dev/profile" className="text-gold hover:underline">Dev Team</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
