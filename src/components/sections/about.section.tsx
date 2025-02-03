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
        />
        <div class="flex flex-col items-start">
          <h3 class="text-2xl font-mono pb-4">
            <b>Diego V. Feder</b>
          </h3>
          <div class="flex flex-col space-y-4 text-sm md:text-base font-sans text-left max-w-3xl leading-relaxed">
            <p>
              Hi there 👋
              <br />
              I'm a Brazilian software engineer who's been working remotely
              since the COVID era.
            </p>
            <p>
              Currently, I collaborate with Tarmac.io, where I’ve had the
              opportunity to contribute to a variety of exciting projects across
              diverse industries. I also take on select freelance work,
              balancing flexibility with a strong commitment to delivering
              high-quality results.
            </p>
            <p>
              Feel free to ask me anything—I'm always up for a chat! You can
              find me almost anywhere by{' '}
              <span class="font-semibold">@diegovfeder</span>.
            </p>
            <p>
              When I'm not coding, I'm likely tackling my latest passion - what
              I like to call{' '}
              <span class="font-semibold italic">
                "my wakeboarding problem"
              </span>{' '}
              - aspiring to catch air and defy gravity (while mostly just
              catching water).
            </p>
          </div>
          <p class="pt-4">
            <A
              href="https://github.com/diegovfeder/"
              class="font-bold hover:underline"
            >
              GitHub
            </A>
            <span class="text-slate-700 dark:text-slate-300 px-2">|</span>
            <A
              href="https://www.linkedin.com/in/diegovfeder/"
              class="font-bold hover:underline"
            >
              LinkedIn
            </A>
          </p>
        </div>
      </div>
      <div class="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-8 pr-8">
        <Skill
          icon={<FiCode />}
          title="Essential Web Skills"
          description=" HTML, CSS, JavaScript, DOM (Web APIs)"
        />
        <Skill
          icon={<SiReact />}
          title="Frameworks and Libraries"
          description="React, Next.JS, SolidJS, TailwindCSS, Material-UI"
        />
        <Skill
          icon={<FiGitPullRequest />}
          title="Tooling and Workflow"
          description="Version control, build tools, and testing"
        />
        <Skill
          icon={<BsWindow />}
          title="Soft Skills and Industry Knowledge"
          description="UX design, collaboration, and keeping up with industry trends"
        />
      </div>
      <div class="w-full grid grid-cols-1 lg:grid-cols-3 gap-8 pr-8">
        <div class="flex justify-start">
          <List
            title="Tech Versatility"
            items={[
              'Full-stack development across various frameworks',
              'Cloud platforms and serverless architectures',
              'Database systems: SQL and NoSQL',
              'DevOps and CI/CD pipelines',
              'Web performance optimization',
              'Mobile app development with React Native',
              'SEO Techniques and Implementation',
              'Data Analytics and Visualization',
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
              'Test-driven development and automation',
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
              'Experimenting with blockchain and smart contracts',
              'Serverless and edge computing',
            ]}
          />
        </div>
      </div>
    </section>
  )
}

export default AboutSection
