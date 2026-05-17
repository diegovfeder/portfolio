import { Title, Meta } from '@solidjs/meta'

import {
  AboutSection,
  CasesSection,
  ContactSection,
  HomeSection,
  ProjectsSection,
} from '~/components/sections'

export default function Home() {
  return (
    <>
      <Title>@diegovfeder</Title>
      <Meta
        name="description"
        content="Welcome to Diego Feder's portfolio. Explore my projects, skills, and experience as a software engineer."
      />
      <div class="w-full pl-16 sm:pl-20 mx-auto">
        <HomeSection />
        <CasesSection />
        <ProjectsSection />
        <AboutSection />
        <ContactSection />
      </div>
    </>
  )
}
