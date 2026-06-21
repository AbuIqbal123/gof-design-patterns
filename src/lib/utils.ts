import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getCategoryColor(category: "creational" | "structural" | "behavioral"): string {
  const colors = {
    creational: "text-creational",
    structural: "text-structural",
    behavioral: "text-behavioral",
  };
  return colors[category];
}

export function getCategoryBgColor(category: "creational" | "structural" | "behavioral"): string {
  const colors = {
    creational: "bg-creational/10",
    structural: "bg-structural/10",
    behavioral: "bg-behavioral/10",
  };
  return colors[category];
}

export function getCategoryBorderColor(category: "creational" | "structural" | "behavioral"): string {
  const colors = {
    creational: "border-creational/30",
    structural: "border-structural/30",
    behavioral: "border-behavioral/30",
  };
  return colors[category];
}

export function getCategoryGlow(category: "creational" | "structural" | "behavioral"): string {
  const glows = {
    creational: "glow-creational",
    structural: "glow-structural",
    behavioral: "glow-behavioral",
  };
  return glows[category];
}

export function getDifficultyStars(difficulty: number): string {
  return "★".repeat(difficulty) + "☆".repeat(5 - difficulty);
}
