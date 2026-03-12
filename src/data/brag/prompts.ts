import type { PromptTemplate } from '~/types/brag'

export const bragPromptTemplates: PromptTemplate[] = [
  {
    id: 'custom-cv',
    title: 'Custom CV Generator',
    goal: 'Generate a role-specific resume using the most relevant experiences.',
    requiredInputs: [
      'TARGET_ROLE',
      'JOB_DESCRIPTION',
      'LANGUAGE',
      'CONSTRAINTS',
    ],
    templateText: `You are my career strategist.

Use the brag entries below as the single source of truth.

TARGET_ROLE:
{{TARGET_ROLE}}

JOB_DESCRIPTION:
{{JOB_DESCRIPTION}}

LANGUAGE:
{{LANGUAGE}}

CONSTRAINTS:
{{CONSTRAINTS}}

TASK:
1. Rank my experiences by fit for this role.
2. Build a one-page resume tailored for the role.
3. Keep claims evidence-based and tied to entries.
4. Highlight quantified impact when available.
5. Output: summary, key experience bullets, skills section, and optional gaps to address.`,
  },
  {
    id: 'job-fit-analysis',
    title: 'Job Fit + Gap Analysis',
    goal: 'Compare my brag source-of-truth against a specific job posting.',
    requiredInputs: [
      'TARGET_ROLE',
      'JOB_DESCRIPTION',
      'LANGUAGE',
      'CONSTRAINTS',
    ],
    templateText: `Act as a technical recruiter + engineering mentor.

TARGET_ROLE:
{{TARGET_ROLE}}

JOB_DESCRIPTION:
{{JOB_DESCRIPTION}}

LANGUAGE:
{{LANGUAGE}}

CONSTRAINTS:
{{CONSTRAINTS}}

TASK:
1. Map each requirement to matching brag entries.
2. Score fit from 0-100 with clear evidence.
3. Identify hard gaps and soft gaps.
4. Suggest talking points to de-risk each gap in interviews.
5. Output a table: Requirement | Evidence | Confidence | Gap | Preparation Plan.`,
  },
  {
    id: 'interview-prep',
    title: 'Technical Interview Drill',
    goal: 'Generate role-specific interview questions and model answers from my real work.',
    requiredInputs: [
      'TARGET_ROLE',
      'JOB_DESCRIPTION',
      'LANGUAGE',
      'CONSTRAINTS',
    ],
    templateText: `You are preparing me for a technical interview.

TARGET_ROLE:
{{TARGET_ROLE}}

JOB_DESCRIPTION:
{{JOB_DESCRIPTION}}

LANGUAGE:
{{LANGUAGE}}

CONSTRAINTS:
{{CONSTRAINTS}}

TASK:
1. Create 12 likely interview questions (system design, delivery, collaboration, debugging).
2. For each question, draft a STAR-style answer grounded in my brag entries.
3. Mark weak answers where evidence is thin and suggest what to study.
4. Provide a final "must rehearse" list with top 5 questions.`,
  },
  {
    id: 'excalidraw',
    title: 'Excalidraw Storyboard',
    goal: 'Generate an Excalidraw-ready diagram spec from selected brag entries.',
    requiredInputs: [
      'TARGET_ROLE',
      'JOB_DESCRIPTION',
      'LANGUAGE',
      'CONSTRAINTS',
    ],
    templateText: `Use my brag entries to create an Excalidraw storyboard spec.

TARGET_ROLE:
{{TARGET_ROLE}}

JOB_DESCRIPTION:
{{JOB_DESCRIPTION}}

LANGUAGE:
{{LANGUAGE}}

CONSTRAINTS:
{{CONSTRAINTS}}

TASK:
1. Pick the best 3-5 experiences for this role.
2. Design a single narrative flow: context -> challenge -> action -> outcome.
3. Output a shape-by-shape diagram script with:
   - node text
   - connector labels
   - suggested grouping
   - color legend for wins, gaps, and impact.
4. Add a short presenter script for each node.`,
  },
  {
    id: 'selection-process-log',
    title: 'Selection Process Register',
    goal: 'Track interview process events and generate prep actions.',
    requiredInputs: ['COMPANY', 'TARGET_ROLE', 'LANGUAGE', 'CONSTRAINTS'],
    templateText: `You are my hiring process tracker.

COMPANY:
{{COMPANY}}

TARGET_ROLE:
{{TARGET_ROLE}}

LANGUAGE:
{{LANGUAGE}}

CONSTRAINTS:
{{CONSTRAINTS}}

TASK:
1. Register the process timeline (application date, recruiter call, technical rounds).
2. Summarize feedback signals and confidence trend.
3. Match feedback gaps to my brag entries and knowledge notes.
4. Generate a short study plan for the next stage.
5. Output: timeline table, risk matrix, and next actions.`,
  },
]
