// Domain types for DevPath.hub.
// These mirror the Prisma schema in the project spec so that the mock data
// layer in `lib/data.ts` can be swapped for real Prisma queries later with
// minimal churn at the call sites.

export type Level = "BEGINNER" | "INTERMEDIATE" | "ADVANCED";

export interface SetupStep {
  id: string;
  title: string;
  command?: string;
  explanation: string; // "What it does"
  why: string; // "Why it's needed"
  alternatives?: string;
  verification?: string; // "How to check it worked"
  eli5?: string; // "Explain Like I'm 5"
  order: number;
}

export interface RoadmapStep {
  id: string;
  title: string;
  content: string; // Markdown-ish
  eli5Content?: string;
  codeSnippet?: string;
  playgroundUrl?: string;
  order: number;
}

export interface Roadmap {
  id: string;
  title: string;
  description: string;
  level: Level;
  steps: RoadmapStep[];
}

export interface ProjectStep {
  id: string;
  title: string;
  content: string;
  codeSnippet?: string;
  order: number;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  level: Level;
  starterCode?: string;
  demoUrl?: string;
  estimatedHours: number;
  tags: string[];
  steps: ProjectStep[];
}

export interface CommonError {
  id: string;
  errorMessage: string;
  cause: string;
  solution: string;
  codeSnippet?: string;
  tags: string[];
}

export interface Tool {
  id: string;
  name: string;
  description: string;
  purpose: string;
  whyUseIt: string;
  alternatives: string;
  docsUrl?: string;
  bestFor: string;
}

export interface Tech {
  id: string;
  name: string;
  slug: string;
  description: string;
  tagline: string;
  iconEmoji: string;
  color: string; // brand color for accents
  isFeatured: boolean;
  stats: { learners: string; guides: number; projects: number };
  setupGuide: {
    title: string;
    description: string;
    steps: SetupStep[];
  };
  roadmaps: Roadmap[];
  projects: Project[];
  errors: CommonError[];
  tools: Tool[];
}

export interface Challenge {
  id: string;
  slug: string;
  title: string;
  description: string;
  techSlug: string;
  techName: string;
  level: Level;
  prize: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  participants: number;
  submissions: ChallengeSubmission[];
}

export interface ChallengeSubmission {
  id: string;
  author: string;
  avatarColor: string;
  repoUrl: string;
  demoUrl?: string;
  blurb: string;
  votes: number;
}
