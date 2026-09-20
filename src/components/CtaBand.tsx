import { Phone } from 'lucide-react';

/**
 * CtaBand
 * A bold orange strip with a short promise and a call button.
 * Wording comes from the footer's existing text.
 */
export const CtaBand = () => (
  <section className="bg-industrial-orange text-black">
    <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-6 py-12 text-center md:flex-row md:text-left">
      <div>
        <h2 className="text-3xl font-bold uppercase tracking-wide md:text-4xl">
          Mobile, Insured, and Ready.
        </h2>
        <p className="mt-2 max-w-2xl text-base font-semibold md:text-lg">
          Serving Ingleside and surrounding areas with professional welding and fabrication
          services.
        </p>
      </div>

      <a
        href="tel:3612221930"
        className="inline-flex w-full shrink-0 items-center justify-center gap-3 bg-black px-10 py-4 text-base font-black uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-black focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black md:w-auto"
      >
        <Phone size={20} />
        Call (361) 222-1930
      </a>
    </div>
  </section>
);
