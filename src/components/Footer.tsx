import { Link } from "react-router-dom";
import { GraduationCap, Phone, Mail, MapPin, Facebook, Twitter, Youtube } from "lucide-react";

export default function Footer() {
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
            <p className="text-sm text-white/70 leading-relaxed">
              Nurturing minds, building futures. Committed to excellence in education since 1995.
            </p>
            <div className="flex gap-3 mt-4">
              <a href="#" className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                <Youtube className="w-4 h-4" />
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
                "Student Login",
                "Teacher Login",
                "Admin Login",
                "Developer Login",
                "Fee Payment",
                "Results",
              ].map((item) => (
                <li key={item}>
                  <Link to="/login" className="hover:text-white transition-colors">
                    {item}
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
                <span>123 School Road, Education Nagar, New Delhi - 110001</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 shrink-0 text-gold" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 shrink-0 text-gold" />
                <span>info@brightfuture.edu.in</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-white/50">
          <span>© 2024 Bright Future Senior Secondary School. All rights reserved.</span>
          <span>Designed with ❤️ for Education</span>
        </div>
      </div>
    </footer>
  );
}
