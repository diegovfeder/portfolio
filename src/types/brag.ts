export type BragSource = 'blog' | 'private-note'

export type BragVisibility = 'public' | 'private'

export interface BragEntry {
  id: string
  title: string
  date: string
  source: BragSource
  tags: string[]
  impact: string
  evidenceLink?: string
  visibility: BragVisibility
  impactMetric?: string
  role?: string
  skills?: string[]
  interviewStoryAngle?: string
}

export interface BragSummary {
  period: 'weekly' | 'monthly' | 'quarterly'
  wins: string[]
  lessons: string[]
  gaps: string[]
  nextActions: string[]
}

export interface PromptTemplate {
  id: string
  title: string
  goal: string
  templateText: string
  requiredInputs: string[]
}

export interface PrivateBragModule {
  privateBragEntries?: BragEntry[]
  privateSummaries?: BragSummary[]
}
