import { Hero } from './Hero';
import { Services } from './Services';
import { WhyToro } from './WhyToro';
import { CtaBand } from '../components/CtaBand';
import { FeaturedGallery } from './FeaturedGallery';
import { ProjectSlideshow } from './ProjectSlideshow';

/**
 * Home
 * The home page: every section in the order it appears, top to bottom.
 * To reorder sections, move the lines below. To add one, create it in src/sections/ and add it here.
 * Section ids the navbar links point at: Hero = "home", Services = "services",
 * FeaturedGallery = "FeaturedGallery" (Work), ProjectSlideshow = "archive". The footer is "contact".
 */
export function Home() {
  return (
    <>
      <Hero />
      <Services />
      <WhyToro />
      <CtaBand />
      <FeaturedGallery />
      <ProjectSlideshow />
    </>
  );
}