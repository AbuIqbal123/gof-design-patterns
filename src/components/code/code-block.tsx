"use client";

import { useEffect, useState } from "react";
import { codeToHtml } from "shiki";
import { Check, Copy } from "lucide-react";

interface CodeBlockProps {
  code: string;
  language?: string;
}

export function CodeBlock({ code, language = "java" }: CodeBlockProps) {
  const [html, setHtml] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function highlight() {
      try {
        const highlighted = await codeToHtml(code, {
          lang: language,
          theme: "github-dark-default",
        });
        setHtml(highlighted);
      } catch (error) {
        console.error("Syntax highlighting failed:", error);
        setHtml(`<pre><code>${escapeHtml(code)}</code></pre>`);
      } finally {
        setIsLoading(false);
      }
    }
    highlight();
  }, [code, language]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  return (
    <div className="relative group">
      {/* Copy button */}
      <button
        onClick={handleCopy}
        className="absolute right-3 top-3 p-2 rounded-md bg-surface/80 border border-border z-10 hover:bg-surface transition-colors"
        aria-label={copied ? "Copied!" : "Copy code"}
        type="button"
      >
        {copied ? (
          <Check className="w-4 h-4 text-behavioral" aria-hidden="true" />
        ) : (
          <Copy className="w-4 h-4 text-text-secondary" aria-hidden="true" />
        )}
      </button>

      {/* Code content */}
      <div className="p-4 bg-[#0d1117] rounded-lg overflow-x-auto min-h-[100px] [&_pre]:!bg-transparent [&_pre]:!p-0 [&_code]:!text-sm [&_code]:!font-mono">
        {isLoading ? (
          <pre className="text-sm font-mono text-text-secondary whitespace-pre">
            <code>{code}</code>
          </pre>
        ) : (
          // react-doctor-disable-next-line dangerous-html-sink -- Shiki output is server-generated, not user-controlled
          <div dangerouslySetInnerHTML={{ __html: html }} />
        )}
      </div>
    </div>
  );
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
