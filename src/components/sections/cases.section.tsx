import { createSignal, onMount, onCleanup } from 'solid-js'

import Case from '../case'

const CasesSection = () => {
  let containerRef: HTMLDivElement | null = null
  const [showScroll, setShowScroll] = createSignal(false)

  const checkScroll = () => {
    if (containerRef) {
      setShowScroll(containerRef.scrollWidth > containerRef.clientWidth)
    }
  }

  onMount(() => {
    // Ensure this only runs on the client side
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', checkScroll)
      checkScroll()
    }
  })

  onCleanup(() => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', checkScroll)
    }
  })

  return (
    <section id="cases" class="relative pt-4">
      <h2 class="text-start text-xl font-bold mb-4 whitespace-nowrap">
        cases
        <div class="border-b-4 w-16 text-xl font-bold border-slate-700 dark:border-slate-300" />
      </h2>
      <div
        class={`flex justify-start gap-4 snap-x snap-mandatory ${
          showScroll() ? 'overflow-x-scroll' : 'overflow-x-hidden'
        }`}
        ref={(el) => (containerRef = el)}
      >
        <Case
          src="/images/cases/atypicalai.png"
          secondarySrc="/images/cases/secondary/atypicalai.png"
          title="Atypical AI"
          subtitle="Generative AI Platform Transforming Education"
          body={{
            description:
              'Collaborated with Atypical AI to develop an AI-native platform that enhances educational experiences by providing personalized tutoring, teaching, and assessment solutions. The platform integrates cutting-edge AI with proven learning science to make education more accessible and effective.',
            keyPoints: [
              'Developed AI-driven educational tools',
              'Integrated personalized learning paths for students',
              'Enhanced teaching effectiveness and student engagement',
              'Ensured accessibility and equity in educational content',
            ],
            technologies: ['AI', 'Next.js', 'NestJS'],
          }}
          website="https://www.atypicalai.com/"
        />
        <Case
          src="/images/cases/hrhealthcare.png"
          secondarySrc="/images/cases/secondary/hrhealthcare.png"
          title="HR HealthCare"
          subtitle="AI-Powered Data Extraction for Healthcare Solutions"
          body={{
            description:
              "Integrated AI-driven solutions to enhance data extraction from various document types, streamlining HR HealthCare's data entry processes and improving efficiency.",
            keyPoints: [
              'Developed AI-powered data extraction system',
              'Processed PDFs and images into structured data',
              'Fine-tuned models for medical terminologies',
              'Improved data entry efficiency significantly',
            ],
            technologies: ['Bootstrap', 'Django', 'OpenAI'],
          }}
          website="https://www.hrhealthcare.com/"
        />
        <Case
          src="/images/cases/tempworks.png"
          secondarySrc="/images/cases/secondary/tempworks.png"
          title="TempWorks"
          subtitle="Enhancing Enterprise HR Software"
          body={{
            description:
              "Contributed to improving TempWorks' HR software platform by optimizing UI components and implementing efficient backend integrations.",
            keyPoints: [
              'Built intuitive and responsive layouts',
              'Improved cross-browser compatibility',
              'Implemented backend integration with ASP.NET',
            ],
            technologies: ['ASP.NET', 'React', 'Swagger'],
          }}
          website="https://tempworks.com"
        />
        <Case
          src="/images/cases/structural.png"
          secondarySrc="/images/cases/secondary/structural.png"
          title="Augeo - Structrual"
          subtitle="Revamping the UI for an Employee Engagement Platform"
          body={{
            description:
              "Led efforts to modernize Augeo's UI by introducing reusable components, focusing on the Postcard components and rewards page to enhance user interaction.",
            keyPoints: [
              'Developed modern, reusable UI components',
              'Redesigned Postcard components and rewards page',
              'Implemented new modals and grid layouts',
              'Collaborated with design team for seamless integration',
            ],
            technologies: ['CSS-in-JS', 'Component Libraries', 'React'],
          }}
          website="https://www.augeomarketing.com/solutions/workplace-engagement-structural"
        />
        <Case
          src="/images/cases/nexben.png"
          secondarySrc="/images/cases/secondary/nexben.png"
          title="Nexben"
          subtitle="Scaling a Healthcare Benefits Marketplace"
          body={{
            description:
              "Contributed to the development of Nexben's healthcare benefits marketplace, focusing on complex workflows for benefits enrollment and management.",
            keyPoints: [
              'Built and refined frontend components',
              'Enhanced performance and usability',
              'Implemented complex enrollment workflows',
              'Integrated frontend with backend services',
            ],
            technologies: ['React', 'Redux', 'RESTful APIs'],
          }}
          website="https://www.nexben.com/"
        />
        <Case
          src="/images/cases/lucra.png"
          secondarySrc="/images/cases/secondary/lucra.png"
          title="Lucra Sports"
          subtitle="Building Peer-to-Peer Sports Contests"
          body={{
            description:
              "Played a key role in developing Lucra Sports' peer-to-peer sports betting app, focusing on both frontend and backend implementations.",
            keyPoints: [
              'Built Notifications Service using APNs and AWS',
              'Developed serverless functions for notification management',
              'Improved Admin App UX with advanced features',
              'Handled both frontend and backend development tasks',
            ],
            technologies: ['AWS', 'Hasura', 'React'],
          }}
          website="https://www.lucrasports.com/"
        />
        <Case
          src="/images/cases/icapital.png"
          secondarySrc="/images/cases/secondary/icapital.png"
          title="iCapital"
          subtitle="Creating Reusable UI Components for FinTech"
          body={{
            description:
              'Collaborated with UX and Dev teams at iCapital to create a library of reusable React components, improving consistency across the platform.',
            keyPoints: [
              'Developed reusable React components',
              'Ensured responsiveness and accessibility',
              'Created Storybook renders for design team',
              'Released a comprehensive component library',
            ],
            technologies: ['React', 'Storybook', 'TypeScript'],
          }}
          website="https://www.icapital.com/"
        />
        <Case
          src="/images/cases/atet.png"
          secondarySrc="/images/cases/secondary/atet.webp"
          title="AT&T TV Demo"
          subtitle="Building a Scalable Multi-variant React Native App"
          body={{
            description:
              'Developed a scalable React Native app for AT&T TV, automating the build and release process for 16 app variants. Implemented core features and optimized UX for sales personnel.',
            keyPoints: [
              'Automated build and release for 16 app variants',
              'Developed core features including media content management',
              'Implemented deep linking functionality',
              'Optimized UX for sales demonstrations',
            ],
            technologies: [
              'CircleCI',
              'Fastlane',
              'React Native',
              'TypeScript',
            ],
          }}
        />
        <Case
          src="/images/cases/culltive.png"
          secondarySrc="/images/cases/secondary/culltive.webp"
          title="Culltive"
          subtitle="An IoT Automated Gardening Solution (MVP)"
          body={{
            description:
              'Developed an IoT automated gardening device MVP at Culltive, creating both web and mobile applications to simplify plant care routines.',
            keyPoints: [
              'Built web and mobile apps using React and React Native',
              'Integrated Firebase for real-time database management',
              'Handled IoT device communication',
              'Delivered a functional MVP for automated plant care',
            ],
            technologies: ['Firebase', 'IoT', 'React Native'],
          }}
          website="https://www.culltive.com/en"
        />
        <Case
          src="/images/cases/bosch.png"
          secondarySrc="/images/cases/secondary/bosch.jpg"
          title="Bosch"
          subtitle="Early Career in Android Development & CAN Protocol Integration"
          body={{
            description:
              'Started career at Bosch Engineering as an Android Mobile App developer, focusing on integrating Bluetooth communication with the CAN protocol for automotive systems.',
            keyPoints: [
              'Integrated Bluetooth with CAN protocol',
              'Enabled real-time data exchange between mobile devices and ECUs',
              'Developed systems for monitoring and configuring automotive systems',
              'Gained expertise in low-level communication protocols',
            ],
            technologies: ['Android (Java)', 'Bluetooth', 'CAN Protocol'],
          }}
          website="https://www.bosch-engineering.com/"
        />
      </div>
    </section>
  )
}

export default CasesSection
