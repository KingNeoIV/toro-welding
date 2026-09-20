interface SectionHeadingProps {
  title: string;
  accent: string;
  subtitle?: string;
  intro?: string;
  center?: boolean;
}

/**
 * SectionHeading
 * The heading pattern used by every section: white title, orange accent word,
 * a short orange bar, then an optional small subtitle and intro paragraph.
 */
export const SectionHeading = ({
  title,
  accent,
  subtitle,
  intro,
  center = false,
}: SectionHeadingProps) => (
  <div className={`mb-14 max-w-3xl ${center ? 'mx-auto text-center' : ''}`}>
    <h2 className="text-3xl font-bold uppercase tracking-wide md:text-5xl">
      {title} <span className="text-industrial-orange">{accent}</span>
    </h2>
    <div className={`mt-4 h-1.5 w-24 bg-industrial-orange ${center ? 'mx-auto' : ''}`} />
    {subtitle && (
      <p className="mt-6 text-sm font-bold uppercase tracking-widest text-gray-400">{subtitle}</p>
    )}
    {intro && <p className="mt-4 text-lg leading-relaxed text-gray-300">{intro}</p>}
  </div>
);
