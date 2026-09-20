import { useEffect, useRef, useState } from 'react';
import type { KeyboardEvent, TouchEvent } from 'react';
import { ChevronLeft, ChevronRight, Phone, Play } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import { ShowcaseVideo } from '../components/ShowcaseVideo';
import showcaseOne from '../assets/final_showcase.mp4';
import showcaseOnePoster from '../assets/final_showcase-poster.jpg';
import showcaseTwo from '../assets/final_showcase2.mp4';
import showcaseTwoPoster from '../assets/final_showcase2-poster.jpg';

/*
 * DRAFT TEXT: the section subtitle, the finished-boat blurb, the gallery blurb, and the two video
 * descriptions (read aloud by screen readers) are placeholder wording. Confirm them with the owner before the site goes live.
 *
 * To change the two finished-boat videos, replace final_showcase.mp4 and final_showcase2.mp4 in
 * src/assets/ (and their -poster.jpg stills, which are the first frame of each video).
 */

type MediaType = 'image' | 'video';

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
    ...fromModules(imageModules, 'image'),
    ...fromModules(videoModules, 'video'),
  ].sort((a, b) => a.filename.localeCompare(b.filename));
};

const slides = buildSlides();

// How long the fade-out runs before the slide swaps, in ms.
// Must match the Tailwind duration class used on the fade wrapper below.
const FADE_MS = 200;

const pad = (n: number) => String(n).padStart(2, '0');

// Shared styling for the previous / next arrow buttons on the slideshow.
const arrowClass =
  'absolute top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center border border-white/25 bg-black/55 text-white backdrop-blur-sm transition-colors hover:border-industrial-orange hover:bg-industrial-orange hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-reduce:transition-none md:h-14 md:w-14';

/**
 * ProjectSlideshow
 * The "Project Archive" section (id "archive"): the two finished-boat videos up top,
 * then a slideshow of every photo and video in src/assets/slideShow/.
 */
export const ProjectSlideshow = () => {
  // Which slide is showing (0 = the first one).
  const [index, setIndex] = useState(0);
  // False while the current slide is fading out, true once the next one fades in.
  const [isVisible, setIsVisible] = useState(true);
  // Lets the code pause the slideshow video when you move to another slide.
  const videoRef = useRef<HTMLVideoElement>(null);
  // True while a fade is running, so extra clicks during the fade are ignored.
  const busy = useRef(false);
  // The fade timer, kept so it can be cancelled if the section is removed.
  const timer = useRef<number | undefined>(undefined);
  // Where a finger first touched the screen, used to tell a swipe left from a swipe right.
  const touchStartX = useRef<number | null>(null);

  // The slide on screen right now.
  const current = slides[index];

  const changeSlide = (getNextIndex: (i: number) => number) => {
    if (busy.current) return; // ignore extra clicks while a fade is running
    busy.current = true;
    videoRef.current?.pause();
    setIsVisible(false); // start fade-out
    timer.current = window.setTimeout(() => {
      setIndex(getNextIndex);
      setIsVisible(true); // fade back in with the new slide
      busy.current = false;
    }, FADE_MS);
  };

  // Move to the next or previous slide, wrapping around at the ends.
  const goNext = () => changeSlide((i) => (i + 1) % slides.length);
  const goPrev = () => changeSlide((i) => (i - 1 + slides.length) % slides.length);

  // Cancel any fade timer when the section is removed from the page.
  useEffect(() => () => window.clearTimeout(timer.current), []);

  // Load the photos on either side of the current one ahead of time so flipping feels instant.
  useEffect(() => {
    [1, -1].forEach((step) => {
      const neighbor = slides[(index + step + slides.length) % slides.length];
      if (neighbor?.type === 'image') {
        const preload = new Image();
        preload.src = neighbor.media;
      }
    });
  }, [index]);

  // Left and right arrow keys move through the slides when the viewer has focus.
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowRight') goNext();
    if (event.key === 'ArrowLeft') goPrev();
  };

  // Swipe left or right on a touch screen.
  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0].clientX;
  };
  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;
    const distance = event.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (distance < -50) goNext();
    if (distance > 50) goPrev();
  };

  return (
    <section
      id="archive"
      className="relative z-10 scroll-mt-24 overflow-hidden bg-industrial-dark px-6 py-24"
    >
      {/* Soft orange glow behind the finished-boat videos */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-40 h-[40rem] w-[40rem] rounded-full bg-industrial-orange/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          title="Project"
          accent="Archive"
          subtitle="From first cut to finished deck"
        />

        {/* Finished boat: two short videos that play on their own */}
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <p className="flex items-center gap-3 text-sm font-black uppercase tracking-[0.25em] text-industrial-orange">
              <Play size={14} fill="currentColor" />
              The finished boat
            </p>
            <h3 className="mt-4 text-4xl font-bold uppercase leading-tight tracking-wide md:text-5xl">
              Walk the <span className="text-industrial-orange">finished deck</span>
            </h3>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-gray-300">
              Two quick walkarounds of the finished boat, filmed on site. Turn the sound on, or take
              either one full screen.
            </p>

            <a
              href="tel:3612221930"
              className="mt-8 inline-flex items-center gap-3 bg-industrial-orange px-8 py-4 text-sm font-black uppercase tracking-widest text-black transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              <Phone size={18} />
              Start your project
            </a>
          </div>

          <div className="lg:col-span-7">
            <div className="mx-auto grid max-w-md grid-cols-2 gap-5 pb-8 sm:max-w-xl sm:gap-8 sm:pb-12 lg:max-w-2xl">
              <ShowcaseVideo
                src={showcaseOne}
                poster={showcaseOnePoster}
                caption="Part 1"
                title="Walkaround of the finished boat, part 1"
                description="Video. The camera walks along the side deck of the finished boat: a round hatch cover, yellow-painted fittings, and the water alongside."
              />
              <ShowcaseVideo
                src={showcaseTwo}
                poster={showcaseTwoPoster}
                caption="Part 2"
                title="Walkaround of the finished boat, part 2"
                description="Video. The camera looks along the deck rail toward the bow of the finished boat, out over calm water, with an open hatch on the deck."
                className="translate-y-8 sm:translate-y-12"
              />
            </div>
          </div>
        </div>

        {/* The work behind it: every photo and video from the job */}
        {slides.length > 0 && (
          <div className="mt-28">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.25em] text-industrial-orange">
                  The work behind it
                </p>
                <h3 className="mt-3 text-3xl font-bold uppercase tracking-wide md:text-4xl">
                  Every step, <span className="text-industrial-orange">on record</span>
                </h3>
                <p className="mt-3 max-w-xl text-gray-300">
                  Photos and video from the job, from the first cuts to the finished deck.
                </p>
              </div>

              <p className="text-5xl font-black leading-none tabular-nums tracking-wide text-white/90">
                {pad(index + 1)}
                <span className="text-2xl text-gray-500"> / {pad(slides.length)}</span>
              </p>
            </div>

            <div
              role="region"
              aria-roledescription="carousel"
              aria-label="Project archive"
              tabIndex={0}
              onKeyDown={handleKeyDown}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              className="relative h-[26rem] overflow-hidden bg-black shadow-2xl shadow-black/50 outline-none ring-1 ring-white/10 focus-visible:ring-industrial-orange sm:h-[34rem] lg:h-[40rem]"
            >
              {/* Orange accent along the top edge */}
              <div className="absolute inset-x-0 top-0 z-10 h-1 bg-industrial-orange" />

              {/* Blurred copy of the current photo fills the space around it */}
              {current.type === 'image' && (
                <img
                  src={current.media}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 h-full w-full scale-125 object-cover opacity-40 blur-3xl"
                />
              )}

              <div
                className={`absolute inset-0 transition-opacity duration-200 motion-reduce:transition-none ${
                  isVisible ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {current.type === 'video' ? (
                  <video
                    key={current.filename}
                    ref={videoRef}
                    src={current.media}
                    className="h-full w-full object-contain"
                    controls
                    autoPlay
                    muted
                    playsInline
                  />
                ) : (
                  <img
                    key={current.filename}
                    src={current.media}
                    className="h-full w-full object-contain"
                    alt={`Toro Welding project photo ${index + 1} of ${slides.length}`}
                  />
                )}
              </div>

              {current.type === 'video' && (
                <span className="absolute right-4 top-5 z-10 bg-industrial-orange px-3 py-1 text-xs font-black uppercase tracking-widest text-black">
                  Video
                </span>
              )}

              <button
                type="button"
                onClick={goPrev}
                aria-label="Previous project"
                className={`${arrowClass} left-3 md:left-5`}
              >
                <ChevronLeft size={26} />
              </button>
              <button
                type="button"
                onClick={goNext}
                aria-label="Next project"
                className={`${arrowClass} right-3 md:right-5`}
              >
                <ChevronRight size={26} />
              </button>
            </div>

            {/* Slider to jump anywhere in the archive */}
            <input
              type="range"
              min={0}
              max={slides.length - 1}
              value={index}
              onChange={(event) => {
                const target = Number(event.target.value);
                if (target !== index) changeSlide(() => target);
              }}
              aria-label="Jump to a photo or video"
              className="mt-5 h-2 w-full cursor-pointer accent-industrial-orange"
            />
          </div>
        )}
      </div>
    </section>
  );
};
