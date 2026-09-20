import { useState, type ReactNode } from 'react';
import { ArrowRight, Check, Construction, Flame, Pause, Phone, Play, Shield, Truck } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import structuralPhoto from '../assets/work6.jpg';
import mobilePhoto from '../assets/slideShow/eaee0505-749d-4171-8446-0499f56f9be2.jpg';
import industrialPhoto from '../assets/slideShow/ecc34ebf-07b3-441d-8952-3cac67d9b80f.jpg';
import customPhoto from '../assets/customBuilds.jpg';

/*
 * DRAFT TEXT: the intro paragraph and the "Materials" and "Processes" lists below
 * are placeholder wording. Confirm them with the owner before the site goes live.
 * Everything else comes from the site's existing wording.
 *
 * To change a service photo, swap the image import above.
 */
interface Service {
  id: string;
  number: string;
  icon: ReactNode;
  title: string;
  desc: string;
  points: string[];
  image: string;
  imageAlt: string;
}

// The four services. To change wording or a photo, edit its entry here (photos are imported at the top).
// "points" are the small tick-mark chips shown under the description.
const services: Service[] = [
  {
    id: 'structural',
    number: '01',
    icon: <Construction size={28} />,
    title: 'Structural',
    desc: 'Expert steel framing, modular container modifications, and metal decking for large-scale roofing projects.',
    points: ['Steel framing', 'Container modifications', 'Metal decking and roofing'],
    image: structuralPhoto,
    imageAlt: 'Crew installing metal roof decking on a steel frame',
  },
  {
    id: 'mobile',
    number: '02',
    icon: <Truck size={28} />,
    title: 'Mobile Ops',
    desc: 'Full-service mobile welding units equipped for on-site industrial repairs and structural installs.',
    points: ['On-site industrial repairs', 'Structural installs', 'Fully equipped mobile units'],
    image: mobilePhoto,
    imageAlt: 'Overhead view of a vessel deck being repaired on site, with a work truck and equipment alongside',
  },
  {
    id: 'industrial',
    number: '03',
    icon: <Shield size={28} />,
    title: 'Industrial',
    desc: 'Certified welding and facility maintenance with a safety-first approach for high-risk environments.',
    points: ['Certified welding', 'Facility maintenance', 'Safety-first on every job'],
    image: industrialPhoto,
    imageAlt: 'Welders in protective gear cutting and welding steel on a vessel deck',
  },
  {
    id: 'custom',
    number: '04',
    icon: <Flame size={28} />,
    title: 'Custom Builds',
    desc: 'Precision fabrication of custom industrial smokers, BBQ pits, and specialized modular steel units.',
    points: ['Industrial smokers', 'BBQ pits', 'Modular steel units'],
    image: customPhoto,
    imageAlt: 'A custom steel-frame metal carport built over a fenced yard beside a house',
  },
];

// Words that scroll across the "Project Types" strip.
const projectTypes = [
  'Structural Steel Framing',
  'Container Modifications',
  'Metal Decking & Roofing',
  'Marine & Industrial Fabrication',
  'On-Site Repairs',
  'Custom BBQ Pits & Smokers',
];

// The "Materials" and "Processes" tag boxes near the bottom of the section.
const specs = [
  { title: 'Materials', items: ['Carbon Steel', 'Stainless Steel', 'Aluminum'] },
  {
    title: 'Processes',
    items: ['Stick (SMAW)', 'MIG (GMAW)', 'TIG (GTAW)', 'Flux-Cored (FCAW)'],
  },
];

/** The text and call button for one service. Used on phones (under each row) and on desktop (over the photo). */
const ServiceDetails = ({ service }: { service: Service }) => (
  <div key={service.id} className="animate-panel-in motion-reduce:animate-none">
    <div className="flex items-center gap-4">
      <div className="flex h-14 w-14 shrink-0 items-center justify-center border border-industrial-orange/50 bg-industrial-orange/15 text-industrial-orange">
        {service.icon}
      </div>
      <h3 className="text-3xl font-bold uppercase tracking-wide">{service.title}</h3>
    </div>

    <p className="mt-5 max-w-xl text-base leading-relaxed text-gray-200 md:text-lg">
      {service.desc}
    </p>

    <ul className="mt-6 flex flex-wrap gap-2">
      {service.points.map((point) => (
        <li
          key={point}
          className="flex items-center gap-2 border border-white/20 bg-black/40 px-3 py-2 text-sm font-semibold text-gray-100 backdrop-blur-sm"
        >
          <Check size={14} className="shrink-0 text-industrial-orange" />
          {point}
        </li>
      ))}
    </ul>

    <a
      href="tel:3612221930"
      className="mt-8 inline-flex items-center gap-3 bg-industrial-orange px-7 py-3.5 text-sm font-black uppercase tracking-widest text-black transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
    >
      <Phone size={18} />
      Call for a quote
    </a>
  </div>
);

export const Services = () => {
  // Which service is selected (0 = the first one, Structural).
  const [active, setActive] = useState(0);
  // True when the visitor has paused the scrolling Project Types strip.
  const [stripPaused, setStripPaused] = useState(false);

  return (
    <section
      id="services"
      className="relative scroll-mt-24 overflow-hidden bg-industrial-dark px-6 py-24"
    >
      {/* Faint blueprint grid behind the section */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 [background-image:linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] [-webkit-mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)]"
      />

      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          title="Industrial"
          accent="Capabilities"
          subtitle="High-performance welding solutions for the Coastal Bend"
          intro="Whether it's a structural install, an on-site repair, or a one-of-a-kind build, we bring the right equipment and experience to get the job done right."
        />

        {/* Service picker: a list on the left, the selected service over a photo on the right.
            On phones the details open right under the row you tap. */}
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <div className="flex h-full flex-col border-t border-white/10">
              {services.map((service, index) => {
                const isActive = index === active;
                return (
                  <div key={service.id} className="border-b border-white/10 lg:flex lg:flex-1 lg:flex-col">
                    <button
                      type="button"
                      onClick={() => setActive(index)}
                      aria-expanded={isActive}
                      aria-controls={`service-panel-${service.id}`}
                      className={`group flex w-full items-center gap-5 border-l-4 px-5 py-6 text-left lg:flex-1 transition-colors focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-white motion-reduce:transition-none ${
                        isActive
                          ? 'border-industrial-orange bg-white/5'
                          : 'border-transparent hover:bg-white/[0.03]'
                      }`}
                    >
                      <span
                        className={`text-sm font-black tracking-widest ${
                          isActive ? 'text-industrial-orange' : 'text-gray-400'
                        }`}
                      >
                        {service.number}
                      </span>
                      <span
                        className={`text-2xl font-bold uppercase tracking-wide transition-colors motion-reduce:transition-none md:text-3xl ${
                          isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-200'
                        }`}
                      >
                        {service.title}
                      </span>
                      <ArrowRight
                        size={24}
                        className={`ml-auto shrink-0 transition-all motion-reduce:transition-none ${
                          isActive
                            ? 'translate-x-0 text-industrial-orange'
                            : '-translate-x-2 text-gray-500 group-hover:translate-x-0 group-hover:text-gray-300'
                        } max-lg:rotate-90`}
                      />
                    </button>

                    {/* Phones and tablets: details under the row */}
                    {isActive && (
                      <div id={`service-panel-${service.id}`} className="pb-8 lg:hidden">
                        <img
                          src={service.image}
                          alt={service.imageAlt}
                          loading="lazy"
                          decoding="async"
                          className="mb-6 aspect-[4/3] w-full object-cover ring-1 ring-white/10"
                        />
                        <div className="px-1">
                          <ServiceDetails service={service} />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Desktop: the selected service over a photo. All photos stay loaded and fade into each other. */}
          <div
            aria-live="polite"
            className="relative hidden min-h-[34rem] overflow-hidden bg-black shadow-2xl shadow-black/50 ring-1 ring-white/10 lg:col-span-7 lg:block"
          >
            {services.map((service, index) => (
              <img
                key={service.id}
                src={service.image}
                alt={index === active ? service.imageAlt : ''}
                aria-hidden={index !== active}
                loading="lazy"
                decoding="async"
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 motion-reduce:transition-none ${
                  index === active ? 'opacity-100' : 'opacity-0'
                }`}
              />
            ))}
            <div className="absolute inset-0 bg-linear-to-t from-black via-black/60 to-black/10" />
            <div className="absolute inset-x-0 top-0 h-1 bg-industrial-orange" />

            <span
              aria-hidden="true"
              className="absolute right-8 top-6 text-8xl font-black leading-none text-transparent [-webkit-text-stroke:2px_rgba(255,255,255,0.4)]"
            >
              {services[active].number}
            </span>

            <div className="absolute inset-x-0 bottom-0 p-10">
              <ServiceDetails service={services[active]} />
            </div>
          </div>
        </div>

        {/* Project types: a slowly scrolling strip (a plain wrapped list if motion is turned off) */}
        <div className="mt-24">
          <div className="mb-6 flex items-center justify-between gap-4">
            <h3 className="text-sm font-black uppercase tracking-[0.25em] text-industrial-orange">
              Project Types
            </h3>
            {/* Lets visitors stop the scrolling strip (hidden when motion is turned off) */}
            <button
              type="button"
              onClick={() => setStripPaused((paused) => !paused)}
              className="flex items-center gap-2 border border-white/25 px-3 py-2 text-xs font-bold uppercase tracking-widest text-gray-200 transition-colors hover:border-industrial-orange hover:text-industrial-orange motion-reduce:hidden"
            >
              {stripPaused ? <Play size={14} fill="currentColor" /> : <Pause size={14} fill="currentColor" />}
              {stripPaused ? 'Play scrolling' : 'Pause scrolling'}
            </button>
          </div>
          <div className="group overflow-hidden border-y border-white/10 py-6 [-webkit-mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] motion-reduce:[-webkit-mask-image:none] motion-reduce:[mask-image:none]">
            <div
              className={`flex w-max animate-marquee group-hover:[animation-play-state:paused] motion-reduce:w-auto motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:gap-y-3 ${
                stripPaused ? '[animation-play-state:paused]' : ''
              }`}
            >
              {[0, 1].map((copy) => (
                <ul
                  key={copy}
                  aria-hidden={copy === 1}
                  className={`flex shrink-0 items-center ${
                    copy === 1 ? 'motion-reduce:hidden' : 'motion-reduce:flex-wrap'
                  }`}
                >
                  {projectTypes.map((type) => (
                    <li
                      key={type}
                      className="flex items-center text-xl font-bold uppercase tracking-wide text-gray-200 md:text-3xl"
                    >
                      <span className="whitespace-nowrap px-6 md:px-10">{type}</span>
                      <span
                        aria-hidden="true"
                        className="h-2.5 w-2.5 rotate-45 bg-industrial-orange"
                      />
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        </div>

        {/* Materials and processes as tags */}
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {specs.map((spec) => (
            <div key={spec.title} className="border border-white/10 bg-industrial-gray/30 p-8">
              <h3 className="mb-5 text-sm font-black uppercase tracking-[0.25em] text-industrial-orange">
                {spec.title}
              </h3>
              <ul className="flex flex-wrap gap-3">
                {spec.items.map((item) => (
                  <li
                    key={item}
                    className="border border-white/20 px-4 py-2 text-base font-semibold text-gray-100"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
