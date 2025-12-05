"use client";

import Link from "next/link";
import { Landmark, Factory, Route, Box, Radio, Layers, Plug, Building2, FolderTree, Shield, Unplug, Blocks, Warehouse, Copy, Minimize2, FileText, ToggleRight, CircleDot, GitPullRequest, ListMusic, Network, Save, ScanEye, Terminal, LucideIcon } from "lucide-react";
import { PatternMetadata } from "@/data/types";
import { cn, getCategoryColor, getCategoryBgColor, getCategoryBorderColor, getDifficultyStars } from "@/lib/utils";

const iconMap: Record<string, LucideIcon> = {
  Landmark, Factory, Route, Box, Radio, Layers, Plug, Building2, FolderTree,
  Shield, Unplug, Blocks, Warehouse, Copy, Minimize2, FileText, ToggleRight,
  CircleDot, GitPullRequest, ListMusic, Network, Save, ScanEye, Terminal,
};

interface PatternCardProps {
  pattern: PatternMetadata;
  index: number;
}

export function PatternCard({ pattern, index }: PatternCardProps) {
  const IconComponent = iconMap[pattern.metaphor.icon] || Box;

  return (
    <Link href={`/patterns/${pattern.slug}`}>
      <div
        className={cn(
          "group relative p-7 rounded-2xl bg-surface border transition-all duration-300",
          "hover:scale-[1.02] hover:shadow-lg cursor-pointer",
          getCategoryBorderColor(pattern.category),
          "hover:border-opacity-100"
        )}
      >
        {/* Rank badge */}
        <div className="absolute top-5 right-5 text-text-muted text-sm font-mono">
          #{pattern.rank}
        </div>

        {/* Icon */}
        <div
          className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center mb-5",
            getCategoryBgColor(pattern.category)
          )}
        >
          <IconComponent className={cn("w-6 h-6", getCategoryColor(pattern.category))} />
        </div>

        {/* Name and category */}
        <h3 className="text-lg font-semibold text-text-primary mb-2 group-hover:text-white">
          {pattern.name}
        </h3>
        <div className={cn("text-sm capitalize mb-4", getCategoryColor(pattern.category))}>
          {pattern.category}
        </div>

        {/* Tagline */}
        <p className="text-text-secondary text-sm mb-5 line-clamp-2 leading-relaxed">
          {pattern.tagline}
        </p>

        {/* Difficulty */}
        <div className="flex items-center justify-between pt-2">
          <span className="text-text-muted text-xs">Difficulty</span>
          <span className={cn("text-sm", getCategoryColor(pattern.category))}>
            {getDifficultyStars(pattern.difficulty)}
          </span>
        </div>
      </div>
    </Link>
  );
}
