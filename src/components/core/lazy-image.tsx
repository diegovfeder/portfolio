import { createSignal, onMount } from 'solid-js';

interface LazyImageProps {
  src: string;
  alt: string;
  class?: string;
}

const LazyImage = (props: LazyImageProps) => {
  const [loaded, setLoaded] = createSignal(false);
  let imgRef: HTMLImageElement | undefined;

  onMount(() => {
    if (imgRef && imgRef.complete) {
      setLoaded(true);
    }
  });

  return (
    <div class={`relative ${props.class || ''}`} style={{ "padding-top": "56.25%" }}>
      {!loaded() && (
        <div class="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
      <img
        ref={imgRef}
        src={props.src}
        alt={props.alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        class={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-300 ${
          loaded() ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
};

export default LazyImage;
