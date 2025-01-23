import { createSignal, Show, createEffect } from "solid-js";
import { Project } from "../";

const ProjectsSection = () => {
  const [projectsVisible, setProjectsVisible] = createSignal(false);
  const [shouldScroll, setShouldScroll] = createSignal(false);
  let toggleButtonRef: HTMLButtonElement | undefined;
  let scrollPosition = 0;

  createEffect(() => {
    if (shouldScroll()) {
      if (projectsVisible()) {
        // When showing more projects, maintain the current scroll position
        window.scrollTo(0, scrollPosition);
      } else {
        // When hiding projects, scroll to the button
        toggleButtonRef?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
      setShouldScroll(false);
    }
  });

  const toggleProjects = () => {
    if (!projectsVisible()) {
      // Save the current scroll position when showing more projects
      scrollPosition = window.pageYOffset;
    }
    setProjectsVisible(!projectsVisible());
    setShouldScroll(true);
  };

  return (
    <section id="projects" class="pb-16">
      <div class="flex flex-col justify-right items-end pt-8 md:pt-12 pb-4 md:pb-8">
        <h2 class="text-xl font-bold pr-6">personal projects</h2>
        <div class="text-xl font-bold border-slate-700 dark:border-slate-300 border-b-8 w-16" />
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 pr-4">
        <Project
          image="/images/projects/caroline-andrusko.png"
          tags={["NextJS", "TailwindCSS", "Resend"]}
          title="Caroline Andrusko"
          subTitle="Local Business"
          description="Caroline Andrusko, based in Curitiba, specializes in innovative designs for residential and commercial spaces. The website showcases their portfolio, highlighting a collaborative approach to creating personalized environments that meet each client's unique needs."
          url="https://www.carolineandrusko.com.br/"
        />
        <Project
          image="/images/projects/zuno.png"
          tags={["Typescript", "TailwindCSS", "SEO"]}
          title="Zuno Cable Park"
          subTitle="Local Business"
          description="Zuno Cable Park, located in Curitiba, is a premier destination for wakeboarding enthusiasts. The website highlights the park's facilities, activities, and booking options, providing an engaging experience for visitors to plan their adventure."
          url="https://www.zunocablepark.com/"
        />
        <Project
          image="/images/projects/seumecanico.png"
          tags={["Typescript", "NextJS", "Vercel"]}
          title="Seu Mecânico"
          subTitle="Startup"
          description="An innovative startup that aims to connects car owners with reliable mechanics. “Seu Mecânico” intends to simplify the process of finding, rating, and booking car services. "
          url="https://www.seumecanico.com/"
        />
        <Project
          image="/images/projects/versiani.png"
          tags={["Framer Motion", "Undraw", "TailwindCSS"]}
          title="Versiani"
          subTitle="Local Business"
          description="A professional and user-friendly website for Versiani, a new car rental company. This site was developed using Framer Motion for smooth animations, Undraw for custom illustrations, and TailwindCSS for responsive design."
          url="https://www.versianialugueldecarros.com.br/"
        />
        <Show when={projectsVisible()} fallback={null}>
          <Project
            image="/images/projects/vipify.png"
            subTitle="Startup"
            tags={["Prisma", "GraphQL", "Codegen"]}
            title="Vipify"
            description={`"The ultimate tool for managing VIP lists, designed for nightclubs and event organizers". Unfortunately discontinued, vipify aims to simplify the process of adding, updating, and managing guests.`}
            url="https://vipify.vercel.app/"
          />
          <Project
            image="/images/projects/grifecommerce.png"
            tags={["KeystoneJS", "GraphQL", "Apollo"]}
            title="GRIFE"
            subTitle="E-Commerce"
            description="An online store that allows users to search, add to cart and checkout items. This e-commerce application features six main models: Users, Items, Orders, CartItems, OrderItems, and Roles. The project was inspired by the “Advanced React and GraphQL” course by Wes Bos."
          />
          <Project
            image="/images/projects/feather.ai-pricing.png"
            subTitle="Study case"
            tags={["Playwright", "Shopify", "TailwindCSS"]}
            title="Feather AI"
            description="Featuring a pricing page for Feather AI, a machine learning FAKE startup. This project involved using Playwright for end-to-end testing, Shopify for e-commerce capabilities, and TailwindCSS for styling."
            url="https://feather-ai-gray.vercel.app/pricing"
          />
          <Project
            image="/images/projects/burn360.png"
            tags={["Next.js", "TailwindCSS", "Vercel"]}
            title="BURN 360"
            subTitle="Fitness"
            description="A fitness application designed for BURN 360, "
            url="https://www.burn360app.com/login"
          />
          <Project
            image="/images/projects/feather-blog.png"
            tags={["Strapi", "Jest", "Railway"]}
            title="Feather Blog"
            subTitle="Study case"
            description="A personal blog developed using Strapi and hosted on Railway. An interesting aspect of this project was integrating Strapi for seamless content updates and creating a dynamic blog layout. Features robust testing with Jest to ensure reliability"
            url="https://the-feather-blog.vercel.app/"
          />
          <Project
            image="/images/projects/grifemusic.png"
            tags={["React", "Firebase", "Mailchimp"]}
            title="GRIFE"
            subTitle="Music"
            description="A simple website for GRIFE, an electronic music duo. This project showcases this duo’s latest release and social media links"
            url="https://grifemusic.com/"
          />
        </Show>
      </div>
      <div class="w-full flex justify-center pt-4 xl:pt-8">
        <button
          ref={toggleButtonRef}
          onClick={toggleProjects}
          class="p-2 text-lg text-slate-900 dark:text-slate-100 font-medium rounded hover:font-bold hover:scale-105 transition-all duration-500"
        >
          {projectsVisible() ? "hide some projects" : "show more projects"}
          <div
            class={`w-6 font-bold border-slate-700 dark:border-slate-300 border-b-4 ${
              projectsVisible() ? "pl-20" : ""
            }`}
          />
        </button>
      </div>
    </section>
  );
};

export default ProjectsSection;
