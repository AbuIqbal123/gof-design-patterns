"use client";

import Link from "next/link";
import { Box, Check } from "lucide-react";
import { PatternMetadata } from "@/data/types";
import { cn, getCategoryColor, getCategoryBgColor, getCategoryBorderColor, getCategoryGlow, getDifficultyStars } from "@/lib/utils";
import { ICON_MAP } from "@/lib/icons";
import { useIsVisited, useMarkVisited } from "@/stores/progress";

interface PatternCardProps {
  pattern: PatternMetadata;
  index: number;
}

export function PatternCard({ pattern, index }: PatternCardProps) {
  const IconComponent = ICON_MAP[pattern.metaphor.icon] || Box;
  const glowClass = getCategoryGlow(pattern.category);
  const isVisited = useIsVisited(pattern.slug);
  const markVisited = useMarkVisited();

  return (
    <Link
      href={`/patterns/${pattern.slug}`}
      onClick={() => markVisited(pattern.slug)}
    >
      <div
        className={cn(
          "group relative p-7 rounded-2xl bg-surface border transition-all duration-300",
          "hover:scale-[1.02] cursor-pointer",
          getCategoryBorderColor(pattern.category),
          "hover:border-opacity-100",
          glowClass,
          isVisited && "bg-surface-hover"
        )}
      >
        <div className="absolute top-5 right-5 flex items-center gap-2">
          {isVisited && (
            <Check className="w-4 h-4 text-behavioral" aria-hidden="true" />
          )}
          <span className="text-text-muted text-sm font-mono">
            #{pattern.rank}
          </span>
        </div>

        <div
          className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center mb-5",
            getCategoryBgColor(pattern.category)
          )}
        >
          <IconComponent className={cn("w-6 h-6", getCategoryColor(pattern.category))} aria-hidden="true" />
        </div>

        <h3 className="text-lg font-semibold text-text-primary mb-2 group-hover:text-text-primary">
          {pattern.name}
        </h3>
        <div className={cn("text-sm capitalize mb-4", getCategoryColor(pattern.category))}>
          {pattern.category}
        </div>

        <p className="text-text-secondary text-sm mb-5 line-clamp-2 leading-relaxed">
          {pattern.tagline}
        </p>

        <div className="flex items-center justify-between pt-2">
          <span className="text-text-muted text-xs">Difficulty</span>
          <span className={cn("text-sm", getCategoryColor(pattern.category))} aria-label={`Difficulty: ${pattern.difficulty} out of 5`}>
            {getDifficultyStars(pattern.difficulty)}
          </span>
        </div>
      </div>
    </Link>
  );
}
