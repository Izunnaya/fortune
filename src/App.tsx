import { useState, useCallback } from 'react';
import { useLenis } from './hooks/useLenis';
import Preloader from './sections/Preloader';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import TrustBar from './sections/TrustBar';
import About from './sections/About';
import Services from './sections/Services';
import Process from './sections/Process';
import Portfolio from './sections/Portfolio';
import Booking from './sections/Booking';
import Footer from './sections/Footer';

function App() {
  const [preloaderDone, setPreloaderDone] = useState(false);
  useLenis();

  const handlePreloaderComplete = useCallback(() => {
    setPreloaderDone(true);
  }, []);

  return (
    <div className="bg-charcoal">
      <a href="#main-content" className="skip-link">Skip to main content</a>
      {!preloaderDone && <Preloader onComplete={handlePreloaderComplete} />}
      <Navigation />
      <main id="main-content">
        <Hero />
        <TrustBar />
        <About />
        <Services />
        <Process />
        <Portfolio />
        <Booking />
      </main>
      <Footer />
    </div>
  );
}

export default App;
