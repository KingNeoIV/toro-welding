import { useEffect, useRef, useState } from 'react';
import { SectionHeading } from './SectionHeading';
import instagramLogo from '../assets/instagram.png';

// Instagram's embed script adds a global object called instgrm once it has loaded.
// This tells TypeScript that object may exist, so we can call it below.
declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process: () => void;
      };
    };
  }
}

// Instagram's official embed script. It is NOT loaded with the page anymore (see below).
const EMBED_SRC = 'https://www.instagram.com/embed.js';

// Screen readers announce this when they reach the feed. Instagram's own frame has no title.
const FEED_TITLE = 'Instagram feed for @torowelding2024';

/**
 * SocialSection
 * The "Latest Projects" section: shows the Instagram feed for @torowelding2024.
 *
 * The feed does not load until the visitor presses "Load latest posts". Until then nothing is
 * requested from Instagram, so no Instagram cookies are set and the page loads faster.
 * After the press, the <blockquote class="instagram-media"> below (Instagram's official embed code)
 * is drawn and Instagram's script is added to the page, which turns it into the live feed.
 * Instagram loading is disclosed in public/privacy.html.
 */
export const SocialSection = () => {
  // False until the visitor asks to see the feed.
  const [loaded, setLoaded] = useState(false);
  // The box that holds the feed, so we can find the frame Instagram creates inside it.
  const feedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loaded) return;
    const box = feedRef.current;
    if (!box) return;

    // Instagram's frame comes without a title, which screen readers need.
    // Give it one as soon as it appears.
    const labelFrames = () => {
      box.querySelectorAll('iframe').forEach((frame) => {
        if (!frame.getAttribute('title')) frame.setAttribute('title', FEED_TITLE);
      });
    };
    const watcher = new MutationObserver(labelFrames);
    watcher.observe(box, { childList: true, subtree: true });
    labelFrames();

    // Load Instagram's script the first time, or ask it to look again if it is already there.
    // If the script is blocked or offline, the plain link inside the blockquote stays visible.
    if (window.instgrm) {
      window.instgrm.Embeds.process();
    } else if (!document.querySelector(`script[src="${EMBED_SRC}"]`)) {
      const script = document.createElement('script');
      script.async = true;
      script.src = EMBED_SRC;
      script.onload = () => window.instgrm?.Embeds.process();
      document.body.appendChild(script);
    }

    return () => watcher.disconnect();
  }, [loaded]);

  return (
    <section className="border-t border-white/5 bg-industrial-dark px-4 py-24 md:px-6">
      <div className="mx-auto max-w-7xl text-center">
        <SectionHeading
          title="Latest"
          accent="Projects"
          subtitle="Follow the daily grind @torowelding2024"
          center
        />

        {/* Centered Layout for Single Feed */}
        <div className="flex items-start justify-center">
          <div className="inline-block w-full max-w-135 border border-industrial-orange/30 bg-black/40 p-4 shadow-[0_0_50px_rgba(255,140,0,0.08)]">
            <div ref={feedRef} className="flex justify-center overflow-hidden border border-white/10">
              {loaded ? (
                <blockquote
                  className="instagram-media"
                  data-instgrm-permalink="https://www.instagram.com/torowelding2024/?utm_source=ig_embed&amp;utm_campaign=loading"
                  data-instgrm-version="14"
                  style={{
                    background: '#FFF',
                    border: '0',
                    margin: '1px',
                    maxWidth: '540px',
                    minWidth: '326px',
                    padding: '0',
                    width: 'calc(100% - 2px)',
                  }}
                >
                  {/* Shown only if Instagram's embed script is blocked or slow to load */}
                  <a
                    href="https://www.instagram.com/torowelding2024/"
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: 'block',
                      padding: '48px 16px',
                      color: '#121212',
                      fontWeight: 700,
                      textAlign: 'center',
                      textDecoration: 'none',
                    }}
                  >
                    View @torowelding2024 on Instagram
                  </a>
                </blockquote>
              ) : (
                <div className="flex min-h-80 w-full flex-col items-center justify-center gap-5 px-6 py-12">
                  <img
                    src={instagramLogo}
                    alt=""
                    aria-hidden="true"
                    width={96}
                    height={96}
                    className="h-12 w-12 object-contain"
                  />
                  <p className="text-lg font-bold uppercase tracking-widest">@torowelding2024</p>
                  <p className="max-w-sm text-sm leading-relaxed text-gray-400">
                    Our latest job photos and videos are on Instagram. Loading the feed connects your
                    browser to Instagram (see our{' '}
                    <a href="/privacy.html" className="underline hover:text-industrial-orange">
                      privacy policy
                    </a>
                    ).
                  </p>
                  <button
                    type="button"
                    onClick={() => setLoaded(true)}
                    className="bg-industrial-orange px-8 py-3 text-sm font-black uppercase tracking-widest text-black transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                  >
                    Load latest posts
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <a
            href="https://www.instagram.com/torowelding2024/"
            target="_blank"
            rel="noreferrer"
            className="text-xs font-bold uppercase tracking-widest text-industrial-orange transition-colors hover:text-white"
          >
            Check out more on Instagram →
          </a>
        </div>
      </div>
    </section>
  );
};
