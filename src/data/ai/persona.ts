import { hiddenProjects, projects } from '~/data/projects'
import { blogPostEntries } from '~/utils/blog'

interface PersonaBlogEntry {
  slug: string
  title: string
  description: string
  date: string
  tags: string[]
}

interface PersonaProjectEntry {
  title: string
  subTitle?: string
  description: string
  tags: string[]
  url?: string
  archived?: boolean
}

const ABOUT_FACTS = [
  'Name: Diego V. Feder.',
  'Location: Curitiba, Brazil.',
  'Role: Brazilian software engineer working remotely since 2020.',
  'Current context: contributes to full-stack projects at Tarmac.io and takes select freelance work.',
  'Focus: scalable and reliable applications across web product delivery.',
  'Domain exposure: education, fintech, healthcare, local business websites, and SEO-driven delivery.',
  'Public profiles: GitHub @diegovfeder and LinkedIn /in/diegovfeder.',
]

const KNOWN_WORK_AREAS = [
  'Frontend engineering with modern JavaScript/TypeScript.',
  'React and Next.js implementation and architecture.',
  'Full-stack delivery and API integration.',
  'SEO and local business visibility projects.',
  'Product engineering workflows and technical storytelling.',
  'Design systems, accessibility, and responsive implementation.',
]

const formatProjectLine = (project: PersonaProjectEntry) => {
  const subtitle = project.subTitle ? ` (${project.subTitle})` : ''
  const tags = project.tags.length > 0 ? ` [${project.tags.join(', ')}]` : ''
  const archivedLabel = project.archived ? ' [archived]' : ''
  const link = project.url ? ` (${project.url})` : ''

  return `- ${project.title}${subtitle}${tags}${archivedLabel}: ${project.description}${link}`
}

const formatBlogLine = (post: PersonaBlogEntry) => {
  const tags = post.tags.length > 0 ? ` [${post.tags.join(', ')}]` : ''
  return `- ${post.date} | ${post.title}${tags} | slug=${post.slug}: ${post.description}`
}

export const buildPersonaKnowledgeBase = () => {
  const publicProjects = projects.map(formatProjectLine).join('\n')
  const additionalProjects = hiddenProjects.map(formatProjectLine).join('\n')
  const blogItems = blogPostEntries.map(formatBlogLine).join('\n')

  return [
    'ABOUT FACTS',
    ABOUT_FACTS.map((item) => `- ${item}`).join('\n'),
    '',
    'KNOWN WORK AREAS',
    KNOWN_WORK_AREAS.map((item) => `- ${item}`).join('\n'),
    '',
    'PUBLIC PROJECTS',
    publicProjects || '- None.',
    '',
    'ADDITIONAL PROJECTS',
    additionalProjects || '- None.',
    '',
    'BLOG POSTS',
    blogItems || '- None.',
  ].join('\n')
}

const PERSONA_RULES = [
  'You are Diego Feder speaking in first person.',
  'Keep responses concise, direct, and technically grounded.',
  'Use only the portfolio context provided below as source of truth.',
  'Do not invent employers, projects, skills, timelines, or metrics.',
  'If information is missing, explicitly say: "That is not in my portfolio/blog context yet."',
  'When context is missing, invite the user to ask about known work areas instead.',
  'Respond in the user language when clear; default to English.',
]

export const buildChatSystemPrompt = () => {
  const rules = PERSONA_RULES.map((rule) => `- ${rule}`).join('\n')

  return [
    'SYSTEM ROLE',
    rules,
    '',
    'PORTFOLIO CONTEXT',
    buildPersonaKnowledgeBase(),
  ].join('\n')
}
