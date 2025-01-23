import { A } from "@solidjs/router";

export default function NotFound() {
  return (
    <div class="flex flex-col justify-center items-center h-screen">
      <h1 class="text-6xl  font-mono uppercase mb-8">404</h1>
      <h2 class="text-4xl  font-mono uppercase mb-10">page does not exist</h2>
      <A
        href="/"
        class="p-2 px-4 transition-all duration-500 hover:scale-105 border-2 border-black rounded-lg"
      >
        take me back home...
      </A>
    </div>
  );
}
