import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { LazyMotion, domAnimation, MotionConfig } from "framer-motion";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "GoF Design Patterns - Visual Learning Platform",
  description: "Master all 23 Gang of Four design patterns with interactive visualizations and Java examples",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <LazyMotion features={domAnimation} strict>
          <MotionConfig reducedMotion="user">
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-structural focus:text-background focus:rounded-lg"
            >
              Skip to content
            </a>
            {children}
          </MotionConfig>
        </LazyMotion>
      </body>
    </html>
  );
}
