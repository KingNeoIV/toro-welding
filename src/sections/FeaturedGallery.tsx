import work2 from '../assets/work2.jpg';
import marineWork from '../assets/slideShow/f9e178f6-4728-48ad-9f70-187d2dc5911f.jpg';
import work5 from '../assets/work5.jpg';
import work7 from '../assets/work7.jpg';
import work8 from '../assets/work8.jpg';
import backgroundPhoto from '../assets/bg-work.jpg';
import { SectionHeading } from '../components/SectionHeading';

/*
 * The cards in the "Featured Work" grid, in the order they appear.
 *   image: the photo (imported at the top of this file)
 *   title, desc: the text shown over the photo (the photo's alt text is built from these too)
 *   size: how wide the card is on desktop. "md:col-span-2" is twice as wide as "md:col-span-1".
 * To add a card: import a photo at the top, then add another { ... } entry below.
 */
const projects = [
  {
    image: work5,
    title: 'Structural Roofing',
    desc: 'Precision metal decking and joist installation for modular units.',
    size: 'md:col-span-2',
  },
  {
    image: work2,
    title: 'Container Mods',
    desc: 'Full structural modifications and reinforcement.',
    size: 'md:col-span-1',
  },
  {
    image: marineWork,
    title: 'Marine Welding',
    desc: 'Specialized fabrication for heavy industrial and marine equipment.',
    size: 'md:col-span-1',
  },
  {
    image: work7,
    title: 'Interior Framing',
    desc: 'Custom interior steel framing for industrial structures.',
    size: 'md:col-span-1',
  },
  {
    image: work8,
    title: 'Custom BBQ Pits',
    desc: 'Heavy-duty custom smokers built to industrial standards.',
    size: 'md:col-span-1',
  },
];

/**
 * FeaturedGallery
 * The "Work" section: a photo grid over a background photo that stays put while you scroll.
 * The navbar's Work link points at this section's id ("FeaturedGallery").
 */
export const FeaturedGallery = () => (
  <section id="FeaturedGallery" className="relative scroll-mt-24 overflow-hidden">
    {/* Background photo: it stays still while the page scrolls over it.
        To change it, swap the bg-work.jpg import above for another image.
        The photo stops a little short of the top and bottom edges, and the dark tint and edge
        fades are separate layers on top of it, so the photo can never show through as a thin
        bright line along the section edges on screens with fractional pixel scaling. */}
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 [clip-path:inset(16px_0_16px_0)]"
    >
      <img
        src={backgroundPhoto}
        alt=""
        loading="lazy"
        decoding="async"
        className="fixed inset-0 h-screen w-full object-cover"
      />
    </div>
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-industrial-dark/85" />
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-linear-to-t from-industrial-dark from-20% to-transparent"
    />
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-linear-to-b from-industrial-dark from-20% to-transparent"
    />

    {/* Section content, sitting above the background layers */}
    <div className="relative mx-auto max-w-7xl px-6 py-24">
    <SectionHeading
      title="Featured"
      accent="Work"
      subtitle="From industrial structures to custom backyard builds"
    />

    {/* Photo grid: one card per entry in the projects list above.
        Hovering a card slowly zooms the photo and stretches the orange bar. */}
    <div className="grid gap-4 md:grid-cols-2">
      {projects.map((project) => (
        <figure
          key={project.title}
          className={`group relative overflow-hidden bg-black shadow-xl shadow-black/50 ring-1 ring-white/10 ${project.size}`}
        >
          <img
            src={project.image}
            alt={`${project.title}: ${project.desc}`}
            loading="lazy"
            decoding="async"
            className="h-80 w-full object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none md:h-[28rem]"
          />

          <figcaption className="absolute inset-0 flex flex-col justify-end bg-linear-to-t from-black via-black/40 to-transparent p-6 md:p-8">
            <span className="mb-4 h-1 w-12 bg-industrial-orange transition-all duration-300 group-hover:w-24 motion-reduce:transition-none" />
            <h3 className="text-2xl font-bold uppercase tracking-wide">{project.title}</h3>
            <p className="mt-2 max-w-md text-gray-300">{project.desc}</p>
          </figcaption>
        </figure>
      ))}
    </div>
    </div>
  </section>
);
