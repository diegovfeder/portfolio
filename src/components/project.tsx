import { createSignal, For } from "solid-js";
import { A } from "@solidjs/router";
import Dialog from "@corvu/dialog";
import LazyImage from "./lazy-image";
import { IoCloseSharp } from "solid-icons/io";

interface ProjectProps {
  image: string;
  tags: string[];
  title: string;
  subTitle?: string;
  description: string;
  url?: string;
}

const Project = ({
  image,
  tags,
  title,
  subTitle,
  description,
  url,
}: ProjectProps) => {
  const [isModalOpen, setIsModalOpen] = createSignal(false);

  const openModal = () => setIsModalOpen(true);

  return (
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 md:p-6 w-full max-w-4xl">
      <div class="flex flex-col justify-between">
        <div class="pb-2">
          <div class="flex flex-wrap gap-2 items-end pb-2">
            <h2 class=" text-xl md:text-2xl font-bold">{title}</h2>
            {subTitle ? (
              <h3 class="text-lg md:text-xl font-light">{subTitle}</h3>
            ) : null}
          </div>
          <p class="text-md md:text-lg text-slate-700 dark:text-slate-300 font-thin text-left">
            {description}
          </p>
        </div>
        {url ? (
          <A
            href={url}
            target="_blank"
            class="mt-4 md:mt-0 w-fit whitespace-nowrap hover:font-bold hover:scale-105 transition-all duration-500"
          >
            view project
            <div class="text-xl font-bold border-slate-700 dark:border-slate-300 border-b-4 w-6" />
          </A>
        ) : null}
      </div>
      <div class="flex flex-col group">
        <div
          class="overflow-hidden rounded-sm cursor-pointer"
          onClick={openModal}
        >
          <LazyImage
            src={image}
            alt={`Screenshot of the ${title} project`}
            class="rounded-sm w-full h-auto object-cover transition-all duration-300 hover:animate-pulse"
          />
        </div>
        <ul class="flex flex-wrap text-xs font-bold pt-4">
          <For each={tags}>
            {(tag) => (
              <li class="flex justify-center items-center text-center border px-4 py-2 rounded-full leading-none me-1 mb-2">
                {tag}
              </li>
            )}
          </For>
        </ul>
        <Dialog open={isModalOpen()} onOpenChange={setIsModalOpen}>
          <Dialog.Portal>
            <Dialog.Overlay class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" />
            <Dialog.Content class="fixed left-1/2 top-1/2 z-50 w-[90vw] max-w-3xl -translate-x-1/2 -translate-y-1/2">
              <div class="absolute right-3 top-3">
                <Dialog.Close class="flex bg-white rounded-full focus:ring-2 focus:ring-slate-500 transition-all duration-200 focus:outline-none">
                  <IoCloseSharp class="w-8 h-8 dark:text-black" />
                </Dialog.Close>
              </div>
              <img
                src={image}
                alt={`Full size screenshot of ${title}`}
                class="w-full h-auto"
              />
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog>
      </div>
    </div>
  );
};

export default Project;
