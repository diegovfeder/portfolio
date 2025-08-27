import { createSignal, Show, createEffect, For } from 'solid-js'

import { Project } from '../home'
import { projects, hiddenProjects } from '../../data/projects'

const ProjectsSection = () => {
  const [projectsVisible, setProjectsVisible] = createSignal(false)
  const [shouldScroll, setShouldScroll] = createSignal(false)
  let toggleButtonRef: HTMLButtonElement | undefined
  let scrollPosition = 0

  createEffect(() => {
    if (shouldScroll()) {
      if (projectsVisible()) {
        // When showing more projects, maintain the current scroll position
        window.scrollTo(0, scrollPosition)
      } else {
        // When hiding projects, scroll to the button
        toggleButtonRef?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        })
      }
      setShouldScroll(false)
    }
  })

  const toggleProjects = () => {
    if (!projectsVisible()) {
      // Save the current scroll position when showing more projects
      scrollPosition = window.pageYOffset
    }
    setProjectsVisible(!projectsVisible())
    setShouldScroll(true)
  }

  return (
    <section id="projects" class="pb-16">
      <div class="flex flex-col justify-right items-end pt-8 md:pt-12 pb-4 md:pb-8">
        <h2 class="text-xl font-bold pr-6">personal projects</h2>
        <div class="text-xl font-bold border-slate-700 dark:border-slate-300 border-b-8 w-16" />
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 pr-4">
        <For each={projects}>
          {(project) => (
            <Project
              image={project.image}
              tags={project.tags}
              title={project.title}
              subTitle={project.subTitle}
              description={project.description}
              url={project.url}
              discontinued={project.discontinued}
            />
          )}
        </For>
        <Show when={projectsVisible()} fallback={null}>
          <For each={hiddenProjects}>
            {(project) => (
              <Project
                image={project.image}
                tags={project.tags}
                title={project.title}
                subTitle={project.subTitle}
                description={project.description}
                url={project.url}
                discontinued={project.discontinued}
              />
            )}
          </For>
        </Show>
      </div>
      <div class="w-full flex justify-center pt-4 xl:pt-8">
        <button
          ref={toggleButtonRef}
          onClick={toggleProjects}
          class="p-2 text-lg text-slate-900 dark:text-slate-100 font-medium rounded hover:font-bold hover:scale-105 transition-all duration-500"
        >
          {projectsVisible() ? 'hide some projects' : 'show more projects'}
          <div
            class={`w-6 font-bold border-slate-700 dark:border-slate-300 border-b-4 ${
              projectsVisible() ? 'pl-20' : ''
            }`}
          />
        </button>
      </div>
    </section>
  )
}

export default ProjectsSection
