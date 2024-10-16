import Dialog from "@corvu/dialog";
import { IoCloseSharp } from "solid-icons/io";
import LazyImage from "./lazy-image";

interface CaseProps {
  src: string;
  title: string;
  subtitle: string;
  body: string;
}
// TODO: Responsive images, default size
function Case({ src, title, subtitle, body }: CaseProps) {
  return (
    <Dialog>
      <Dialog.Trigger class="my-autopy-3 text-lg font-medium transition-all duration-100 hover:bg-slate-300 dark:hover:bg-slate-700 active:translate-y-0.5">
        <div class="min-w-[200px] max-w-[200px] bg-white dark:bg-black hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors duration-300">
          <div class="bg-gray-200 dark:bg-gray-700 p-2">
            <LazyImage
              src={src}
              alt={`Visual representation of the ${title} project`}
              class="w-full h-48 py-12 px-8 object-cover rounded-t-lg"
            />
          </div>
          <div class="p-4">
            <h3 class="text-lg font-semibold">{title}</h3>
          </div>
        </div>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay class="fixed inset-0 z-50 bg-black/50 dark:text-white" />
        <Dialog.Content class="fixed left-1/2 top-1/2 z-50 min-w-[320px] sm:min-w-[480px] md:min-w-[640px] lg:min-w-[720px] xl:min-w-[1080px] -translate-x-1/2 -translate-y-1/2 rounded-lg border-2 border-slate-700 dark:border-slate-300 bg-slate-100 dark:bg-black px-6 py-5 duration-200 corvu-open:animate-in corvu-open:fade-in-0 corvu-open:zoom-in-95 corvu-open:slide-in-from-left-1/2 corvu-open:slide-in-from-top-[60%] corvu-closed:animate-out corvu-closed:fade-out-0 corvu-closed:zoom-out-95 corvu-closed:slide-out-to-left-1/2 corvu-closed:slide-out-to-top-[60%]">
          <div class="absolute right-4">
            <Dialog.Close class="flex">
              <IoCloseSharp class="w-8 h-8" />
            </Dialog.Close>
          </div>
          <Dialog.Label class="text-2xl sm:text-3xl font-extrabold">
            {title}
          </Dialog.Label>
          <Dialog.Description class="text-lg sm:text-xl font-medium pt-4 sm:pt-6">
            {subtitle}
            <LazyImage
              src={src}
              alt={`Image of ${title} project`}
              class="w-full h-fit pt-4 pb-6 object-contain rounded-t-lg max-h-96"
            />
          </Dialog.Description>
          <textarea class="mt-4 w-full h-fit rounded-lg bg-slate-100 dark:bg-black p-4 shadow-md focus:ring-2 focus:ring-blue-500 transition-all duration-200 focus:outline-none">
            {body}
          </textarea>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
}

export default Case;
