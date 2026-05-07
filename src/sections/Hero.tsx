import work1 from '../assets/work1.png';
import toroweldingLogo from '../assets/toroweldingLogo.png';

export const Hero = () => (
  /* Mobile uses svh for stability; Desktop (md:) uses vh for full scale */
  <section className="relative h-[90svh] md:h-[90vh] flex items-center justify-center overflow-hidden bg-black">
    <div className="absolute -inset-4 bg-linear-to-b from-black/90 via-black/20 to-industrial-dark z-10" />
    
      <img 
        src={work1} 
        className="absolute inset-0 w-full h-full object-cover object-[70%_center] md:object-center md:scale-105 animate-pulse-slow brightness-[0.45] md:brightness-50" 
        alt="Industrial Welding" 
      />

    <div className="relative z-20 text-center px-6 max-w-7xl w-full h-full flex flex-col justify-center items-center">
      
      {/* 1. LOGO: Pulled gap below down to mb-1 */}
      <div className="flex justify-center mb-6 desktop:mb-12 mobile-short:mb-1">
        <img 
          src={toroweldingLogo} 
          alt="Toro Welding Logo" 
          className="h-32 desktop:h-[250px] mobile-short:h-40 object-contain drop-shadow-[0_0_25px_rgba(255,255,255,0.2)]" 
          />
      </div>

        {/* 2. ORANGE BADGE: Removed bottom margin on mobile-short */}
      <div className="inline-block bg-industrial-orange text-black font-black px-6 desktop:px-10 py-2 desktop:py-3 mb-6 desktop:mb-5 -skew-x-12 text-xs desktop:text-xl tracking-[0.2em] uppercase
        mobile-short:mt-2 
        mobile-short:mb-2">
        Mobile & Fully Insured • Coastal Bend
      </div>

      {/* 3. HEADING: Tightened text and line height (leading-none) to save vertical space */}
      <h1 className="text-5xl desktop:text-[80px] mobile-short:text-2xl font-black uppercase tracking-tighter italic leading-[0.9] desktop:leading-[0.8] mobile-short:leading-none">
        Industrial <br /> 
        <span className="text-industrial-orange">Precision</span>
      </h1>

      {/* 4. DESCRIPTION: Hidden on sideways phones to ensure buttons stay visible */}
      <p className="mt-8 text-lg desktop:text-3xl text-gray-300 font-medium max-w-4xl mx-auto leading-relaxed border-l-4 border-industrial-orange pl-6 desktop:pl-0 desktop:border-0 text-left desktop:text-center 
        mobile-short:block 
        mobile-short:mt-1 
        mobile-short:text-[16px] 
        mobile-short:leading-tight 
        mobile-short:max-w-xl 
        mobile-short:border-0 
        mobile-short:pl-0 
        mobile-short:text-center">
        Locally owned and operated in Ingleside, TX. Providing high-precision fabrication for 
        Structural, Marine, and Industrial projects.
      </p>

      {/* 5. BUTTONS CONTAINER: Pulled margin top way up (mt-2) */}
      <div className="mt-10 desktop:mt-2 flex flex-col desktop:flex-row items-center justify-center gap-4 desktop:gap-10 font-black italic w-full desktop:w-auto mobile-short:flex-row mobile-short:mt-2 mobile-short:gap-4">
          
        <a 
          href="tel:3612221930" 
          className="w-full desktop:w-auto bg-industrial-orange text-black px-10 py-5 desktop:px-20 desktop:py-8 mobile-short:w-auto mobile-short:px-8 mobile-short:py-2 mobile-short:text-xs uppercase tracking-widest hover:bg-white transition-colors text-center text-lg desktop:text-3xl"
        >
          Call Now
        </a>

        <a 
          href="#FeaturedGallery" 
          className="w-full desktop:w-auto border-2 border-white text-white px-10 py-5 desktop:px-20 desktop:py-8 mobile-short:w-auto mobile-short:px-8 mobile-short:py-2 mobile-short:text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all text-center text-lg desktop:text-3xl"
        >
          View Projects
        </a>
      </div>
    </div>
  </section>
);