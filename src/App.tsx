import { Navbar } from './components/Navbar';
import { Home } from './sections/Home';
import { SocialSection } from './components/SocialSection';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-industrial-dark text-white font-sans selection:bg-industrial-orange">
      <Navbar />
      
      <main>
        <Home />
        <SocialSection />
      </main>

      <Footer />
    </div>
  );
}

export default App;