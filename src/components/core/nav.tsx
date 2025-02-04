import { A, useLocation } from "@solidjs/router";
import { createMemo } from "solid-js";

const parseHash = (hash: string) => {
  return hash.split("#")[1];
};

const Nav = () => {
  const location = useLocation();
  const hashname = createMemo(() => parseHash(location.hash));
  const isActive = (hash: string) =>
    hashname() === hash ? "font-bold underline" : "";

  return (
    <nav class="fixed flex flex-col justify-around left-0 top-0 h-full w-14 sm:w-20 p-2 sm:p-4 pl-8 sm:pl-10 bg-transparent whitespace-nowrap bg-white dark:bg-black dark:text-white min-h-[480px]">
      <A
        href="#home"
        class={`w-fit font-mono transform -rotate-90 origin-left hover:underline hover:scale-105 transition-all duration-500 ${isActive(
          "home"
        )}`}
      >
        home
      </A>
      <A
        href="#cases"
        class={`w-fit font-mono transform -rotate-90 origin-left hover:underline hover:scale-105 transition-all duration-500 ${isActive(
          "cases"
        )}`}
      >
        cases
      </A>
      <A
        href="#projects"
        class={`w-fit font-mono transform -rotate-90 origin-left hover:underline hover:scale-105 transition-all duration-500 ${isActive(
          "projects"
        )}`}
      >
        projects
      </A>
      <A
        href="#about"
        class={`w-fit font-mono transform -rotate-90 origin-left hover:underline hover:scale-105 transition-all duration-500 ${isActive(
          "about"
        )}`}
      >
        about me
      </A>
      <A
        href="#contact"
        class={`w-fit font-mono transform -rotate-90 origin-left hover:underline hover:scale-105 transition-all duration-500 ${isActive(
          "contact"
        )}`}
      >
        contact
      </A>
    </nav>
  );
};

export default Nav;
