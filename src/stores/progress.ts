"use client";

import { useState, useEffect, useCallback } from "react";

function loadVisited(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem("gof-visited");
    if (stored) {
      const parsed: unknown = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.every((v): v is string => typeof v === "string")) {
        return parsed;
      }
    }
  } catch {
    // corrupted data, start fresh
  }
  return [];
}

function persist(slugs: string[]) {
  try {
    localStorage.setItem("gof-visited", JSON.stringify(slugs));
  } catch {
    // quota exceeded or private mode
  }
}

let _visited: string[] | null = null;
const _listeners = new Set<() => void>();

function getVisited(): string[] {
  if (!_visited) _visited = loadVisited();
  return _visited;
}

function subscribe(cb: () => void): () => void {
  _listeners.add(cb);
  return () => { _listeners.delete(cb); };
}

function notify() {
  _listeners.forEach((cb) => cb());
}

export function useMarkVisited() {
  return useCallback((slug: string) => {
    const slugs = getVisited();
    if (slugs.includes(slug)) return;
    slugs.push(slug);
    _visited = slugs;
    persist(slugs);
    notify();
  }, []);
}

export function useIsVisited(slug: string): boolean {
  const [, setTick] = useState(0);
  useEffect(() => subscribe(() => setTick((t) => t + 1)), []);
  return getVisited().includes(slug);
}
