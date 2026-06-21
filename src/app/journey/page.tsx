"use client";

import Link from "next/link";
import { m, useReducedMotion } from "framer-motion";
import { ArrowLeft, Map } from "lucide-react";
import { patterns } from "@/data/patterns";
import { cn, getCategoryColor, getCategoryBgColor } from "@/lib/utils";
import { Navbar } from "@/components/layout/navbar";

export default function JourneyPage() {
  const shouldReduceMotion = useReducedMotion() || false;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main id="main-content" className="pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Back link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary mb-8"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Back to Home
          </Link>

          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-text-primary mb-4 flex items-center gap-4">
              <Map className="w-10 h-10 text-structural" aria-hidden="true" />
              Learning Journey
            </h1>
            <p className="text-text-secondary text-lg">
              Follow this optimized path to master all 23 design patterns.
              Patterns are ordered by difficulty and conceptual dependencies.
            </p>
          </div>

          {/* Journey Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-creational via-structural to-behavioral" />

            {/* Pattern nodes */}
            {patterns.map((pattern, index) => (
              <m.div
                key={pattern.id}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
                whileInView={shouldReduceMotion ? undefined : { opacity: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={shouldReduceMotion ? undefined : { duration: 0.3 }}
                className="relative pl-16 pb-12 last:pb-0"
              >
                {/* Node circle */}
                <div
                  className={cn(
                    "absolute left-3 w-7 h-7 rounded-full border-4 border-background",
                    getCategoryBgColor(pattern.category),
                    "flex items-center justify-center"
                  )}
                >
                  <span className={cn("text-xs font-bold", getCategoryColor(pattern.category))}>
                    {pattern.rank}
                  </span>
                </div>

                {/* Content card */}
                <Link href={`/patterns/${pattern.slug}`}>
                  <div className="p-4 rounded-xl bg-surface border border-border hover:border-structural/50 transition-colors group">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-text-primary group-hover:text-text-primary">
                        {pattern.name}
                      </h3>
                      <span className={cn("text-xs capitalize px-2 py-1 rounded", getCategoryBgColor(pattern.category), getCategoryColor(pattern.category))}>
                        {pattern.category}
                      </span>
                    </div>
                    <p className="text-text-secondary text-sm">{pattern.tagline}</p>
                  </div>
                </Link>
              </m.div>
            ))}

            {/* More patterns coming */}
            {patterns.length < 23 && (
              <div className="relative pl-16">
                <div className="absolute left-3 w-7 h-7 rounded-full border-4 border-background bg-surface flex items-center justify-center">
                  <span className="text-text-muted text-xs">...</span>
                </div>
                <div className="p-4 rounded-xl border border-dashed border-border">
                  <p className="text-text-muted text-sm">
                    {23 - patterns.length} more patterns coming soon
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
