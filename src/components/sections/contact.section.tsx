import { A } from '@solidjs/router'

import { BsGithub, BsLinkedin } from '../icons/solid'

const ContactSection = () => {
  return (
    <section id="contact" class="py-16">
      <h2 class="flex flex-col justify-center items-center text-xl font-bold mb-4">
        contact me
        <div class="font-bold border-slate-700 dark:border-slate-300 border-b-8 w-16 ml-2" />
      </h2>
      <div class="flex justify-center space-x-8 p-12">
        <A
          rel="noopener noreferrer"
          target="_blank"
          href="https://github.com/diegovfeder"
          class="text-2xl hover:underline hover:text-slate-500"
        >
          <BsGithub />
        </A>
        <A
          rel="noopener noreferrer"
          target="_blank"
          href="https://www.linkedin.com/in/diegovfeder"
          class="text-2xl hover:underline hover:text-slate-500"
        >
          <BsLinkedin />
        </A>
      </div>
    </section>
  )
}

export default ContactSection
