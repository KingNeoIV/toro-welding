import toroweldingLogo from '../assets/toroweldingLogo.png';
import NeoIVLogo from '../assets/NeoIVLogo.png';
import instagramLogo from '../assets/instagram.png';
import facebookLogo from '../assets/facebook.png';
import { Phone, Mail, MapPin, User } from 'lucide-react'; 

export const Footer = () => {
  return (
    <footer className="bg-black py-20 px-6 border-t border-industrial-orange/30">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12 text-center md:text-left">
        <div>
          <img src={toroweldingLogo} alt="Logo" className="h-32 mb-6 mx-auto md:mx-0 rounded" />
          <p className="text-gray-400 leading-relaxed">
            Serving Ingleside and surrounding areas with professional welding and fabrication services. 
            Mobile, Insured, and Ready.
          </p>
        </div>
        
        {/* Updated Contact Info Section */}
        <div className="space-y-4">
          <h4 className="text-industrial-orange font-black uppercase tracking-widest text-sm">Contact Info</h4>
          
          <div className="flex items-center justify-center md:justify-start gap-3 text-white border-b border-white/5 pb-2">
            <User className="text-industrial-orange" size={20} />
            <span className="font-bold tracking-wide">Owner: Gabino Torres II</span>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-3">
            <Phone className="text-industrial-orange" size={20} />
            <span className="text-xl font-bold">(361) 222-1930</span>
          </div>
          
          <div className="flex items-center justify-center md:justify-start gap-3">
            <Mail className="text-industrial-orange" size={20} />
            <span className="text-gray-300">torowelding@yahoo.com</span>
          </div>
          
          <div className="flex items-center justify-center md:justify-start gap-3 text-gray-300">
            <MapPin className="text-industrial-orange" size={20} />
            <span>Ingleside, TX</span>
          </div>
        </div>

        <div className="space-y-6">
          <h4 className="text-industrial-orange font-black uppercase tracking-widest text-sm">Follow the work</h4>
          <div className="flex justify-center md:justify-start gap-4">
            <a 
              href="https://www.instagram.com/torowelding2024/" 
              target="_blank" 
              rel="noreferrer" 
              className="group p-3 bg-transparent hover:bg-industrial-orange transition-all duration-300 rounded text-white"
            >
              <img 
                src={instagramLogo} 
                alt="Instagram" 
                className="h-6 w-6 object-contain transition-all brightness(0) invert(1) group-hover:brightness(100%) group-hover:invert(0)" 
              />
            </a>
            <a 
              href="https://www.facebook.com/profile.php?id=61560516488673" 
              target="_blank" 
              rel="noreferrer" 
              className="group p-3 bg-transparent hover:bg-industrial-orange transition-all duration-300 rounded text-white"
            >
              <img 
                src={facebookLogo} 
                alt="Facebook" 
                className="h-6 w-6 object-contain transition-all brightness(0) invert(1) group-hover:brightness(100%) group-hover:invert(0)" 
              />
            </a>
          </div>

          <div className="flex flex-col items-center md:items-start gap-3">
            <p className="text-xs text-gray-600 uppercase tracking-widest">
              Developed by NeoIV Tech Solutions
            </p>
            <div className="pt-4">
              <a 
                href="https://kingneoiv.github.io/" 
                target="_blank" 
                rel="noreferrer" 
                title="Built by NeoIV Tech Solutions"
                className="inline-block p-2 bg-transparent hover:bg-industrial-orange transition-all duration-300 rounded text-white"
              >
                <img 
                  src={NeoIVLogo} 
                  alt="NeoIV Logo" 
                  className="h-6 w-25 object-contain scale-400 transform transition-transform" 
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};