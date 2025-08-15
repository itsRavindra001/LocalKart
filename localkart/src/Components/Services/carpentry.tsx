import React from 'react';
import { Hammer, HardHat, Ruler, ShieldCheck, Home, CheckCircle } from 'lucide-react';
import ServicePageLayout from '../ServicePageLayout';

const Carpentry = () => {
  const carpentryImages = [
    'https://images.pexels.com/photos/313776/pexels-photo-313776.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    'https://img.freepik.com/free-photo/close-up-male-carpenter-sanding-furniture-with-power-tool-workbench_23-2147944825.jpg?semt=ais_hybrid&w=740',
    'https://img.freepik.com/free-photo/portrait-male-carpenter-holding-wooden-plank-workbench-workshop_23-2147944921.jpg?semt=ais_hybrid&w=740',
    'https://www.shutterstock.com/image-photo/young-carpenter-sanding-wood-piece-260nw-2361923721.jpg',
  ];

  const projectImages = [
  'https://images.unsplash.com/photo-1605792657660-596af9009e82?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1600585152220-90363fe7e115?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1600210492493-0946911123ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1602872030490-4a484a7b3ba6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
];
  // Enhanced features with icons
  const features = [
    { icon: <Hammer className="w-6 h-6 text-amber-600" />, text: 'Custom furniture design & fabrication' },
    { icon: <Home className="w-6 h-6 text-amber-600" />, text: 'Precision door/window installation' },
    { icon: <Ruler className="w-6 h-6 text-amber-600" />, text: 'Wood polishing & restoration services' },
    { icon: <HardHat className="w-6 h-6 text-amber-600" />, text: 'Built-in wardrobes & cabinet fitting' },
    { icon: <ShieldCheck className="w-6 h-6 text-amber-600" />, text: '5-year craftsmanship warranty' },
    { icon: <CheckCircle className="w-6 h-6 text-amber-600" />, text: 'Free consultation & estimates' }
  ];

  return (
    <ServicePageLayout
      title="Master Carpentry Services"
      description="Bespoke woodworking solutions crafted with precision and traditional joinery techniques"
      images={carpentryImages}
      features={features.map(f => f.text)}
      serviceType="carpentry"
      additionalContent={
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Service Process */}
          <div className="bg-white rounded-xl shadow-md p-8 mb-12">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Our Carpentry Process</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Ruler className="w-10 h-10 text-amber-600 mx-auto" />,
                  title: "Consultation",
                  desc: "Detailed discussion of your woodworking needs"
                },
                {
                  icon: <Hammer className="w-10 h-10 text-amber-600 mx-auto" />,
                  title: "Material Selection",
                  desc: "Choosing premium woods and finishes"
                },
                {
                  icon: <HardHat className="w-10 h-10 text-amber-600 mx-auto" />,
                  title: "Precision Crafting",
                  desc: "Traditional joinery and modern techniques"
                }
              ].map((step, index) => (
                <div key={index} className="text-center p-6 hover:bg-amber-50 rounded-lg transition">
                  <div className="flex justify-center mb-4">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Wood Types Section */}
          <div className="bg-amber-50 rounded-xl p-8 mb-12">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Premium Materials We Work With</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[
                { name: "Teak Wood", desc: "Durable & weather-resistant" },
                { name: "Oak", desc: "Classic strength & grain" },
                { name: "Mahogany", desc: "Rich, luxurious finish" },
                { name: "Maple", desc: "Light-colored & versatile" },
                { name: "Cherry", desc: "Warm tones that deepen with age" },
                { name: "Walnut", desc: "Dark, elegant appearance" },
                { name: "Pine", desc: "Economical & paintable" },
                { name: "Bamboo", desc: "Sustainable & modern" }
              ].map((wood, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-sm text-center hover:shadow-md transition">
                  <h3 className="font-bold text-amber-700 mb-1">{wood.name}</h3>
                  <p className="text-sm text-gray-600">{wood.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Project Gallery */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Our Carpentry Projects</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {projectImages.map((img, index) => (
                <div key={index} className="aspect-square overflow-hidden rounded-lg">
                  <img 
                    src={img}
                    alt={`Carpentry project ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Testimonial */}
          <div className="bg-gradient-to-r from-amber-600 to-amber-800 text-white rounded-xl p-8 text-center">
            <blockquote className="text-xl italic mb-4">
              "The custom bookshelf they built exceeded our expectations. The craftsmanship is impeccable and it's the centerpiece of our living room now."
            </blockquote>
            <div className="font-semibold">— Robert & Sarah, Homeowners</div>
          </div>
        </div>
      }
    />
  );
};

export default Carpentry;