import { Construction, Truck, Shield, Flame } from 'lucide-react';
import { ServiceCard } from '../components/ServiceCard';

export const Services = () => (
  <section className="py-24 bg-industrial-gray/30 px-6">
    <div className="max-w-7xl mx-auto">
      <div className="mb-16">
        <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter">
          Industrial <span className="text-industrial-orange">Capabilities</span>
        </h2>
        <div className="h-1.5 w-24 bg-industrial-orange mt-4" />
        <p className="text-gray-400 uppercase tracking-widest mt-6 text-sm font-bold">
          High-performance welding solutions for the Coastal Bend
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <ServiceCard 
          icon={<Construction size={32} className="text-industrial-orange" />} 
          title="Structural" 
          desc="Expert steel framing, modular container modifications, and metal decking for large-scale roofing projects." 
        />
        <ServiceCard 
          icon={<Truck size={32} className="text-industrial-orange" />} 
          title="Mobile Ops" 
          desc="Full-service mobile welding units equipped for on-site industrial repairs and structural installs." 
        />
        <ServiceCard 
          icon={<Shield size={32} className="text-industrial-orange" />} 
          title="Industrial" 
          desc="Certified welding and facility maintenance with a safety-first approach for high-risk environments." 
        />
        <ServiceCard 
          icon={<Flame size={32} className="text-industrial-orange" />} 
          title="Custom Builds" 
          desc="Precision fabrication of custom industrial smokers, BBQ pits, and specialized modular steel units." 
        />
      </div>
    </div>
  </section>
);