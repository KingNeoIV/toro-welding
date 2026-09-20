import { useEffect, useId, useRef, useState } from 'react';
import { Maximize, Pause, Play, Volume2, VolumeX } from 'lucide-react';

interface ShowcaseVideoProps {
  src: string;
  poster: string;
  /** Short caption shown at the bottom of the video, for example "Part 1" */
  caption: string;
  /** Describes the video for screen readers */
  title: string;
  /** A written description of what happens in the video, for visitors who cannot see or hear it */
  description: string;
  className?: string;
}

// Shared styling for the small pause, sound, and full-screen buttons.
const controlButtonClass =
  'flex h-9 w-9 items-center justify-center border border-white/25 bg-black/55 text-white backdrop-blur-sm transition-colors hover:border-industrial-orange hover:bg-industrial-orange hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-reduce:transition-none sm:h-10 sm:w-10';

/**
 * ShowcaseVideo
 * A vertical (phone-shaped) video that plays by itself, muted and looping, while it is on screen,
 * and pauses when it scrolls away. Visitors can tap to pause, turn the sound on, or go full screen.
 * If the browser blocks autoplay, or the visitor has motion turned off, the poster image shows
 * with a play button instead.
 */
export const ShowcaseVideo = ({ src, poster, caption, title, description, className = '' }: ShowcaseVideoProps) => {
  // Lets the code play, pause, mute, and full-screen the video element.
  const videoRef = useRef<HTMLVideoElement>(null);
  // A unique id linking the video to its hidden text description (for screen readers).
  const descriptionId = useId();
  // True if the visitor paused it themselves, so scrolling back to it doesn't restart it.
  const userPaused = useRef(false);
  // Current state, used to show the right button icons.
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);

  // Play while at least half of the video is on screen, pause when it leaves.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !('IntersectionObserver' in window)
    ) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!userPaused.current) video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  // Show the browser's own controls while the video is full screen.
  useEffect(() => {
    const onChange = () => setFullscreen(document.fullscreenElement === videoRef.current);
    document.addEventListener('fullscreenchange', onChange);
    return () => document.removeEventListener('fullscreenchange', onChange);
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      userPaused.current = false;
      video.play().catch(() => {});
    } else {
      userPaused.current = true;
      video.pause();
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
  };

  const goFullscreen = () => {
    const video = videoRef.current as
      | (HTMLVideoElement & { webkitEnterFullscreen?: () => void })
      | null;
    if (!video) return;
    video.muted = false;
    try {
      if (video.requestFullscreen) void video.requestFullscreen();
      else video.webkitEnterFullscreen?.(); // iPhone Safari
    } catch {
      /* Full screen is not available; the video just keeps playing in place. */
    }
    video.play().catch(() => {});
  };

  return (
    <figure className={`relative ${className}`}>
      {/* Orange corner marks */}
      <span
        aria-hidden="true"
        className="absolute -left-2 -top-2 z-10 h-8 w-8 border-l-2 border-t-2 border-industrial-orange"
      />
      <span
        aria-hidden="true"
        className="absolute -bottom-2 -right-2 z-10 h-8 w-8 border-b-2 border-r-2 border-industrial-orange"
      />

      <p id={descriptionId} className="sr-only">
        {description}
      </p>

      <div className="relative aspect-[9/16] overflow-hidden bg-black shadow-2xl shadow-black/60 ring-1 ring-white/10">
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          muted
          loop
          playsInline
          preload="none"
          controls={fullscreen}
          aria-label={title}
          aria-describedby={descriptionId}
          onClick={togglePlay}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onVolumeChange={(event) => setMuted(event.currentTarget.muted)}
          className="h-full w-full cursor-pointer object-cover"
        />

        {/* Darkens the bottom edge so the caption and buttons stay readable */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-t from-black/85 to-transparent" />

        {/* Big play button, only while paused */}
        {!playing && (
          <button
            type="button"
            onClick={togglePlay}
            aria-label={`Play video: ${title}`}
            className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-industrial-orange text-black transition-transform hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white motion-reduce:transition-none"
          >
            <Play size={28} className="translate-x-0.5" fill="currentColor" />
          </button>
        )}

        <div className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-2 p-2 sm:flex-row sm:items-end sm:justify-between sm:p-4">
          <span className="whitespace-nowrap text-[11px] font-black uppercase tracking-[0.15em] text-white sm:text-xs sm:tracking-[0.2em]">
            {caption}
          </span>

          <div className="flex gap-1.5 sm:gap-2">
            {playing && (
              <button
                type="button"
                onClick={togglePlay}
                aria-label="Pause video"
                className={controlButtonClass}
              >
                <Pause size={18} fill="currentColor" />
              </button>
            )}
            <button
              type="button"
              onClick={toggleMute}
              aria-label={muted ? 'Turn sound on' : 'Turn sound off'}
              className={controlButtonClass}
            >
              {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
            <button
              type="button"
              onClick={goFullscreen}
              aria-label="Watch full screen"
              className={controlButtonClass}
            >
              <Maximize size={18} />
            </button>
          </div>
        </div>
      </div>
    </figure>
  );
};
