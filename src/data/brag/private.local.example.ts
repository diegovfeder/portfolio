import type { BragEntry, BragSummary } from '~/types/brag'

export const privateBragEntries: BragEntry[] = [
  {
    id: 'private:example-1',
    title: 'Critical production fix for checkout flow',
    date: '2026-03-10',
    source: 'private-note',
    tags: ['incident-response', 'frontend', 'payments'],
    impact:
      'Resolved a production issue affecting checkout reliability and stabilized the release.',
    visibility: 'private',
    impactMetric: 'Recovery time: 45 min. Error rate reduced from 8% to <1%.',
    role: 'Frontend Engineer',
    skills: ['debugging', 'incident management', 'communication'],
    interviewStoryAngle:
      'Show calm execution under pressure and cross-team alignment.',
  },
]

export const privateSummaries: BragSummary[] = [
  {
    period: 'weekly',
    wins: ['Handled a high-severity incident with clear communication.'],
    lessons: ['Document mitigation steps immediately after incident closure.'],
    gaps: ['Need stronger observability dashboard snapshots for storytelling.'],
    nextActions: ['Convert this incident into a STAR interview narrative.'],
  },
]
