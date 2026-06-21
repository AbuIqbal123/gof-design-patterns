"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect, useCallback } from "react";
import { m, useReducedMotion } from "framer-motion";
import { ArrowLeft, Filter, Search, CornerDownLeft } from "lucide-react";
import { patterns } from "@/data/patterns";
import { PatternCard } from "@/components/pattern/pattern-card";
import { PatternCategory } from "@/data/types";
import { cn, getCategoryColor } from "@/lib/utils";
import { Navbar } from "@/components/layout/navbar";

type FilterType = "all" | PatternCategory;

const categories: { value: FilterType; label: string; color: string }[] = [
  { value: "all", label: "All", color: "text-text-primary" },
  { value: "creational", label: "Creational", color: "text-creational" },
  { value: "structural", label: "Structural", color: "text-structural" },
  { value: "behavioral", label: "Behavioral", color: "text-behavioral" },
];

export default function PatternsPage() {
  const router = useRouter();
  const [filter, setFilter] = useState<FilterType>("all");
  const [query, setQuery] = useState("");
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [paletteIndex, setPaletteIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion() || false;
  const paletteInputRef = useRef<HTMLInputElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const searchResults =
    query.trim().length > 0
      ? patterns.filter(
          (p) =>
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.tagline.toLowerCase().includes(query.toLowerCase())
        )
      : patterns;

  const filteredPatterns =
    filter === "all"
      ? searchResults
      : searchResults.filter((p) => p.category === filter);

  const openPalette = useCallback(() => {
    setPaletteOpen(true);
    setPaletteIndex(0);
    setTimeout(() => paletteInputRef.current?.focus(), 0);
  }, []);

  const navigateTo = useCallback(
    (slug: string) => {
      setPaletteOpen(false);
      router.push(`/patterns/${slug}`);
    },
    [router]
  );

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        paletteOpen ? setPaletteOpen(false) : openPalette();
      }
      if (e.key === "/" && !paletteOpen && document.activeElement === document.body) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [paletteOpen, openPalette]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Command palette overlay */}
      {paletteOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh]">
          <div
            className="fixed inset-0 bg-background/60 backdrop-blur-sm"
            onClick={() => setPaletteOpen(false)}
          />
          <div className="relative w-full max-w-xl mx-4 bg-surface border border-border rounded-2xl shadow-2xl overflow-hidden">
            <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
              <Search className="w-5 h-5 text-text-muted shrink-0" aria-hidden="true" />
              <input
                ref={paletteInputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setPaletteIndex(0);
                }}
                placeholder="Search patterns..."
                className="flex-1 bg-transparent text-text-primary placeholder:text-text-muted outline-none text-base"
                aria-label="Search patterns by name or description"
                onKeyDown={(e) => {
                  if (e.key === "Escape") {
                    setPaletteOpen(false);
                  } else if (e.key === "ArrowDown") {
                    e.preventDefault();
                    setPaletteIndex((i) =>
                      Math.min(i + 1, Math.min(searchResults.length - 1, 7))
                    );
                  } else if (e.key === "ArrowUp") {
                    e.preventDefault();
                    setPaletteIndex((i) => Math.max(i - 1, 0));
                  } else if (e.key === "Enter") {
                    e.preventDefault();
                    if (searchResults[paletteIndex]) {
                      navigateTo(searchResults[paletteIndex].slug);
                    }
                  }
                }}
              />
              <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 rounded text-xs text-text-muted bg-surface-hover border border-border font-mono">
                esc
              </kbd>
            </div>
            <div className="max-h-80 overflow-y-auto p-2">
              {searchResults.slice(0, 8).map((p, i) => (
                <button
                  key={p.id}
                  onClick={() => navigateTo(p.slug)}
                  className={cn(
                    "w-full flex items-center gap-4 px-4 py-3 rounded-xl text-left transition-colors",
                    i === paletteIndex
                      ? "bg-surface-hover"
                      : "hover:bg-surface-hover"
                  )}
                >
                  <span
                    className={cn(
                      "text-base font-semibold shrink-0",
                      getCategoryColor(p.category)
                    )}
                  >
                    {p.name}
                  </span>
                  <span className="text-text-muted text-sm truncate flex-1">
                    {p.tagline}
                  </span>
                  <span className={cn("text-xs capitalize", getCategoryColor(p.category))}>
                    {p.category}
                  </span>
                  {i === paletteIndex && (
                    <CornerDownLeft className="w-4 h-4 text-text-muted shrink-0" />
                  )}
                </button>
              ))}
              {searchResults.length === 0 && (
                <p className="px-4 py-6 text-text-muted text-center text-sm">
                  No patterns matching &ldquo;{query}&rdquo;
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      <main id="main-content" className="pt-24 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary mb-8"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Back to Home
          </Link>

          <div className="mb-8">
            <h1 className="text-4xl font-bold text-text-primary mb-4 text-wrap balance">
              All Design Patterns
            </h1>
            <p className="text-text-secondary text-lg max-w-2xl">
              Master all 23 Gang of Four design patterns. Start with the basics
              and progress through increasingly advanced concepts.
            </p>
          </div>

          {/* Search + Filter row */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted pointer-events-none" aria-hidden="true" />
              <input
                ref={searchInputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search patterns..."
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-surface border border-border text-text-primary placeholder:text-text-muted outline-none focus:border-structural focus:ring-1 focus:ring-structural/30 transition-colors"
                aria-label="Filter patterns by name or description"
              />
              {!query && (
                <kbd className="absolute right-4 top-1/2 -translate-y-1/2 hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 rounded text-xs text-text-muted bg-surface-hover border border-border font-mono">
                  {typeof navigator !== "undefined" && navigator.platform?.includes("Mac") ? "⌘" : "Ctrl"}K
                </kbd>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-text-muted" aria-hidden="true" />
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => setFilter(cat.value)}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                    filter === cat.value
                      ? `${cat.color} bg-surface border border-border`
                      : "text-text-muted hover:text-text-secondary"
                  )}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <p className="text-text-muted mb-6" aria-live="polite">
            Showing {filteredPatterns.length} pattern
            {filteredPatterns.length !== 1 ? "s" : ""}
            {query && (
              <>
                {" "}matching &ldquo;{query}&rdquo;
              </>
            )}
          </p>

          {filteredPatterns.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPatterns.map((pattern, index) => (
                <PatternCard key={pattern.id} pattern={pattern} index={index} />
              ))}
            </div>
          ) : (
            <div className="py-16 text-center">
              <p className="text-text-secondary text-lg mb-4">
                No patterns matching &ldquo;{query}&rdquo;
              </p>
              <button
                type="button"
                onClick={() => { setQuery(""); setFilter("all"); }}
                className="text-structural hover:text-structural/80 font-medium transition-colors"
              >
                Clear search and browse all patterns
              </button>
            </div>
          )}

          {patterns.length < 23 && (
            <m.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={shouldReduceMotion ? { delay: 0 } : { delay: 0.5 }}
              className="mt-12 p-6 rounded-xl bg-surface border border-border text-center"
            >
              <p className="text-text-secondary">
                More patterns coming soon! Currently showing {patterns.length} of 23 patterns.
              </p>
            </m.div>
          )}
        </div>
      </main>
    </div>
  );
}
