import toroweldingLogo from '../assets/toroweldingLogo.png';
import NeoIVLogo from '../assets/NeoIVLogo-crop.png';
import instagramLogo from '../assets/instagram.png';
import facebookLogo from '../assets/facebook.png';
import contactBackground from '../assets/ingleside-tx.jpg';
import { Phone, Mail, MapPin, Clock, User } from 'lucide-react';

// Small orange heading with a short bar beneath it, used above each footer column.
const FooterHeading = ({ children }: { children: string }) => (
  <div className="mb-6">
    <h2 className="text-sm font-black uppercase tracking-[0.25em] text-industrial-orange">
      {children}
    </h2>
    <div className="mx-auto mt-3 h-1 w-12 bg-industrial-orange md:mx-0" />
  </div>
);

// Shared styling for the square Instagram and Facebook buttons.
const socialLinkClass =
  'flex h-12 w-12 items-center justify-center border border-white/20 transition-colors hover:border-industrial-orange hover:bg-industrial-orange/20 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white';

const socialIconClass =
  'h-7 w-7 rounded object-contain';

/**
 * Footer
 * The contact section at the bottom (id "contact"): logo and blurb, contact details, social links,
 * and a bottom bar with copyright, legal links, and the developer credit.
 * Phone numbers and email here are real links (tel: and mailto:), so they work with one tap.
 */
export const Footer = () => {
  return (
    <footer
      id="contact"
      className="relative scroll-mt-24 overflow-hidden border-t border-industrial-orange/30 bg-black"
    >
      {/* Background photo of the Ingleside water tower.
          Phones and tablets: the photo is a banner across the top (the text starts below it)
          and fades into black at the bottom.
          Wide screens (xl): the whole photo sits on the right and fades into black on the left.
          The right-hand third of the grid below is left empty on purpose, so no text
          sits on top of the tower and its logo. */}
      <img
        src={contactBackground}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className="absolute inset-x-0 top-0 h-[58vw] w-full max-w-none object-cover object-[50%_20%] [-webkit-mask-image:linear-gradient(to_bottom,black_60%,transparent)] [mask-image:linear-gradient(to_bottom,black_60%,transparent)] md:h-80 md:object-[50%_15%] xl:inset-x-auto xl:right-0 xl:h-full xl:w-auto xl:[-webkit-mask-image:linear-gradient(to_right,transparent_15%,black_60%)] xl:[mask-image:linear-gradient(to_right,transparent_15%,black_60%)]"
      />
      <div className="absolute inset-0 bg-linear-to-b from-black/20 via-transparent to-black/60" />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 pb-20 pt-[58vw] text-center md:grid-cols-3 md:pt-80 md:text-left xl:grid-cols-[1fr_1fr_0.9fr] xl:py-20">
        {/* Column: logo and short blurb */}
        <div>
          <img
            src={toroweldingLogo}
            alt="Toro Welding & Fabrication logo"
            className="mx-auto mb-6 h-32 w-auto rounded md:mx-0"
          />
          <p className="leading-relaxed text-gray-400">
            Serving Ingleside and surrounding areas with professional welding and fabrication
            services. Mobile, Insured, and Ready.
          </p>
        </div>

        {/* Column: owner, phone, email, and location */}
        <div className="xl:col-start-2 xl:row-span-2 xl:row-start-1">
          <FooterHeading>Contact Info</FooterHeading>

          <ul className="space-y-4">
            <li className="flex items-center justify-center gap-3 border-b border-white/10 pb-4 md:justify-start">
              <User className="shrink-0 text-industrial-orange" size={20} />
              <span className="font-bold tracking-wide">Owner: Gabino Torres II</span>
            </li>

            <li className="flex items-center justify-center gap-3 md:justify-start">
              <Phone className="shrink-0 text-industrial-orange" size={20} />
              <a
                href="tel:3612221930"
                className="text-xl font-bold transition-colors hover:text-industrial-orange"
              >
                (361) 222-1930
              </a>
            </li>

            <li className="flex items-center justify-center gap-3 md:justify-start">
              <Mail className="shrink-0 text-industrial-orange" size={20} />
              <a
                href="mailto:torowelding@yahoo.com"
                className="text-gray-300 transition-colors hover:text-industrial-orange"
              >
                torowelding@yahoo.com
              </a>
            </li>

            <li className="flex items-center justify-center gap-3 text-gray-300 md:justify-start">
              <MapPin className="shrink-0 text-industrial-orange" size={20} />
              <span>Ingleside, TX</span>
            </li>

            {/* Business hours. Keep in sync with the "openingHoursSpecification" in index.html. */}
            <li className="flex items-center justify-center gap-3 text-gray-300 md:justify-start">
              <Clock className="shrink-0 text-industrial-orange" size={20} />
              <span>Mon to Fri, 7am to 5pm</span>
            </li>
          </ul>
        </div>

        {/* Column: Instagram and Facebook buttons */}
        <div className="xl:col-start-1 xl:row-start-2">
          <FooterHeading>Follow the work</FooterHeading>

          <div className="flex justify-center gap-4 md:justify-start">
            <a
              href="https://www.instagram.com/torowelding2024/"
              target="_blank"
              rel="noreferrer"
              aria-label="Toro Welding on Instagram"
              className={socialLinkClass}
            >
              <img src={instagramLogo} alt="" className={socialIconClass} />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61560516488673"
              target="_blank"
              rel="noreferrer"
              aria-label="Toro Welding on Facebook"
              className={socialLinkClass}
            >
              <img src={facebookLogo} alt="" className={socialIconClass} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar: copyright and developer credit */}
      <div className="relative border-t border-white/10 bg-black/70">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 text-xs uppercase tracking-widest text-gray-400 md:flex-row">
          <div className="flex flex-col items-center gap-3 md:flex-row md:gap-8">
            <p>&copy; {new Date().getFullYear()} Toro Welding &amp; Fabrication</p>
            <nav aria-label="Legal" className="flex gap-6">
              <a href="/privacy.html" className="transition-colors hover:text-white">
                Privacy Policy
              </a>
              <a href="/accessibility.html" className="transition-colors hover:text-white">
                Accessibility
              </a>
            </nav>
          </div>

          <a
            href="https://kingneoiv.github.io/"
            target="_blank"
            rel="noreferrer"
            title="Built by NeoIV Tech Solutions"
            className="flex items-center gap-3 transition-colors hover:text-white"
          >
            Developed by NeoIV Tech Solutions
            <img src={NeoIVLogo} alt="NeoIV Tech Solutions logo" className="h-8 w-auto" />
          </a>
        </div>
      </div>
    </footer>
  );
};
