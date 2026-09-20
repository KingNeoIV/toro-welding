import type { ReactNode } from 'react';
import { ArrowRight, Check } from 'lucide-react';

interface ServiceCardProps {
  number: string;
  icon: ReactNode;
  title: string;
  desc: string;
  points: string[];
}

/**
 * ServiceCard
 * NOTE: not used anywhere right now. Services.tsx replaced these cards with the picker layout.
 * Kept in case you want the card design back; safe to delete.
 *
 * One service: number, icon, title, description, a short list of what it covers,
 * and a call-for-a-quote link.
 */
export function ServiceCard({ number, icon, title, desc, points }: ServiceCardProps) {
  return (
    <article className="group relative flex flex-col overflow-hidden border border-white/10 bg-industrial-dark/70 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-industrial-orange/50 motion-reduce:transition-none motion-reduce:hover:translate-y-0">
      {/* Orange line that slides in across the top on hover */}
      <div className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-industrial-orange transition-transform duration-300 group-hover:scale-x-100 motion-reduce:scale-x-100 motion-reduce:transition-none" />

      <div className="mb-8 flex items-start justify-between">
        <div className="flex h-14 w-14 items-center justify-center border border-industrial-orange/40 bg-industrial-orange/10 text-industrial-orange">
          {icon}
        </div>
        <span
          aria-hidden="true"
          className="text-5xl font-black leading-none text-white/10 transition-colors group-hover:text-industrial-orange/30"
        >
          {number}
        </span>
      </div>

      <h3 className="mb-3 text-2xl font-bold uppercase tracking-wide">{title}</h3>

      <p className="text-sm leading-relaxed text-gray-400">{desc}</p>

      <ul className="mt-6 space-y-3 border-t border-white/10 pt-6">
        {points.map((point) => (
          <li key={point} className="flex items-start gap-3 text-sm text-gray-200">
            <Check size={16} className="mt-0.5 shrink-0 text-industrial-orange" />
            <span>{point}</span>
          </li>
        ))}
      </ul>

      <a
        href="tel:3612221930"
        className="mt-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-industrial-orange transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white lg:mt-auto lg:pt-8"
      >
        Call for a quote
        <ArrowRight size={16} className="transition-transform group-hover:translate-x-1 motion-reduce:transition-none" />
      </a>
    </article>
  );
}
