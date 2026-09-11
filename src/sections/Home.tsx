import { Hero } from './Hero';
import { Services } from './Services';
import { FeaturedGallery } from './FeaturedGallery';
import { ProjectSlideshow } from './ProjectSlideshow';

export function Home() {
  return (
    <>
      <Hero />
      <Services />
      <FeaturedGallery />
      <ProjectSlideshow />
    </>
  );
}