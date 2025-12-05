"use client";

import { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, BookOpen, Code2, AlertTriangle, CheckCircle, XCircle, Landmark, Factory, Route, Box, Radio, Layers, Plug, Building2, FolderTree, Shield, Unplug, Blocks, Warehouse, Copy, Minimize2, FileText, ToggleRight, CircleDot, GitPullRequest, ListMusic, Network, Save, ScanEye, Terminal, LucideIcon, GitBranch, ChevronLeft, ChevronRight } from "lucide-react";
import { getPatternBySlug } from "@/data/patterns";
import { cn, getCategoryColor, getCategoryBgColor, getDifficultyStars } from "@/lib/utils";
import { ClassDiagram } from "@/components/visualizations/uml/class-diagram";
import { CodeBlock } from "@/components/code/code-block";
import { Navbar } from "@/components/layout/navbar";
import { patterns } from "@/data/patterns";

const iconMap: Record<string, LucideIcon> = {
  Landmark,
  Factory,
  Route,
  Box,
  Radio,
  Layers,
  Plug,
  Building2,
  FolderTree,
  Shield,
  Unplug,
  Blocks,
  Warehouse,
  Copy,
  Minimize2,
  FileText,
  ToggleRight,
  CircleDot,
  GitPullRequest,
  ListMusic,
  Network,
  Save,
  ScanEye,
  Terminal,
};

interface PatternPageProps {
  params: Promise<{ slug: string }>;
}

export default function PatternPage({ params }: PatternPageProps) {
  const { slug } = use(params);
  const pattern = getPatternBySlug(slug);

  if (!pattern) {
    notFound();
  }

  const IconComponent = iconMap[pattern.metaphor.icon] || Box;

  // Get adjacent patterns for navigation
  const currentIndex = patterns.findIndex((p) => p.slug === slug);
  const prevPattern = currentIndex > 0 ? patterns[currentIndex - 1] : null;
  const nextPattern = currentIndex < patterns.length - 1 ? patterns[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Back link */}
          <Link
            href="/patterns"
            className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
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
                <IconComponent className={cn("w-10 h-10", getCategoryColor(pattern.category))} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className={cn("text-sm font-medium capitalize", getCategoryColor(pattern.category))}>
                    {pattern.category}
                  </span>
                  <span className="text-text-muted">•</span>
                  <span className="text-text-muted text-sm">Pattern #{pattern.rank}</span>
                </div>
                <h1 className="text-4xl font-bold text-text-primary mb-2">
                  {pattern.name}
                </h1>
                <p className="text-xl text-text-secondary mb-4">
                  {pattern.tagline}
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-text-muted text-sm">Difficulty:</span>
                    <span className={cn("text-sm", getCategoryColor(pattern.category))}>
                      {getDifficultyStars(pattern.difficulty)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Metaphor Section */}
          <section className="mb-14 p-8 rounded-2xl bg-surface border border-border">
            <h2 className="text-2xl font-bold text-text-primary mb-5 flex items-center gap-3">
              <BookOpen className="w-6 h-6 text-accent" />
              Real-World Metaphor: {pattern.metaphor.title}
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed">
              {pattern.metaphor.description}
            </p>
          </section>

          {/* Problem & Solution */}
          <section className="mb-14 grid md:grid-cols-2 gap-8">
            <div className="p-7 rounded-2xl bg-surface border border-border">
              <h3 className="text-lg font-semibold text-accent mb-4">The Problem</h3>
              <p className="text-text-secondary leading-relaxed">{pattern.problem}</p>
            </div>
            <div className="p-7 rounded-2xl bg-surface border border-border">
              <h3 className="text-lg font-semibold text-behavioral mb-4">The Solution</h3>
              <p className="text-text-secondary leading-relaxed">{pattern.solution}</p>
            </div>
          </section>

          {/* Intent */}
          <section className="mb-14 p-7 rounded-2xl bg-structural/5 border border-structural/20">
            <h3 className="text-lg font-semibold text-structural mb-3">GoF Intent</h3>
            <p className="text-text-primary italic leading-relaxed">&ldquo;{pattern.intent}&rdquo;</p>
          </section>

          {/* UML Diagram */}
          {pattern.uml.participants.length > 0 && (
            <motion.section
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mb-14"
            >
              <h2 className="text-2xl font-bold text-text-primary mb-6 flex items-center gap-3">
                <GitBranch className="w-6 h-6 text-structural" />
                UML Class Diagram
              </h2>
              <ClassDiagram config={pattern.uml} category={pattern.category} />
              <p className="text-text-muted text-sm mt-4">
                Drag to pan, scroll to zoom. Click and drag nodes to rearrange.
              </p>
            </motion.section>
          )}

          {/* Code Examples */}
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <h2 className="text-2xl font-bold text-text-primary mb-6 flex items-center gap-3">
              <Code2 className="w-6 h-6 text-creational" />
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
          </motion.section>

          {/* When to Use */}
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-14 grid md:grid-cols-2 gap-8"
          >
            <div className="p-7 rounded-2xl bg-surface border border-border">
              <h3 className="text-lg font-semibold text-behavioral mb-5 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Use When
              </h3>
              <ul className="space-y-3">
                {pattern.useWhen.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-text-secondary leading-relaxed">
                    <span className="text-behavioral mt-0.5">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-7 rounded-2xl bg-surface border border-border">
              <h3 className="text-lg font-semibold text-accent mb-5 flex items-center gap-2">
                <XCircle className="w-5 h-5" />
                Don&apos;t Use When
              </h3>
              <ul className="space-y-3">
                {pattern.dontUseWhen.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-text-secondary leading-relaxed">
                    <span className="text-accent mt-0.5">✗</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.section>

          {/* Common Mistakes */}
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-14 p-7 rounded-2xl bg-surface border border-border"
          >
            <h3 className="text-lg font-semibold text-accent mb-5 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Common Mistakes
            </h3>
            <ul className="space-y-3">
              {pattern.commonMistakes.map((mistake, idx) => (
                <li key={idx} className="flex items-start gap-3 text-text-secondary leading-relaxed">
                  <span className="text-accent mt-0.5">⚠</span>
                  {mistake}
                </li>
              ))}
            </ul>
          </motion.section>

          {/* Related Patterns */}
          {pattern.relatedPatterns.length > 0 && (
            <section className="mb-14">
              <h3 className="text-lg font-semibold text-text-primary mb-5">Related Patterns</h3>
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
                  <ChevronLeft className="w-5 h-5 text-text-muted group-hover:text-structural transition-colors" />
                  <div className="text-left">
                    <div className="text-xs text-text-muted">Previous</div>
                    <div className="font-medium text-text-primary group-hover:text-white transition-colors truncate">
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
                  <div className="text-right">
                    <div className="text-xs text-text-muted">Next</div>
                    <div className="font-medium text-text-primary group-hover:text-white transition-colors truncate">
                      {nextPattern.name}
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-text-muted group-hover:text-structural transition-colors" />
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
