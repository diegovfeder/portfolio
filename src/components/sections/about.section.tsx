import { A } from '@solidjs/router'

import { BsWindow, FiGitPullRequest, FiCode, SiReact } from '../icons/solid'
import { List, Skill } from '../home'

const AboutSection = () => {
  return (
    <section id="about" class="flex flex-col justify-start items-start pt-4">
      <h2 class="text-xl font-bold mb-4">
        about me
        <div class="font-bold border-slate-700 dark:border-slate-300 border-b-8 w-14" />
      </h2>
      <div class="flex flex-col items-center sm:flex-row space-y-4 pl-2 pr-8 space-x-0 sm:space-x-12 sm:p-10 lg:mx-auto max-w-screen-lg">
        <img
          src="images/bio/dvf.webp"
          alt="Portrait of Diego V. Feder, Brazilian Software Engineer"
          class="rounded-full w-48 h-48 lg:w-64 lg:h-64 mb-6 lg:my-0 lg:mr-8 xl:mr-12 border-4 border-slate-700 dark:border-slate-300"
          loading="lazy"
          decoding="async"
          style={{
            'image-rendering': 'crisp-edges',
          }}
        />
        <div class="flex flex-col items-start">
          <h3 class="text-2xl font-mono pb-4">
            <b>Diego V. Feder</b>
          </h3>
          <div class="flex flex-col space-y-4 text-sm md:text-base font-sans text-left max-w-3xl leading-relaxed">
            <p>
              Hi there 👋
              <br />
              I’m a Brazilian software engineer working remotely since 2020. I
              build scalable, reliable applications for a wide range of
              companies.
            </p>
            <p>
              Since joining&nbsp;
              <A
                href="https://tarmac.io"
                target="_blank"
                rel="noopener noreferrer"
                class="font-semibold hover:underline focus-ring"
              >
                Tarmac.io
              </A>
              , I've been contributing to full-stack projects in education,
              fintech, healthcare, and more. I also take on select freelance
              work, helping clients launch websites and apps that solve real
              business needs.
            </p>
            <p>
              Looking to collaborate or just want to connect? I’m easy to find
              online at <span class="font-semibold">@diegovfeder</span>.
            </p>
            <p>
              When I’m not coding, I’m usually wakeboarding or wakeskating — one
              trick (or wipeout) at a time.
            </p>
          </div>
          <p class="pt-4">
            <A
              href="https://github.com/diegovfeder"
              target="_blank"
              rel="noopener noreferrer"
              class="font-bold hover:underline focus-ring"
            >
              GitHub
            </A>
            <span class="text-slate-700 dark:text-slate-300 px-2">|</span>
            <A
              href="https://www.linkedin.com/in/diegovfeder"
              target="_blank"
              rel="noopener noreferrer"
              class="font-bold hover:underline focus-ring"
            >
              LinkedIn
            </A>
          </p>
        </div>
      </div>
      <div class="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-8 pr-8">
        <Skill
          icon={<SiReact />}
          title="UX/UI Development"
          description="Crafting accessible, high-performing experiences across screens"
        />
        <Skill
          icon={<FiCode />}
          title="Full-Stack Delivery"
          description="Connecting UI, services, and automation to ship cohesive solutions"
        />
        <Skill
          icon={<FiGitPullRequest />}
          title="Product Engineering"
          description="Analytics-driven development with testing, automation, and user insights"
        />
        <Skill
          icon={<BsWindow />}
          title="System Architecture"
          description="Scalable backend systems, APIs, databases, and cloud infrastructure"
        />
      </div>
      <div class="w-full grid grid-cols-1 lg:grid-cols-3 gap-8 pr-8">
        <div class="flex justify-start">
          <List
            title="Tech Versatility"
            items={[
              'Full-stack development across React, Next.js, and NestJS',
              'Cloud platforms and serverless architectures',
              'Database systems with PostgreSQL, Prisma, and SQL/NoSQL',
              'DevOps and CI/CD pipelines with GitHub Actions and Docker',
              'Web performance optimization and Core Web Vitals',
              'Product analytics and experimentation with PostHog',
              'SEO techniques and implementation',
              'Data analytics and visualization',
            ]}
          />
        </div>
        <div class="flex justify-end lg:justify-start">
          <List
            title="Core Strengths"
            items={[
              'Modern JavaScript and TypeScript ecosystems',
              'React and Next.js for scalable web applications',
              'RESTful and GraphQL API design and implementation',
              'State management solutions (Redux, Recoil, Zustand)',
              'Design systems, Storybook, and component-driven testing',
              'Test-driven development with Jest and Playwright',
              'Agile methodologies and team collaboration',
              'Responsive design and accessibility',
            ]}
          />
        </div>
        <div class="flex justify-start">
          <List
            title="Continuous Growth"
            items={[
              'Exploring emerging web technologies',
              'Deepening knowledge in UI/UX principles',
              'Studying advanced software architecture patterns',
              'Investigating AI and machine learning applications',
              'Keeping up with web security best practices',
              'Evolving analytics and product instrumentation strategies',
              'Serverless and edge computing',
            ]}
          />
        </div>
      </div>
    </section>
  )
}

export default AboutSection
