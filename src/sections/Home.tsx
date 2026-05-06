import { Hero } from './Hero';
import { Services } from './Services';
import { FeaturedGallery } from './FeaturedGallery';

export function Home() {
  return (
    <>
      <Hero />
      <Services />
      <FeaturedGallery />
    </>
  );
}