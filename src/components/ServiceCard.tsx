import type { ReactNode } from 'react';

// Defining an Interface for the props ensures type safety
interface ServiceCardProps {
  icon: ReactNode;
  title: string;
  desc: string;
}

/**
 * ServiceCard Component
 * A modular UI piece for displaying business services with an industrial aesthetic.
 */
export function ServiceCard({ icon, title, desc }: ServiceCardProps) {
  return (
    <div className="bg-industrial-gray/40 p-10 hover:bg-industrial-gray/60 transition-all border border-white/5 flex flex-col items-center text-center group">
      {/* Icon with a hover scaling effect */}
      <div className="text-industrial-orange mb-6 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      
      {/* Title using the industrial italic uppercase style */}
      <h3 className="text-xl font-bold uppercase italic tracking-tighter mb-4">
        {title}
      </h3>
      
      {/* Description with high-readability text color */}
      <p className="text-gray-400 text-sm leading-relaxed">
        {desc}
      </p>
    </div>
  );
}