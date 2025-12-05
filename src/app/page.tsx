"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, Code2, Layers, Workflow } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <main className="pt-16">
        <section className="min-h-[80vh] flex flex-col items-center justify-center px-6">
          <div className="text-center max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="text-text-primary">Master the </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-creational via-structural to-behavioral">
                Gang of Four
              </span>
            </h1>
            <p className="text-xl text-text-secondary mb-8">
              Learn all 23 design patterns through interactive visualizations,
              animated UML diagrams, and hands-on Java code examples.
            </p>
            <Link
              href="/patterns"
              className="inline-flex items-center gap-2 px-8 py-4 bg-structural text-background font-semibold rounded-lg hover:bg-structural/90 transition-colors"
            >
              Start Learning
              <BookOpen className="w-5 h-5" />
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-creational">23</div>
              <div className="text-text-muted">Patterns</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-structural">3</div>
              <div className="text-text-muted">Categories</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-behavioral">100%</div>
              <div className="text-text-muted">Visual</div>
            </div>
          </div>
        </section>

        {/* Categories Preview */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Pattern Categories</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {/* Creational */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="p-6 rounded-xl bg-surface border border-border hover:border-creational/50 transition-colors group"
              >
                <div className="w-12 h-12 rounded-lg bg-creational/10 flex items-center justify-center mb-4">
                  <Layers className="w-6 h-6 text-creational" />
                </div>
                <h3 className="text-xl font-semibold text-creational mb-2">Creational</h3>
                <p className="text-text-secondary mb-4">
                  Patterns for object creation mechanisms, increasing flexibility and reuse.
                </p>
                <div className="text-text-muted text-sm">5 patterns</div>
              </motion.div>

              {/* Structural */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="p-6 rounded-xl bg-surface border border-border hover:border-structural/50 transition-colors group"
              >
                <div className="w-12 h-12 rounded-lg bg-structural/10 flex items-center justify-center mb-4">
                  <Workflow className="w-6 h-6 text-structural" />
                </div>
                <h3 className="text-xl font-semibold text-structural mb-2">Structural</h3>
                <p className="text-text-secondary mb-4">
                  Patterns for composing classes and objects into larger structures.
                </p>
                <div className="text-text-muted text-sm">7 patterns</div>
              </motion.div>

              {/* Behavioral */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="p-6 rounded-xl bg-surface border border-border hover:border-behavioral/50 transition-colors group"
              >
                <div className="w-12 h-12 rounded-lg bg-behavioral/10 flex items-center justify-center mb-4">
                  <Code2 className="w-6 h-6 text-behavioral" />
                </div>
                <h3 className="text-xl font-semibold text-behavioral mb-2">Behavioral</h3>
                <p className="text-text-secondary mb-4">
                  Patterns for communication between objects and responsibility assignment.
                </p>
                <div className="text-text-muted text-sm">11 patterns</div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
