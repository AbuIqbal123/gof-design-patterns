"use client";

import { use, useEffect, useState, useRef } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { m, useReducedMotion } from "framer-motion";
import { ArrowLeft, BookOpen, Code2, AlertTriangle, CheckCircle, XCircle, Box, GitBranch, ChevronLeft, ChevronRight, List } from "lucide-react";
import { getPatternBySlug } from "@/data/patterns";
import { cn, getCategoryColor, getCategoryBgColor, getDifficultyStars } from "@/lib/utils";
import { ICON_MAP } from "@/lib/icons";
import { ClassDiagram } from "@/components/visualizations/uml/class-diagram";
import { CodeBlock } from "@/components/code/code-block";
import { Navbar } from "@/components/layout/navbar";
import { patterns } from "@/data/patterns";
import { useMarkVisited } from "@/stores/progress";

interface PatternPageProps {
  params: Promise<{ slug: string }>;
}

const SECTIONS = [
  { id: "metaphor", label: "Metaphor" },
  { id: "problem-solution", label: "Problem & Solution" },
  { id: "intent", label: "GoF Intent" },
  { id: "uml", label: "UML Diagram" },
  { id: "code", label: "Code" },
  { id: "usage", label: "Usage Guidance" },
  { id: "mistakes", label: "Common Mistakes" },
  { id: "related", label: "Related Patterns" },
];

export default function PatternPage({ params }: PatternPageProps) {
  const { slug } = use(params);
  const pattern = getPatternBySlug(slug);
  const shouldReduceMotion = useReducedMotion() || false;
  const markVisited = useMarkVisited();

  if (!pattern) {
    notFound();
  }

  useEffect(() => {
    markVisited(slug);
    window.scrollTo(0, 0);
  }, [slug, markVisited]);

  const IconComponent = ICON_MAP[pattern.metaphor.icon] || Box;

  const currentIndex = patterns.findIndex((p) => p.slug === slug);
  const prevPattern = currentIndex > 0 ? patterns[currentIndex - 1] : null;
  const nextPattern = currentIndex < patterns.length - 1 ? patterns[currentIndex + 1] : null;

  const [activeSection, setActiveSection] = useState("");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const visibleSections = new Map<string, boolean>();
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visibleSections.set(entry.target.id, entry.isIntersecting);
        });
        const first = SECTIONS.find((s) => visibleSections.get(s.id));
        if (first) setActiveSection(first.id);
      },
      { rootMargin: "-120px 0px -70% 0px" }
    );

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, [slug]);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main id="main-content" className="pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto relative">
          {/* Desktop TOC */}
          <nav
            className="hidden lg:block fixed top-28 right-[max(24px,calc((100vw-56rem)/2-220px))] w-48"
            aria-label="Page sections"
          >
            <div className="sticky top-28">
              <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">
                On this page
              </h4>
              <ul className="space-y-0.5">
                {SECTIONS.map(({ id, label }) => {
                  const isActive = activeSection === id;
                  return (
                    <li key={id}>
                      <button
                        type="button"
                        onClick={() => scrollToSection(id)}
                        className={cn(
                          "block w-full text-left text-sm py-1.5 pl-3 border-l-2 transition-colors",
                          isActive
                            ? "border-structural text-text-primary font-medium"
                            : "border-transparent text-text-muted hover:text-text-secondary hover:border-border"
                        )}
                      >
                        {label}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </nav>

          {/* Mobile section jump */}
          <div className="lg:hidden mb-6">
            <label htmlFor="section-jump" className="sr-only">Jump to section</label>
            <div className="relative">
              <List className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" aria-hidden="true" />
              <select
                id="section-jump"
                value={activeSection}
                onChange={(e) => scrollToSection(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface border border-border text-text-primary text-sm appearance-none cursor-pointer focus:border-structural focus:ring-1 focus:ring-structural/30 transition-colors"
              >
                <option value="">Jump to section...</option>
                {SECTIONS.map(({ id, label }) => (
                  <option key={id} value={id}>{label}</option>
                ))}
              </select>
            </div>
          </div>

          <Link
            href="/patterns"
            className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary mb-8"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            All Patterns
          </Link>

          {/* Hero Header */}
          <section className="mb-12">
            <div className="flex items-start gap-6">
              <div
                className={cn(
                  "w-20 h-20 rounded-2xl flex items-center justify-center",
                  getCategoryBgColor(pattern.category)
                )}
              >
                <IconComponent className={cn("w-10 h-10", getCategoryColor(pattern.category))} aria-hidden="true" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className={cn("text-sm font-medium capitalize", getCategoryColor(pattern.category))}>
                    {pattern.category}
                  </span>
                  <span className="text-text-muted">•</span>
                  <span className="text-text-muted text-sm">Pattern #{pattern.rank}</span>
                </div>
                <h1 className="text-4xl font-bold text-text-primary mb-2 text-wrap balance">
                  {pattern.name}
                </h1>
                <p className="text-xl text-text-secondary mb-4">
                  {pattern.tagline}
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-text-muted text-sm">Difficulty:</span>
                    <span className={cn("text-sm", getCategoryColor(pattern.category))} aria-label={`Difficulty: ${pattern.difficulty} out of 5`}>
                      {getDifficultyStars(pattern.difficulty)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Metaphor Section */}
          <section id="metaphor" className="mb-14 p-8 rounded-2xl bg-surface border border-border">
            <h2 className="text-2xl font-bold text-text-primary mb-5 flex items-center gap-3 text-wrap balance">
              <BookOpen className="w-6 h-6 text-accent shrink-0" aria-hidden="true" />
              Real-World Metaphor: {pattern.metaphor.title}
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed">
              {pattern.metaphor.description}
            </p>
          </section>

          {/* Problem & Solution */}
          <section id="problem-solution" className="mb-14 grid md:grid-cols-2 gap-8">
            <div className="p-7 rounded-2xl bg-surface border border-border">
              <h2 className="text-lg font-semibold text-accent mb-4">The Problem</h2>
              <p className="text-text-secondary leading-relaxed">{pattern.problem}</p>
            </div>
            <div className="p-7 rounded-2xl bg-surface border border-border">
              <h2 className="text-lg font-semibold text-behavioral mb-4">The Solution</h2>
              <p className="text-text-secondary leading-relaxed">{pattern.solution}</p>
            </div>
          </section>

          {/* Intent */}
          <section id="intent" className="mb-14 p-7 rounded-2xl bg-structural/5 border border-structural/20">
            <h2 className="text-lg font-semibold text-structural mb-3">GoF Intent</h2>
            <p className="text-text-primary italic leading-relaxed">&ldquo;{pattern.intent}&rdquo;</p>
          </section>

          {/* UML Diagram */}
          {pattern.uml.participants.length > 0 && (
            <m.section
              id="uml"
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1 }}
              viewport={{ once: true }}
              className="mb-14"
            >
              <h2 className="text-2xl font-bold text-text-primary mb-6 flex items-center gap-3 text-wrap balance">
                <GitBranch className="w-6 h-6 text-structural shrink-0" aria-hidden="true" />
                UML Class Diagram
              </h2>
              <ClassDiagram config={pattern.uml} category={pattern.category} />
              <p className="text-text-muted text-sm mt-4">
                Drag to pan, scroll to zoom. Click and drag nodes to rearrange.
              </p>
            </m.section>
          )}

          {/* Code Examples */}
          <m.section
            id="code"
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <h2 className="text-2xl font-bold text-text-primary mb-6 flex items-center gap-3 text-wrap balance">
              <Code2 className="w-6 h-6 text-creational shrink-0" aria-hidden="true" />
              Java Implementation
            </h2>
            {pattern.codeExamples.map((example, idx) => (
              <div key={example.id} className={cn("rounded-2xl overflow-hidden", idx > 0 && "mt-8")}>
                <div className="bg-surface border border-border border-b-0 px-5 py-4 rounded-t-2xl">
                  <h4 className="font-semibold text-text-primary">{example.title}</h4>
                  <p className="text-text-muted text-sm mt-1">{example.description}</p>
                </div>
                <div className="border border-border border-t-0 rounded-b-2xl overflow-hidden">
                  <CodeBlock code={example.code} language="java" />
                </div>
              </div>
            ))}
          </m.section>

          {/* When to Use */}
          <m.section
            id="usage"
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1 }}
            viewport={{ once: true }}
            className="mb-14 grid md:grid-cols-2 gap-8"
          >
            <div className="p-7 rounded-2xl bg-surface border border-border">
              <h2 className="text-lg font-semibold text-behavioral mb-5 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" aria-hidden="true" />
                Use When
              </h2>
              <ul className="space-y-3">
                {pattern.useWhen.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-text-secondary leading-relaxed">
                    <span className="text-behavioral mt-0.5 shrink-0" aria-hidden="true">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-7 rounded-2xl bg-surface border border-border">
              <h2 className="text-lg font-semibold text-accent mb-5 flex items-center gap-2">
                <XCircle className="w-5 h-5" aria-hidden="true" />
                Don&apos;t Use When
              </h2>
              <ul className="space-y-3">
                {pattern.dontUseWhen.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-text-secondary leading-relaxed">
                    <span className="text-accent mt-0.5 shrink-0" aria-hidden="true">✗</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </m.section>

          {/* Common Mistakes */}
          <m.section
            id="mistakes"
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1 }}
            viewport={{ once: true }}
            className="mb-14 p-7 rounded-2xl bg-surface border border-border"
          >
            <h2 className="text-lg font-semibold text-accent mb-5 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" aria-hidden="true" />
              Common Mistakes
            </h2>
            <ul className="space-y-3">
              {pattern.commonMistakes.map((mistake) => (
                <li key={mistake} className="flex items-start gap-3 text-text-secondary leading-relaxed">
                  <span className="text-accent mt-0.5 shrink-0" aria-hidden="true">⚠</span>
                  {mistake}
                </li>
              ))}
            </ul>
          </m.section>

          {/* Related Patterns */}
          {pattern.relatedPatterns.length > 0 && (
            <section id="related" className="mb-14">
              <h2 className="text-lg font-semibold text-text-primary mb-5">Related Patterns</h2>
              <div className="flex flex-wrap gap-3">
                {pattern.relatedPatterns.map((related) => (
                  <Link
                    key={related}
                    href={`/patterns/${related}`}
                    className="px-5 py-2.5 rounded-xl bg-surface border border-border text-text-secondary hover:text-text-primary hover:border-structural transition-colors"
                  >
                    {related.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Next/Previous Pattern Navigation */}
          <section className="pt-8 border-t border-border">
            <div className="flex justify-between items-center">
              {prevPattern ? (
                <Link
                  href={`/patterns/${prevPattern.slug}`}
                  className="group flex items-center gap-3 p-4 rounded-xl bg-surface border border-border hover:border-structural/50 transition-colors max-w-[45%]"
                >
                  <ChevronLeft className="w-5 h-5 text-text-muted group-hover:text-structural transition-colors shrink-0" aria-hidden="true" />
                  <div className="text-left min-w-0">
                    <div className="text-xs text-text-muted">Previous</div>
                    <div className="font-medium text-text-primary transition-colors truncate">
                      {prevPattern.name}
                    </div>
                  </div>
                </Link>
              ) : (
                <div />
              )}

              {nextPattern ? (
                <Link
                  href={`/patterns/${nextPattern.slug}`}
                  className="group flex items-center gap-3 p-4 rounded-xl bg-surface border border-border hover:border-structural/50 transition-colors max-w-[45%]"
                >
                  <div className="text-right min-w-0">
                    <div className="text-xs text-text-muted">Next</div>
                    <div className="font-medium text-text-primary transition-colors truncate">
                      {nextPattern.name}
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-text-muted group-hover:text-structural transition-colors shrink-0" aria-hidden="true" />
                </Link>
              ) : (
                <div />
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
