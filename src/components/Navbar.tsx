import toroweldingLogo from '../assets/toroweldingLogo.png';
import { Phone } from 'lucide-react';

export const Navbar = () => {
  return (
    <nav className="flex items-center justify-between p-4 sticky top-0 z-50 bg-industrial-dark/80 backdrop-blur-md border-b border-white/5">
      <div className="flex items-center gap-2">
        <img src={toroweldingLogo} alt="Logo" className="h-14 w-auto rounded" />
        <span className="hidden md:block font-black tracking-tighter text-xl italic uppercase">Toro Welding</span>
      </div>
      <div className="flex items-center gap-6">
          <a 
            href="tel:3612221930" 
            className="flex items-center gap-2 bg-industrial-orange hover:bg-white text-black px-4 py-2 rounded font-black transition-colors group"
          >
            <Phone size={18} className="group-hover:animate-bounce" />
            <span className="text-sm md:text-base">(361) 222-1930</span>
          </a>
        </div>
    </nav>
  );
};