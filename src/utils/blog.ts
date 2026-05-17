export interface BlogPostEntry {
  slug: string
  title: string
  description: string
  date: string
  tags: string[]
  readingTime: number
  // Brag metadata — structured fields for career evidence generation
  brag?: {
    impact?: string
    impactMetric?: string
    skills?: string[]
    scope?: 'individual' | 'team' | 'org' | 'external'
    confidence?: 'strong' | 'moderate' | 'emerging'
    interviewAngle?: string
  }
}

export const blogPostEntries: BlogPostEntry[] = [
  {
    slug: 'SYMPHONY_AND_THE_FUTURE_OF_CODE_AGENTS',
    title: 'Symphony and the Future of Code Agents',
    description:
      'The interesting part of Symphony is not agent hype but the workflow infrastructure around agents: isolation, orchestration, policy, retries, and observability.',
    date: '2026-05-15',
    tags: [
      'ai-agents',
      'workflow-orchestration',
      'developer-tools',
      'automation',
      'engineering-systems',
    ],
    readingTime: 8,
    brag: {
      impact:
        'Explained code-agent orchestration as a systems problem centered on workflow infrastructure rather than model intelligence alone',
      skills: ['ai-agents', 'workflow-design', 'architecture', 'technical-writing'],
      scope: 'team',
      confidence: 'moderate',
      interviewAngle:
        'How I think about autonomous coding systems through isolation, policy, observability, and selective automation',
    },
  },
  {
    slug: 'AI_FOR_DEVELOPERS_2026_WHAT_THIS_SURVEY_ACTUALLY_SHOWS',
    title: 'AI for Developers in 2026: What This Survey Actually Shows',
    description:
      'A grounded read on recent developer-AI survey data: agents are moving into real engineering workflows, and the differentiator is judgment rather than raw tool access.',
    date: '2026-05-01',
    tags: ['ai-agents', 'developer-tools', 'engineering', 'surveys', 'productivity'],
    readingTime: 7,
    brag: {
      impact:
        'Synthesized current developer-AI adoption patterns into a practical perspective on agents, experience, and changing engineering leverage',
      skills: ['ai-agents', 'market-analysis', 'technical-writing', 'engineering-judgment'],
      scope: 'team',
      confidence: 'moderate',
      interviewAngle:
        'How I interpret AI adoption trends through workflow design, engineering judgment, and team realities instead of hype',
    },
  },
  {
    slug: 'BACK_OF_THE_ENVELOPE_ESTIMATION_SYSTEM_DESIGN_STARTS_WITH_SCALE',
    title: 'Back-of-the-Envelope Estimation: System Design Starts with Scale',
    description:
      'Quick order-of-magnitude estimates turn system design from tool shopping into architecture grounded in scale, constraints, and tradeoffs.',
    date: '2026-04-17',
    tags: [
      'system-design',
      'architecture',
      'estimation',
      'distributed-systems',
      'scalability',
    ],
    readingTime: 8,
    brag: {
      impact:
        'Explained why fast scale estimation is a foundational system design skill for making architecture decisions with context',
      skills: ['system-design', 'estimation', 'architecture', 'technical-writing'],
      scope: 'individual',
      confidence: 'moderate',
      interviewAngle:
        'How I use quick scale estimates to justify architecture choices instead of defaulting to buzzwords',
    },
  },
  {
    slug: 'SKILLS_ARE_NOT_JUST_LONG_PROMPTS',
    title: 'Skills Are Not Just Long Prompts',
    description:
      'Prompt engineering becomes more useful for code agents when skills are treated as reusable capabilities with scope, workflow, criteria, and evaluation.',
    date: '2026-04-03',
    tags: [
      'ai-agents',
      'prompt-engineering',
      'workflow-design',
      'code-review',
      'engineering',
    ],
    readingTime: 8,
    brag: {
      impact:
        'Framed agent skills as reusable engineering capabilities instead of oversized prompts',
      skills: ['ai-agents', 'workflow-design', 'technical-writing', 'evaluation'],
      scope: 'team',
      confidence: 'moderate',
      interviewAngle:
        'How I design reliable code-agent workflows by packaging context, process, and review criteria',
    },
  },
  {
    slug: 'LOCAL_SEO_AI_VISIBILITY_CURITIBA_CASE_STUDY',
    title:
      'From zero to one: SEO Case Story for a Local Business',
    description:
      'A practical local SEO case story showing how technical foundations, intent-led content, and weekly tracking moved a clinic from low visibility to top local results.',
    date: '2026-03-22',
    tags: ['local-seo', 'aeo', 'healthcare-seo', 'content-strategy', 'case-study'],
    readingTime: 3,
    brag: {
      impact: 'Moved a local clinic from low visibility to top local search results',
      skills: ['local-seo', 'content-strategy', 'analytics', 'client-delivery'],
      scope: 'external',
      confidence: 'strong',
      interviewAngle: 'End-to-end SEO engagement with measurable ranking improvements for a real client',
    },
  },
  {
    slug: 'THE_PATH_TO_FRONTEND_EXCELLENCE_IS_LESS_FOGGY_THAN_IT_LOOKS',
    title: 'The Path to Frontend Excellence Is Less Foggy Than It Looks',
    description:
      'Frontend feels vague only when platform, interface engineering, product thinking, and architecture are collapsed into one blurry discipline.',
    date: '2026-03-08',
    tags: ['frontend', 'web-platform', 'product-thinking', 'architecture', 'ux'],
    readingTime: 8,
    brag: {
      impact:
        'Published a practical framework for frontend growth across platform fundamentals, interface engineering, product sense, and scale',
      skills: ['frontend', 'technical-writing', 'architecture', 'product-thinking'],
      scope: 'individual',
      confidence: 'moderate',
      interviewAngle:
        'How I think about frontend seniority as layered judgment instead of framework trivia',
    },
  },
  {
    slug: 'FROM_SCRIPT_TO_SYSTEM_SEO_RANK_TRACKER',
    title: 'From Script to System: Making SEO Tracking Trustworthy',
    description:
      'How I refactored a working SEO rank tracker into a testable pipeline with a pure core, dependency-injected adapters, and reliable history snapshots.',
    date: '2026-02-21',
    tags: ['seo', 'automation', 'testing', 'architecture', 'javascript'],
    readingTime: 4,
    brag: {
      impact: 'Refactored SEO rank tracker from script to testable pipeline with DI and snapshot history',
      skills: ['architecture', 'testing', 'refactoring', 'dependency-injection'],
      scope: 'individual',
      confidence: 'strong',
      interviewAngle: 'Took a working-but-fragile script and made it production-grade with pure core + adapters',
    },
  },
  {
    slug: 'FROM_CLIENT_DELIVERY_TO_CONTENT_ENGINE',
    title:
      'From Client Delivery to Content Engine: Building a Notion-to-Next.js SEO SaaS',
    description:
      'Why I am productizing blog creation for client websites with Notion authoring, server-side rendering, and SEO-first performance.',
    date: '2026-02-07',
    tags: ['saas', 'notion', 'nextjs', 'seo', 'content-infrastructure'],
    readingTime: 3,
    brag: {
      impact: 'Productized client blog delivery into a Notion-to-Next.js content SaaS',
      skills: ['product-thinking', 'nextjs', 'notion-api', 'seo', 'ssr'],
      scope: 'external',
      confidence: 'moderate',
      interviewAngle: 'Spotted a repeating client need and turned it into a reusable product',
    },
  },
  {
    slug: 'BUILDING_A_BLOG_FIRST_BRAG_PROCESS',
    title: 'Building a Blog-First Brag Process',
    description:
      'Why I am using daily public writing as the main work journal, while keeping private notes only for evidence that should not be published.',
    date: '2026-01-24',
    tags: ['career', 'workflow', 'documentation', 'writing', 'automation'],
    readingTime: 2,
    brag: {
      impact: 'Designed a blog-first career evidence system replacing ad-hoc brag docs',
      skills: ['technical-writing', 'workflow-design', 'automation'],
      scope: 'individual',
      confidence: 'moderate',
      interviewAngle: 'How I built a system to turn daily writing into reusable career evidence',
    },
  },
  {
    slug: 'DELIVERING_WORK_IN_LAYERS',
    title: 'Delivering Your Work in Layers: A Frontend Perspective',
    description:
      'Why showing work early and often leads to better outcomes—and how to do it effectively in frontend projects.',
    date: '2025-12-11',
    tags: [
      'frontend',
      'development',
      'collaboration',
      'best-practices',
      'workflow',
    ],
    readingTime: 5,
    brag: {
      impact: 'Documented iterative delivery practices for frontend teams',
      skills: ['collaboration', 'frontend', 'iterative-delivery'],
      scope: 'team',
      confidence: 'moderate',
      interviewAngle: 'How I ship frontend work incrementally to reduce risk and improve feedback loops',
    },
  },
  {
    slug: 'THE_IMPORTANCE_OF_A_GOOD_DESIGN_SYSTEM',
    title: 'The Importance of a Good Design System',
    description:
      'Beyond reusable components—how a design system shapes team culture, scalability, and user experience.',
    date: '2025-11-06',
    tags: ['design-systems', 'frontend', 'architecture', 'best-practices'],
    readingTime: 3,
    brag: {
      impact: 'Articulated how design systems drive team culture and scalability beyond components',
      skills: ['design-systems', 'frontend-architecture', 'team-culture'],
      scope: 'team',
      confidence: 'moderate',
      interviewAngle: 'Why I advocate for design systems as org-level leverage, not just component libraries',
    },
  },
  {
    slug: 'WORKING_WITH_A_TEAM',
    title: 'Working with a Team',
    description:
      'What makes team collaboration actually work—from communication habits to shared ownership.',
    date: '2025-09-18',
    tags: ['collaboration', 'development', 'communication', 'best-practices'],
    readingTime: 2,
    brag: {
      skills: ['collaboration', 'communication', 'team-leadership'],
      scope: 'team',
      confidence: 'moderate',
    },
  },
  {
    slug: 'WHAT_REACT_TEACHES_US_ABOUT_DESIGN',
    title: 'What React Teaches Us About Design',
    description:
      'React\'s component model offers more than a coding pattern—it reflects deeper principles about clarity, reuse, and intent.',
    date: '2025-08-07',
    tags: ['react', 'design', 'architecture', 'frontend'],
    readingTime: 4,
    brag: {
      skills: ['react', 'component-architecture', 'design-thinking'],
      scope: 'individual',
      confidence: 'moderate',
    },
  },
  {
    slug: 'TELLING_A_GOOD_STORY',
    title: 'Technical Storytelling: Turning Complexity into Shared Momentum',
    description:
      'A practical framework for writing technical narratives that align teams, preserve context, and speed decisions.',
    date: '2025-06-19',
    tags: ['communication', 'documentation', 'team-collaboration', 'engineering'],
    readingTime: 3,
    brag: {
      impact: 'Created a framework for technical storytelling that aligns teams and speeds decisions',
      skills: ['technical-writing', 'communication', 'leadership'],
      scope: 'team',
      confidence: 'moderate',
      interviewAngle: 'How I use narrative structure to reduce alignment overhead on complex technical work',
    },
  },
  {
    slug: 'HOW_TO_BE_A_GOOD_DESIGNER',
    title: 'How to Be a Good Designer',
    description:
      'Being a strong designer is less about tools and more about curiosity, listening, and making good decisions under constraint.',
    date: '2025-05-08',
    tags: ['design', 'ux', 'best-practices', 'career'],
    readingTime: 1,
    brag: {
      skills: ['design-thinking', 'ux', 'decision-making'],
      scope: 'individual',
      confidence: 'emerging',
    },
  },
  {
    slug: 'WHEN_TO_USE_A_FRAMEWORK',
    title: 'When to Use a Framework',
    description:
      'Frameworks add power and structure—but they also bring tradeoffs. Here\'s how to decide when one\'s worth it.',
    date: '2025-03-20',
    tags: ['frameworks', 'architecture', 'decision-making', 'development'],
    readingTime: 1,
    brag: {
      skills: ['architecture', 'decision-making', 'tradeoff-analysis'],
      scope: 'individual',
      confidence: 'moderate',
    },
  },
  {
    slug: 'ONCE_YOU_KNOW_THE_PROBLEM_YOU_CAN_SOLVE_IT',
    title: 'Once You Know the Problem You Can Solve It',
    description:
      'A practical look at diagnosing technical and product problems—before jumping into solutions.',
    date: '2025-02-06',
    tags: ['problem-solving', 'development', 'methodology', 'best-practices'],
    readingTime: 1,
    brag: {
      skills: ['problem-solving', 'debugging', 'root-cause-analysis'],
      scope: 'individual',
      confidence: 'moderate',
    },
  },
]
