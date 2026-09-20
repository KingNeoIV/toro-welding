import { Crosshair, MapPin, Route, ShieldCheck } from 'lucide-react';
import backgroundPhoto from '../assets/work3.jpg';
import { SectionHeading } from '../components/SectionHeading';

/*
 * DRAFT TEXT: the "Fully Insured" line is placeholder wording, and the heading
 * ("Why Toro Welding") is new. The other three lines reuse the site's existing wording.
 * To change the background photo, swap the import above for another image.
 */
// The four columns in the "Why Toro Welding" section: icon, title, and one line of text.
const pillars = [
  {
    icon: MapPin,
    title: 'Locally Owned',
    text: 'Locally owned and operated in Ingleside, TX.',
  },
  {
    icon: Route,
    title: 'Mobile Service',
    text: 'Mobile welding services serving the Coastal Bend.',
  },
  {
    icon: ShieldCheck,
    title: 'Fully Insured',
    text: 'Fully insured, so you can hire with confidence.',
  },
  {
    icon: Crosshair,
    title: 'High Precision',
    text: 'High-precision fabrication for Structural, Marine, and Industrial projects.',
  },
];

export const WhyToro = () => (
  <section id="about" className="relative scroll-mt-24 overflow-hidden bg-black px-6 py-24">
    {/* Background photo with a dark tint so the text stays readable */}
    <img
      src={backgroundPhoto}
      alt=""
      aria-hidden="true"
      loading="lazy"
      decoding="async"
      className="absolute inset-0 h-full w-full object-cover object-center"
    />
    <div className="absolute inset-0 bg-black/80" />
    <div className="absolute inset-0 bg-linear-to-b from-industrial-gray/40 via-transparent to-black/60" />

    <div className="relative z-10 mx-auto max-w-7xl">
      <SectionHeading title="Why" accent="Toro Welding" />

      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-0">
        {pillars.map((pillar, index) => (
          <div
            key={pillar.title}
            className={`flex flex-col items-center text-center lg:px-8 ${
              index > 0 ? 'lg:border-l lg:border-white/15' : ''
            }`}
          >
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border-2 border-industrial-orange text-industrial-orange">
              <pillar.icon size={34} />
            </div>
            <h3 className="mb-3 text-xl font-bold uppercase tracking-wide">{pillar.title}</h3>
            <p className="max-w-xs text-base leading-relaxed text-gray-300">{pillar.text}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
