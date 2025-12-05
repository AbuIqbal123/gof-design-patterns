export type PatternCategory = "creational" | "structural" | "behavioral";

export type DifficultyLevel = 1 | 2 | 3 | 4 | 5;

export interface PatternMetadata {
  id: string;
  slug: string;
  name: string;
  category: PatternCategory;
  rank: number;
  difficulty: DifficultyLevel;
  tagline: string;
  summary: string;

  // Visual metaphor
  metaphor: {
    title: string;
    description: string;
    icon: string; // Lucide icon name
  };

  // Core GoF content
  intent: string;
  problem: string;
  solution: string;

  // Relationships
  prerequisites: string[];
  relatedPatterns: string[];
  usedWith: string[];

  // Usage guidance
  useWhen: string[];
  dontUseWhen: string[];

  // Common pitfalls
  commonMistakes: string[];

  // Real-world examples
  realWorldExamples: string[];

  // UML configuration for visualization
  uml: UMLConfig;

  // Code examples
  codeExamples: CodeExample[];
}

export interface UMLConfig {
  participants: UMLParticipant[];
  relationships: UMLRelationship[];
  sequenceSteps?: SequenceStep[];
}

export interface UMLParticipant {
  id: string;
  name: string;
  type: "class" | "interface" | "abstract";
  stereotype?: string;
  attributes: string[];
  methods: string[];
  position: { x: number; y: number };
}

export interface UMLRelationship {
  from: string;
  to: string;
  type: "inheritance" | "implementation" | "composition" | "aggregation" | "association" | "dependency";
  label?: string;
}

export interface SequenceStep {
  step: number;
  from: string;
  to: string;
  message: string;
  returnMessage?: string;
  description: string;
}

export interface CodeExample {
  id: string;
  title: string;
  description: string;
  language: "java";
  code: string;
  highlightLines?: number[];
}

// Progress tracking types
export interface PatternProgress {
  patternId: string;
  visited: boolean;
  lastVisited?: Date;
  sectionsViewed: string[];
}

export interface UserProgress {
  patterns: Record<string, PatternProgress>;
  lastActivePattern?: string;
}
