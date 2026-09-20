import { useEffect } from 'react';
import { SectionHeading } from './SectionHeading';

// Instagram's embed script (loaded in index.html) adds a global object called instgrm.
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

/**
 * SocialSection
 * The "Latest Projects" section: shows the Instagram feed for @torowelding2024.
 * The <blockquote class="instagram-media"> below is Instagram's official embed code.
 * Instagram's script turns it into the live feed. Instagram loading is disclosed in public/privacy.html.
 */
export const SocialSection = () => {
  // Ask Instagram's script to look for embeds again shortly after this section appears,
  // in case the script finished loading before React drew the blockquote.
  // If the script is blocked or offline, the plain link inside the blockquote stays visible.
  useEffect(() => {
    const timer = setTimeout(() => {
      if (window.instgrm) {
        window.instgrm.Embeds.process();
      }
    }, 800);

    return () => clearTimeout(timer);
  }, []);

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
            <div className="flex justify-center overflow-hidden border border-white/10">
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
