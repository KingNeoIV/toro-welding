import { useEffect } from 'react';

declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process: () => void;
      };
    };
  }
}

export const SocialSection = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (window.instgrm) {
        window.instgrm.Embeds.process();
      }
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-24 px-4 md:px-6 bg-industrial-dark border-t border-white/5">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl md:text-6xl font-black uppercase italic mb-4">
          Latest <span className="text-industrial-orange">Projects</span>
        </h2>
        
        <div className="mb-12">
          <p className="text-gray-400 uppercase tracking-widest text-sm font-bold">
            Follow the daily grind @torowelding2024
          </p>
        </div>

        {/* Centered Layout for Single Feed */}
        <div className="flex justify-center items-start">
          <div className="inline-block p-4 bg-black/40 rounded-xl border border-industrial-orange/20 shadow-[0_0_50px_rgba(249,115,22,0.1)] w-full max-w-135">
            <div className="flex justify-center rounded-lg overflow-hidden border border-white/10">
              <blockquote 
                className="instagram-media" 
                data-instgrm-permalink="https://www.instagram.com/torowelding2024/?utm_source=ig_embed&amp;utm_campaign=loading" 
                data-instgrm-version="14" 
                style={{ 
                  background: '#FFF', 
                  border: '0', 
                  borderRadius: '3px', 
                  margin: '1px', 
                  maxWidth: '540px', 
                  minWidth: '326px', 
                  padding: '0', 
                  width: 'calc(100% - 2px)' 
                }}
              >
              </blockquote>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <a 
            href="https://www.instagram.com/torowelding2024/" 
            target="_blank" 
            rel="noreferrer"
            className="text-industrial-orange font-bold uppercase tracking-widest text-xs hover:text-white transition-colors"
          >
            Check out more on Instagram →
          </a>
        </div>
      </div>
    </section>
  );
};