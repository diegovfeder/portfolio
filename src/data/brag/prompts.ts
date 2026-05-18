import type { PromptTemplate } from '~/types/brag'

export const bragPromptTemplates: PromptTemplate[] = [
  {
    id: 'custom-cv',
    title: 'Custom CV Generator',
    goal: 'Generate a role-specific resume using public evidence, yearly brag documents, and honest evidence-quality labels.',
    requiredInputs: [
      'TARGET_ROLE',
      'JOB_DESCRIPTION',
      'LANGUAGE',
      'CONSTRAINTS',
    ],
    templateText: `You are my career strategist.

Use my public brag page, yearly brag documents, linked blog evidence, and the brag operating model as the source of truth.

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
3. Keep claims evidence-based and tied to public proof.
4. Highlight quantified impact when available, and use observable outcomes when exact metrics are missing.
5. Label evidence as strong, moderate, or thin.
6. Output: summary, key experience bullets, skills section, and optional gaps to address.`,
  },
  {
    id: 'job-fit-analysis',
    title: 'Job Fit + Gap Analysis',
    goal: 'Compare my public profile and yearly brag material against a specific job posting without inflating weak evidence.',
    requiredInputs: [
      'TARGET_ROLE',
      'JOB_DESCRIPTION',
      'LANGUAGE',
      'CONSTRAINTS',
    ],
    templateText: `Act as a technical recruiter and engineering mentor.

TARGET_ROLE:
{{TARGET_ROLE}}

JOB_DESCRIPTION:
{{JOB_DESCRIPTION}}

LANGUAGE:
{{LANGUAGE}}

CONSTRAINTS:
{{CONSTRAINTS}}

TASK:
1. Map each requirement to matching brag evidence, yearly-report sections, or blog posts.
2. Score fit from 0-100 with clear evidence.
3. Identify hard gaps, soft gaps, and thin evidence.
4. Suggest talking points to de-risk each gap in interviews.
5. Separate public-safe claims from claims that need private confirmation.
6. Output a table: Requirement | Evidence | Confidence | Gap | Preparation Plan.`,
  },
  {
    id: 'interview-prep',
    title: 'Technical Interview Drill',
    goal: 'Generate role-specific interview questions and model answers from real public work.',
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
1. Create 12 likely interview questions covering system design, delivery, collaboration, debugging, and product thinking.
2. For each question, draft a STAR-style answer grounded in my yearly brag documents and linked blog posts.
3. Mark weak answers where evidence is thin and suggest what proof or study would improve the answer.
4. Include invisible-work stories when the evidence supports them: mentoring, reviews, planning, refactoring, operations.
5. Provide a final "must rehearse" list with the top 5 questions.`,
  },
  {
    id: 'performance-review',
    title: 'Performance Review Pack',
    goal: 'Turn yearly brag evidence into self-review bullets, manager 1:1 talking points, and evidence gaps.',
    requiredInputs: [
      'PERIOD',
      'LANGUAGE',
      'CONSTRAINTS',
    ],
    templateText: `Act as a precise performance review editor.

Use my public brag page, yearly brag documents, linked blog evidence, and the brag operating model as the source of truth.

PERIOD:
{{PERIOD}}

LANGUAGE:
{{LANGUAGE}}

CONSTRAINTS:
{{CONSTRAINTS}}

TASK:
1. Extract the strongest evidence for the review period.
2. Group it by delivery, technical depth, collaboration, leadership, and growth.
3. Include invisible work when evidence exists: code reviews, mentoring, refactoring, planning, incident response, and operational ownership.
4. Prefer metrics over adjectives and observable outcomes over vague claims.
5. Label evidence as strong, moderate, or thin.
6. Output: strongest evidence, review bullets, manager 1:1 talking points, and evidence gaps.`,
  },
  {
    id: 'excalidraw',
    title: 'Excalidraw Storyboard',
    goal: 'Generate an Excalidraw-ready diagram spec from selected public evidence and yearly brag narratives.',
    requiredInputs: [
      'TARGET_ROLE',
      'JOB_DESCRIPTION',
      'LANGUAGE',
      'CONSTRAINTS',
    ],
    templateText: `Use my yearly brag documents and linked public evidence to create an Excalidraw storyboard spec.

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
2. Design a narrative flow: context -> challenge -> action -> outcome.
3. Output a shape-by-shape diagram script with:
   - node text
   - connector labels
   - suggested grouping
   - color legend for wins, risks, and impact
4. Add a short presenter script for each node.`,
  },
]
