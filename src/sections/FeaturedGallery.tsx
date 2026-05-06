import work2 from '../assets/work2.jpg';
import work3 from '../assets/work3.jpg';
import work5 from '../assets/work5.jpg';
import work7 from '../assets/work7.jpg';
import work8 from '../assets/work8.jpg';

export const FeaturedGallery = () => {
  const projects = [
    {
      image: work5,
      title: "Structural Roofing",
      desc: "Precision metal decking and joist installation for modular units.",
      size: "md:col-span-2"
    },
    {
      image: work2,
      title: "Container Mods",
      desc: "Full structural modifications and reinforcement.",
      size: "md:col-span-1"
    },
    {
      image: work3,
      title: "Marine Welding",
      desc: "Specialized fabrication for heavy industrial and marine equipment.",
      size: "md:col-span-1"
    },
    {
      image: work7,
      title: "Interior Framing",
      desc: "Custom interior steel framing for industrial structures.",
      size: "md:col-span-1"
    },
    {
      image: work8,
      title: "Custom BBQ Pits",
      desc: "Heavy-duty custom smokers built to industrial standards.",
      size: "md:col-span-1"
    }
  ];

  return (
    <section id="FeaturedGallery" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="mb-12">
        <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter">
          Featured <span className="text-industrial-orange">Work</span>
        </h2>
        <p className="text-gray-400 uppercase tracking-widest mt-2 text-sm font-bold">
          From industrial structures to custom backyard builds
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <div 
            key={index} 
            className={`relative group overflow-hidden border-l-4 border-industrial-orange ${project.size}`}
          >
            <img 
              src={project.image} 
              className="w-full h-125 object-cover transition-transform duration-700 group-hover:scale-110" 
              alt={project.title} 
            />
            {/* Updated to bg-linear-to-t per Tailwind canonical suggestion */}
            <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent p-10 flex flex-col justify-end">
              <h3 className="text-2xl font-black uppercase italic">{project.title}</h3>
              <p className="text-industrial-steel mt-2 max-w-md">{project.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};