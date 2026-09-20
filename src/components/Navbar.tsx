import { useEffect, useState } from 'react';
import { Menu, Phone, X } from 'lucide-react';
import toroweldingLogo from '../assets/toroweldingLogo.png';

// Each link points at the id of a section on the page.
// To add a menu link: add an entry here and give that section a matching id.
const links = [
  { label: 'Home', id: 'home' },
  { label: 'Services', id: 'services' },
  { label: 'Work', id: 'FeaturedGallery' },
  { label: 'Archive', id: 'archive' },
  { label: 'Contact', id: 'contact' },
];

/**
 * Navbar
 * The sticky menu bar: logo, section links, and a call button.
 * On phones the links move into a dropdown opened by the menu (hamburger) button.
 */
export const Navbar = () => {
  // Whether the phone dropdown menu is open.
  const [menuOpen, setMenuOpen] = useState(false);
  // The id of the section currently on screen. Its link is highlighted.
  const [activeId, setActiveId] = useState('home');

  // Used by the menu links so the dropdown closes after you tap one.
  const closeMenu = () => setMenuOpen(false);

  // Let visitors close the mobile menu with the Escape key.
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  // Highlight the link for whichever section is near the top of the screen.
  // At the very bottom of the page, Contact (the footer) is highlighted.
  useEffect(() => {
    const updateActive = () => {
      const line = window.innerHeight * 0.4;
      let current = links[0].id;

      links.forEach((link) => {
        const section = document.getElementById(link.id);
        if (section && section.getBoundingClientRect().top <= line) {
          current = link.id;
        }
      });

      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (atBottom) current = 'contact';

      setActiveId(current);
    };

    updateActive();
    window.addEventListener('scroll', updateActive, { passive: true });
    window.addEventListener('resize', updateActive);
    return () => {
      window.removeEventListener('scroll', updateActive);
      window.removeEventListener('resize', updateActive);
    };
  }, []);

  // Styling for the desktop links: the active one is white with an orange line beneath it.
  const desktopLinkClass = (id: string) =>
    `border-b-2 py-1 text-sm font-bold uppercase tracking-widest transition-colors ${
      activeId === id
        ? 'border-industrial-orange text-white'
        : 'border-transparent text-gray-300 hover:text-industrial-orange'
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-industrial-dark/80 backdrop-blur-md">
      <nav
        aria-label="Main"
        className="relative mx-auto flex h-22 max-w-7xl items-center justify-between px-4 md:px-6"
      >
        {/* Menu button: phones only */}
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          className="-ml-2 p-2 text-white transition-colors hover:text-industrial-orange focus-visible:outline-2 focus-visible:outline-industrial-orange md:hidden"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Logo: centered on phones, on the left on larger screens */}
        <a
          href="#home"
          onClick={closeMenu}
          aria-label="Toro Welding, back to top"
          className="absolute left-1/2 flex -translate-x-1/2 items-center gap-3 md:static md:translate-x-0"
        >
          <img src={toroweldingLogo} alt="Toro Welding logo" className="h-14 w-auto rounded" />
          <span className="hidden text-xl font-bold uppercase tracking-wide lg:block">
            Toro Welding
          </span>
        </a>

        {/* Section links: larger screens only */}
        <ul className="hidden items-center gap-6 md:flex lg:gap-8">
          {links.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                aria-current={activeId === link.id ? 'true' : undefined}
                className={desktopLinkClass(link.id)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Phone button: icon only on small phones, number from sm and up */}
        <a
          href="tel:3612221930"
          aria-label="Call Toro Welding at (361) 222-1930"
          className="group flex items-center gap-2 rounded bg-industrial-orange px-3 py-2 font-black text-black transition-colors hover:bg-white sm:px-4"
        >
          <Phone size={18} className="group-hover:animate-bounce motion-reduce:animate-none" />
          <span className="hidden text-sm sm:inline md:text-base">(361) 222-1930</span>
        </a>
      </nav>

      {/* Dropdown menu: phones only */}
      {menuOpen && (
        <div id="mobile-menu" className="border-t border-white/10 bg-industrial-dark md:hidden">
          <ul>
            {links.map((link) => (
              <li key={link.id} className="border-b border-white/5">
                <a
                  href={`#${link.id}`}
                  onClick={closeMenu}
                  aria-current={activeId === link.id ? 'true' : undefined}
                  className={`block px-6 py-4 text-base font-bold uppercase tracking-widest transition-colors ${
                    activeId === link.id
                      ? 'border-l-4 border-industrial-orange bg-white/5 text-industrial-orange'
                      : 'text-gray-200 hover:text-industrial-orange'
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="p-4">
            <a
              href="tel:3612221930"
              onClick={closeMenu}
              className="flex items-center justify-center gap-3 bg-industrial-orange px-6 py-4 text-base font-black uppercase tracking-widest text-black transition-colors hover:bg-white"
            >
              <Phone size={20} />
              Call (361) 222-1930
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
