"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Filter } from "lucide-react";
import { patterns } from "@/data/patterns";
import { PatternCard } from "@/components/pattern/pattern-card";
import { PatternCategory } from "@/data/types";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/layout/navbar";

type FilterType = "all" | PatternCategory;

export default function PatternsPage() {
  const [filter, setFilter] = useState<FilterType>("all");

  const filteredPatterns = filter === "all"
    ? patterns
    : patterns.filter((p) => p.category === filter);

  const categories: { value: FilterType; label: string; color: string }[] = [
    { value: "all", label: "All", color: "text-text-primary" },
    { value: "creational", label: "Creational", color: "text-creational" },
    { value: "structural", label: "Structural", color: "text-structural" },
    { value: "behavioral", label: "Behavioral", color: "text-behavioral" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Back link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-text-primary mb-4">
              All Design Patterns
            </h1>
            <p className="text-text-secondary text-lg max-w-2xl">
              Master all 23 Gang of Four design patterns. Start with the basics and
              progress through increasingly advanced concepts.
            </p>
          </div>

          {/* Filter */}
          <div className="flex items-center gap-2 mb-8">
            <Filter className="w-5 h-5 text-text-muted" />
            <div className="flex gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setFilter(cat.value)}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all",
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

          {/* Pattern count */}
          <p className="text-text-muted mb-6">
            Showing {filteredPatterns.length} pattern{filteredPatterns.length !== 1 ? "s" : ""}
          </p>

          {/* Pattern Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPatterns.map((pattern, index) => (
              <PatternCard key={pattern.id} pattern={pattern} index={index} />
            ))}
          </div>

          {/* More patterns coming notice */}
          {patterns.length < 23 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-12 p-6 rounded-xl bg-surface border border-border text-center"
            >
              <p className="text-text-secondary">
                More patterns coming soon! Currently showing {patterns.length} of 23 patterns.
              </p>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}
