import { Navbar } from './components/Navbar';
import { Home } from './sections/Home';
import { SocialSection } from './components/SocialSection';
import { Footer } from './components/Footer';

/**
 * App
 * The overall page layout, top to bottom: skip link, navbar, the main content, footer.
 * To add or reorder page sections, edit sections/Home.tsx (not this file).
 */
function App() {
  return (
    // Page wrapper: dark background, white text, the site font, and an orange highlight when text is selected
    <div className="min-h-screen bg-industrial-dark text-white font-sans selection:bg-industrial-orange">
      {/* Lets keyboard and screen-reader visitors jump past the menu */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-industrial-orange focus:px-6 focus:py-3 focus:text-sm focus:font-black focus:uppercase focus:tracking-widest focus:text-black"
      >
        Skip to main content
      </a>

      {/* Sticky menu bar at the top */}
      <Navbar />

      {/* Everything between the navbar and footer. The skip link above jumps here (tabIndex -1 lets it take keyboard focus). */}
      <main id="main" tabIndex={-1} className="outline-none">
        {/* Hero, Services, Why Toro, Work, Archive (see sections/Home.tsx) */}
        <Home />
        {/* Instagram feed */}
        <SocialSection />
      </main>

      {/* Contact info, social links, and legal links. Its id is "contact" (the navbar Contact link). */}
      <Footer />
    </div>
  );
}

export default App;