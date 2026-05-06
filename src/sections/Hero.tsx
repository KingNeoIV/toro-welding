import work1 from '../assets/work1.png';
import toroweldingLogo from '../assets/toroweldingLogo.png';

export const Hero = () => (
  <section className="relative h-[90dvh] flex items-center justify-center overflow-hidden bg-black">
    <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/20 to-industrial-dark z-10" />
    
    <img 
      src={work1} 
      className="absolute inset-0 w-full h-full object-cover object-[70%_center] md:object-center md:scale-105 animate-pulse-slow brightness-[0.45] md:brightness-50" 
      alt="Industrial Welding" 
    />

    {/* Added 'landscape:py-4' and 'landscape:justify-start' to help with scrolling if needed */}
    <div className="relative z-20 text-center px-6 max-w-5xl w-full h-full flex flex-col justify-center items-center landscape:py-4">
      
      {/* Shrink the logo significantly in landscape mode */}
      <div className="flex justify-center mb-4 md:mb-10 landscape:mb-2">
        <img 
          src={toroweldingLogo} 
          alt="Toro Welding Logo" 
          className="h-28 md:h-72 landscape:h-20 object-contain drop-shadow-[0_0_25px_rgba(255,255,255,0.2)]" 
        />
      </div>

      <div className="inline-block bg-industrial-orange text-black font-black px-4 py-1.5 mb-4 md:mb-6 landscape:mb-2 -skew-x-12 text-[10px] md:text-sm tracking-[0.2em] uppercase">
        Mobile & Fully Insured • Coastal Bend
      </div>

      <h1 className="text-4xl md:text-8xl landscape:text-3xl font-black uppercase tracking-tighter italic leading-[0.9] md:leading-[0.85]">
        Industrial <br /> 
        <span className="text-industrial-orange">Precision</span>
      </h1>

      {/* Hide the paragraph in mobile landscape to save space for buttons */}
      <p className="mt-4 md:mt-8 text-sm md:text-xl text-gray-300 font-medium max-w-2xl mx-auto leading-relaxed border-l-4 border-industrial-orange pl-6 md:pl-0 md:border-0 text-left md:text-center landscape:hidden">
        Locally owned and operated in Ingleside, TX. Providing high-precision fabrication for 
        Structural, Marine, and Industrial projects.
      </p>

      {/* Buttons stay visible by tightening gap and padding in landscape */}
      <div className="mt-6 md:mt-12 landscape:mt-4 flex flex-col md:flex-row items-center justify-center gap-3 md:gap-4 font-black italic w-full md:w-auto">
        <a 
          href="tel:3612221930" 
          className="w-full md:w-auto bg-industrial-orange text-black px-8 py-3 md:px-10 md:py-4 landscape:py-2 uppercase tracking-widest hover:bg-white transition-colors text-center text-sm md:text-base"
        >
          Call Now
        </a>
        <a 
          href="#FeaturedGallery" 
          className="w-full md:w-auto border-2 border-white text-white px-8 py-3 md:px-10 md:py-4 landscape:py-2 uppercase tracking-widest hover:bg-white hover:text-black transition-all text-center text-sm md:text-base"
        >
          View Projects
        </a>
      </div>
    </div>
  </section>
);