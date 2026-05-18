export interface PromptTemplate {
  id: string
  title: string
  goal: string
  templateText: string
  requiredInputs: string[]
}

export interface BragArtifact {
  id: string
  title: string
  description: string
  markdown: string
}

export interface BragProfileSkillGroup {
  label: string
  items: string[]
}

export interface BragProfile {
  name: string
  currentRole: string
  positioning: string
  summary: string
  location: string
  yearsOfExperience: string
  languages: string[]
  preferredRoles: string[]
  strengths: string[]
  focusAreas: string[]
  highlights: string[]
  skillGroups: BragProfileSkillGroup[]
}

export interface BragTimelineEntry {
  company: string
  role: string
  period: string
  scope: string
  stack: string[]
  highlights: string[]
}

export interface BragRecentEvidence {
  slug: string
  title: string
  description: string
  date: string
  tags: string[]
  impact: string
  impactMetric?: string
  link: string
}

export interface BragReportMetadata {
  year: string
  title: string
  summary: string
  publishedAt: string
  metrics: string[]
  tags: string[]
  relatedBlogSlugs: string[]
}

export interface BragPageData {
  profile: BragProfile
  timeline: BragTimelineEntry[]
  recentEvidence: BragRecentEvidence[]
  reports: BragReportMetadata[]
  prompts: PromptTemplate[]
  artifacts: BragArtifact[]
}
