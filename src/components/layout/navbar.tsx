"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/patterns", label: "All Patterns" },
  { href: "/journey", label: "Learning Path" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!isMenuOpen) return;
    firstLinkRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          <span className="text-text-primary">GoF</span>
          <span className="text-structural"> Patterns</span>
        </Link>

        {/* Desktop navigation */}
        <ul className="hidden md:flex gap-6">
          {navItems.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={cn(
                  "transition-colors",
                  isActive(href)
                    ? "text-text-primary font-medium"
                    : "text-text-secondary hover:text-text-primary"
                )}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile menu button */}
        <button
          ref={toggleRef}
          className="md:hidden p-2 text-text-secondary hover:text-text-primary"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          type="button"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
        </button>
      </div>

      {/* Mobile menu dropdown */}
      {isMenuOpen && (
        <ul className="md:hidden border-b border-border bg-surface">
          {navItems.map(({ href, label }, i) => (
            <li key={href}>
              <Link
                href={href}
                ref={i === 0 ? firstLinkRef : undefined}
                className={cn(
                  "block px-6 py-4 transition-colors",
                  isActive(href)
                    ? "text-text-primary font-medium bg-surface-hover"
                    : "text-text-secondary hover:text-text-primary hover:bg-surface-hover"
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
