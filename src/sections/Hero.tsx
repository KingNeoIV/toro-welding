import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Pause, Phone, Play } from 'lucide-react';
import heroDesktop from '../assets/hero-1080.mp4';
import heroMobile from '../assets/hero-mobile.mp4';
import heroPoster from '../assets/hero-poster.jpg';

/**
 * Hero
 * The opening section: a looping background video, the headline, and the call buttons.
 * Files: hero-1080.mp4 (computers), hero-mobile.mp4 (phones), hero-poster.jpg (still image shown while loading
 * and for visitors who turned off motion).
 * The video is from Pexels (free license, no credit needed):
 * https://www.pexels.com/video/man-working-at-welding-in-factory-10641848/
 */
export const Hero = () => {
  // Lets the code play and pause the video element.
  const videoRef = useRef<HTMLVideoElement>(null);
  // True while the video is playing. Controls the pause/play button's icon and label.
  const [playing, setPlaying] = useState(false);

  // Phones get the smaller video file so the top of the site loads fast.
  const [isMobile] = useState(
    () => window.matchMedia('(max-width: 767px)').matches
  );

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Respect visitors who turned off motion in their device settings.
    // They see the still poster image instead of the moving video.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      video.pause();
      return;
    }

    // Some browsers only allow autoplay when the video is muted.
    video.muted = true;
    video.play().catch(() => {
      /* If the browser blocks autoplay, the poster image stays visible. */
    });
  }, []);

  // Pause / play button for the background video (visitors must be able to stop moving content).
  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) video.play().catch(() => {});
    else video.pause();
  };

  return (
    <section id="home" className="relative flex min-h-[calc(100svh-5.5rem)] scroll-mt-22 items-center justify-center overflow-hidden bg-black">
      {/* Still image: shows while the video loads, and for reduced-motion visitors */}
      <img
        src={heroPoster}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Background video */}
      <video
        ref={videoRef}
        key={isMobile ? 'mobile' : 'desktop'}
        src={isMobile ? heroMobile : heroDesktop}
        poster={heroPoster}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
      />

      {/* Dark overlay keeps the text readable and blends into the next section */}
      <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/50 to-industrial-dark" />

      {/* Headline, tagline, and buttons, sitting above the video */}
      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-6 py-16 text-center">
        {/* Small orange tagline above the headline */}
        <p className="flex items-center gap-4 text-[11px] font-bold uppercase tracking-[0.14em] text-industrial-orange sm:text-sm sm:tracking-[0.25em]">
          <span className="hidden h-px w-10 bg-industrial-orange sm:block" />
          Mobile & Fully Insured • Coastal Bend
          <span className="hidden h-px w-10 bg-industrial-orange sm:block" />
        </p>

        {/* Main headline (the only h1 on the page) */}
        <h1 className="mt-6 drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)] text-5xl font-bold uppercase leading-[0.95] tracking-wide sm:text-7xl lg:text-8xl">
          Industrial <br />
          <span className="text-industrial-orange">Precision</span>
        </h1>

        {/* Short description under the headline */}
        <p className="mt-8 max-w-2xl text-base leading-relaxed text-gray-100 drop-shadow-[0_1px_8px_rgba(0,0,0,0.8)] sm:text-xl">
          Locally owned and operated in Ingleside, TX. Providing high-precision fabrication for
          Structural, Marine, and Industrial projects.
        </p>

        {/* Call Now (phone link) and View Projects (scrolls down to the Work section) */}
        <div className="mt-10 flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row">
          <a
            href="tel:3612221930"
            className="inline-flex w-full items-center justify-center gap-3 bg-industrial-orange px-10 py-4 text-base font-black uppercase tracking-widest text-black transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:w-auto"
          >
            <Phone size={20} />
            Call Now
          </a>

          <a
            href="#FeaturedGallery"
            className="inline-flex w-full items-center justify-center border-2 border-white px-10 py-4 text-base font-black uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-black focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:w-auto"
          >
            View Projects
          </a>
        </div>
      </div>

      {/* Pause / play the background video (hidden when the visitor has motion turned off) */}
      <button
        type="button"
        onClick={togglePlay}
        aria-label={playing ? 'Pause background video' : 'Play background video'}
        className="absolute bottom-4 right-4 z-20 flex h-11 w-11 items-center justify-center border border-white/30 bg-black/55 text-white backdrop-blur-sm transition-colors hover:border-industrial-orange hover:bg-industrial-orange hover:text-black motion-reduce:hidden md:bottom-6 md:right-6"
      >
        {playing ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="translate-x-0.5" />}
      </button>

      {/* Scroll-down arrow (hidden on small screens where it would crowd the buttons) */}
      <a
        href="#services"
        aria-label="Scroll down to services"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-white/70 transition-colors hover:text-industrial-orange md:block"
      >
        <ChevronDown
          size={36}
          className="animate-bounce [animation-iteration-count:3] motion-reduce:animate-none"
        />
      </a>
    </section>
  );
};
