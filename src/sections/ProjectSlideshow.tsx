import { useState, useRef } from 'react';

type MediaType = "image" | "video";

type SlideItem = {
  media: string;
  type: MediaType;
  filename: string;
};

// Pulls in every .jpg and .mp4 in the slideShow folder automatically.
// Drop new files into src/assets/slideShow/ and they'll show up here
// with no code changes needed.
const imageModules = import.meta.glob('../assets/slideShow/*.jpg', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

const videoModules = import.meta.glob('../assets/slideShow/*.mp4', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

const buildSlides = (): SlideItem[] => {
  const fromModules = (
    modules: Record<string, string>,
    type: MediaType
  ): SlideItem[] =>
    Object.entries(modules).map(([path, url]) => ({
      media: url,
      type,
      filename: path.split('/').pop() ?? path,
    }));

  return [
    ...fromModules(imageModules, "image"),
    ...fromModules(videoModules, "video"),
  ].sort((a, b) => a.filename.localeCompare(b.filename));
};

const slides = buildSlides();

// How long the fade-out runs before the slide swaps, in ms.
// Must match the Tailwind duration class used on the fade wrapper below.
const FADE_MS = 200;

export const ProjectSlideshow = () => {
  const [index, setIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const current = slides[index];

  const changeSlide = (getNextIndex: (i: number) => number) => {
    videoRef.current?.pause();
    setIsVisible(false); // start fade-out
    setTimeout(() => {
      setIndex(getNextIndex);
      setIsVisible(true); // fade back in with the new slide
    }, FADE_MS);
  };

  const goNext = () => changeSlide((i) => (i + 1) % slides.length);
  const goPrev = () => changeSlide((i) => (i - 1 + slides.length) % slides.length);

  if (slides.length === 0) return null;

  return (
    <section className="py-24 px-6 max-w-5xl mx-auto">
      <div className="mb-12">
        <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter">
          Project <span className="text-industrial-orange">Archive</span>
        </h2>
        <p className="text-gray-400 uppercase tracking-widest mt-2 text-sm font-bold">
          {index + 1} of {slides.length}
        </p>
      </div>

      <div
        className={`relative border-l-4 border-industrial-orange overflow-hidden bg-black transition-opacity duration-200 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        {current.type === "video" ? (
          <video
            key={current.filename}
            ref={videoRef}
            src={current.media}
            className="w-full max-h-150 object-contain mx-auto"
            controls
            autoPlay
            playsInline
          />
        ) : (
          <img
            key={current.filename}
            src={current.media}
            className="w-full max-h-150 object-contain mx-auto"
            alt="Project slide"
          />
        )}
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          onClick={goPrev}
          className="border-2 border-industrial-orange text-industrial-orange px-6 py-2 font-black uppercase tracking-widest text-sm hover:bg-industrial-orange hover:text-black transition-colors"
        >
          Back
        </button>
        <button
          onClick={goNext}
          className="border-2 border-industrial-orange text-industrial-orange px-6 py-2 font-black uppercase tracking-widest text-sm hover:bg-industrial-orange hover:text-black transition-colors"
        >
          Next
        </button>
      </div>
    </section>
  );
};
