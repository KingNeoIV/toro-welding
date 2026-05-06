import work1 from '../assets/work1.png';
import toroweldingLogo from '../assets/toroweldingLogo.png';

export const Hero = () => (
  <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
    <div className="absolute inset-0 bg-linear-to-b from-black/75 via-black/50 to-industrial-dark z-10" />
    
    <img 
      src={work1} 
      className="absolute inset-0 w-full h-full object-cover scale-105 animate-pulse-slow brightness-50" 
      alt="Industrial Welding" 
    />

    <div className="relative z-20 text-center px-6 max-w-5xl">
      {/* Enlarged Logo Badge */}
      <div className="flex justify-center mb-10">
        <img 
          src={toroweldingLogo} 
          alt="Toro Welding Logo" 
          className="h-32 md:h-72 object-contain drop-shadow-[0_0_25px_rgba(255,255,255,0.15)]" 
        />
      </div>

      <div className="inline-block bg-industrial-orange text-black font-black px-4 py-1.5 mb-6 -skew-x-12 text-xs md:text-sm tracking-[0.2em] uppercase">
        Mobile & Fully Insured • Coastal Bend
      </div>

      <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter italic leading-[0.85]">
        Industrial <br /> 
        <span className="text-industrial-orange">Precision</span>
      </h1>

      <p className="mt-8 text-lg md:text-xl text-gray-300 font-medium max-w-2xl mx-auto leading-relaxed border-l-4 border-industrial-orange pl-6 md:pl-0 md:border-0">
        Locally owned and operated in Ingleside, TX. Providing high-precision fabrication for 
        Structural, Marine, and Industrial projects.
      </p>

      <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-4 font-black italic">
        <a 
          href="tel:3612221930" 
          className="w-full md:w-auto bg-industrial-orange text-black px-10 py-4 uppercase tracking-widest hover:bg-white transition-colors"
        >
          Call Now
        </a>
        <a 
          href="#FeaturedGallery" 
          className="w-full md:w-auto border-2 border-white text-white px-10 py-4 uppercase tracking-widest hover:bg-white hover:text-black transition-all"
        >
          View Projects
        </a>
      </div>
    </div>
  </section>
);