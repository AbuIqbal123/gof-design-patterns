import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="text-8xl font-bold text-structural/20 mb-4">404</div>
        <h1 className="text-2xl font-bold text-text-primary mb-2">
          Pattern Not Found
        </h1>
        <p className="text-text-secondary mb-8">
          The design pattern you&apos;re looking for doesn&apos;t exist or may have been moved.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/patterns"
            className="inline-flex items-center gap-2 px-6 py-3 bg-structural text-background font-semibold rounded-lg hover:bg-structural/90 transition-colors"
          >
            <Search className="w-4 h-4" />
            Browse Patterns
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-surface border border-border text-text-primary rounded-lg hover:bg-surface-hover transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}
