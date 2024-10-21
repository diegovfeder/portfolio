import Dialog from "@corvu/dialog";
import { For } from "solid-js";
import { IoCloseSharp } from "solid-icons/io";
import LazyImage from "./lazy-image";
import { A } from "@solidjs/router";

interface CaseProps {
  src: string;
  secondarySrc?: string;
  title: string;
  subtitle: string;
  body: {
    description: string;
    keyPoints: string[];
    technologies: string[];
  };
  website?: string;
}

function Case({
  src,
  secondarySrc,
  title,
  subtitle,
  body,
  website,
}: CaseProps) {
  return (
    <Dialog>
      <Dialog.Trigger class="my-autopy-3 px-4 text-lg font-medium focus:outline-none hover:text-underline">
        <div class="min-w-[200px] sm:min-w-[280px] md:min-w-[320px] lg:min-w-[480px] bg-white dark:bg-black">
          <h3 class="p-4 text-xl md:text-2xl font-bold">{title}</h3>
          <div class="bg-gray-200 dark:bg-gray-700 p-2">
            <LazyImage
              src={src}
              alt={`Visual representation of the ${title} project`}
              class="w-full h-48 py-12 px-8 object-cover"
            />
          </div>
        </div>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" />
        <Dialog.Content class="fixed left-1/2 top-1/2 z-50 w-11/12 max-w-4xl -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-4 md:p-6 shadow-2xl dark:bg-gray-800 dark:text-white">
          <Dialog.Close class="absolute right-4 top-4 rounded-full p-1 transition-colors hover:bg-gray-200 dark:hover:bg-gray-700">
            <IoCloseSharp class="h-6 w-6" />
          </Dialog.Close>
          <Dialog.Label class="text-2xl md:text-3xl font-bold">
            {title}
          </Dialog.Label>
          <p class="mt-2 text-lg md:text-xl text-gray-600 dark:text-gray-300">
            {subtitle}
          </p>
          <Dialog.Description class="mt-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <LazyImage
                src={src}
                alt={`Image of ${title} project`}
                class="w-full rounded-lg object-cover shadow-md"
              />
              {secondarySrc && (
                <LazyImage
                  src={secondarySrc}
                  alt={`Secondary image of ${title} project`}
                  class="w-full rounded-lg object-cover shadow-md hidden md:block"
                />
              )}
            </div>
            {website ? (
              <A
                href={website}
                target="_blank"
                class="w-fit whitespace-nowrap hover:font-bold hover:scale-105 transition-all duration-500"
              >
                view website
                <div class="text-xl font-bold border-slate-700 dark:border-slate-300 border-b-4 w-6" />
              </A>
            ) : null}
            <div class="prose prose-lg dark:prose-invert">
              <p class="py-4 text-base font-light">{body.description}</p>
              <h4 class="font-semibold">Key Contributions:</h4>
              <hr class="pb-2" />
              <ul>
                <For each={body.keyPoints}>
                  {(point) => (
                    <li class="text-sm md:text-base font-light">- {point}</li>
                  )}
                </For>
              </ul>
              <div class="flex flex-wrap text-xs font-bold pt-4">
                <For each={body.technologies}>
                  {(tech) => (
                    <span class="flex justify-center items-center text-center border px-4 py-2 rounded-full leading-none me-1 mb-2">
                      {tech}
                    </span>
                  )}
                </For>
              </div>
            </div>
          </Dialog.Description>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
}

export default Case;
