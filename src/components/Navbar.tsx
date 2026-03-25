import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, GraduationCap } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Academics", href: "/academics" },
  { label: "Admissions", href: "/admissions" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 bg-card shadow-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 gradient-primary rounded-full flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <div className="font-bold text-primary text-lg leading-tight">Bright Future</div>
              <div className="text-xs text-muted-foreground leading-tight">Senior Secondary School</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === link.href
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/login"
              className="ml-3 px-4 py-2 rounded-md text-sm font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
            >
              ERP Login
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-md text-foreground hover:bg-accent"
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-card border-t border-border px-4 pb-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => setOpen(false)}
              className={`block px-3 py-2 rounded-md text-sm font-medium mt-1 transition-colors ${
                location.pathname === link.href
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground hover:bg-accent"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/login"
            onClick={() => setOpen(false)}
            className="block mt-2 px-3 py-2 rounded-md text-sm font-semibold bg-primary text-primary-foreground text-center"
          >
            ERP Login
          </Link>
        </div>
      )}
    </nav>
  );
}
