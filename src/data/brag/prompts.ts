import type { PromptTemplate } from '~/types/brag'

export const bragPromptTemplates: PromptTemplate[] = [
  {
    id: 'custom-cv',
    title: 'Custom CV Generator',
    goal: 'Generate a role-specific resume using the most relevant public evidence and yearly brag documents.',
    requiredInputs: [
      'TARGET_ROLE',
      'JOB_DESCRIPTION',
      'LANGUAGE',
      'CONSTRAINTS',
    ],
    templateText: `You are my career strategist.

Use my public brag page, yearly brag documents, and linked blog evidence as the source of truth.

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
4. Highlight quantified impact when available.
5. Output: summary, key experience bullets, skills section, and optional gaps to address.`,
  },
  {
    id: 'job-fit-analysis',
    title: 'Job Fit + Gap Analysis',
    goal: 'Compare my public profile and yearly brag material against a specific job posting.',
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
1. Map each requirement to matching brag evidence or yearly-report sections.
2. Score fit from 0-100 with clear evidence.
3. Identify hard gaps and soft gaps.
4. Suggest talking points to de-risk each gap in interviews.
5. Output a table: Requirement | Evidence | Confidence | Gap | Preparation Plan.`,
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
3. Mark weak answers where evidence is thin and suggest what to study.
4. Provide a final "must rehearse" list with the top 5 questions.`,
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
