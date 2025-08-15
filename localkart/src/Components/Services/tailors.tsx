import React from 'react';
import { Scissors, Ruler, Shirt, Truck, CalendarCheck, CheckCircle } from 'lucide-react';
import ServicePageLayout from '../ServicePageLayout';

const Tailors = () => {
  const tailorsImages = [
    'https://cdn.pixabay.com/photo/2022/03/13/01/41/tailoring-7065117_640.jpg',
    'https://img.freepik.com/premium-photo/young-man-tailor-working-new-clothing_85869-8158.jpg?semt=ais_hybrid',
    'https://img.freepik.com/premium-photo/tailor-sewing-jacket-closeup_236854-8031.jpg?semt=ais_hybrid&w=740',
    'https://media.gettyimages.com/id/1072509440/photo/male-tailor-cutting-a-textile-at-workbench.jpg?s=612x612&w=0&k=20&c=hwODCZMAUgmcZ_iB_9VrtMwJbBmlPxNZj4_rLqHlLi8=',
  ];

  const features = [
    { icon: <Shirt size={20} className="text-blue-600" />, text: 'Custom stitching for all garments' },
    { icon: <Scissors size={20} className="text-blue-600" />, text: 'Precision alterations' },
    { icon: <Ruler size={20} className="text-blue-600" />, text: 'Wedding & formal wear specialists' },
    { icon: <Truck size={20} className="text-blue-600" />, text: 'Free pickup & delivery' }
  ];

  return (
    <ServicePageLayout
      title="Master Tailoring Services"
      description="Bespoke clothing alterations and custom creations by experienced artisans"
      images={tailorsImages}
      features={features.map(f => f.text)}
      serviceType="tailoring"
      additionalContent={
        <>
          {/* --- Tailoring Process Timeline --- */}
          <section className="bg-white py-12 px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-center mb-8 text-gray-800 border-b pb-2">
                Our Tailoring Process
              </h2>
              <div className="relative">
                <div className="hidden md:block absolute left-1/2 h-full w-0.5 bg-blue-200 -translate-x-1/2"></div>

                {[
                  { icon: <CalendarCheck size={24} className="text-blue-600" />, title: "Consultation", desc: "Discuss your needs and timeline" },
                  { icon: <Ruler size={24} className="text-blue-600" />, title: "Precise Measurements", desc: "Detailed body measurements taken" },
                  { icon: <Scissors size={24} className="text-blue-600" />, title: "Expert Crafting", desc: "Hand-tailored by master artisans" },
                  { icon: <CheckCircle size={24} className="text-blue-600" />, title: "Final Fitting", desc: "Perfect fit guaranteed" }
                ].map((step, index) => (
                  <div key={index} className={`relative mb-8 md:flex ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    <div className="md:w-1/2 p-4">
                      <div className="bg-blue-50 rounded-lg p-6 h-full shadow hover:shadow-md transition-shadow">
                        <div className="flex items-center mb-2">
                          <div className="bg-blue-100 p-2 rounded-full mr-3">{step.icon}</div>
                          <h3 className="text-lg font-semibold">{step.title}</h3>
                        </div>
                        <p className="text-gray-600 pl-11">{step.desc}</p>
                      </div>
                    </div>
                    <div className="hidden md:block md:w-1/2"></div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* --- Materials Section --- */}
          <section className="bg-gray-50 py-12 px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">
                Premium Materials We Use
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { name: "Italian Wool", desc: "Luxury fabrics for suits and coats" },
                  { name: "Egyptian Cotton", desc: "Premium shirting materials" },
                  { name: "Silk Blends", desc: "For elegant formal wear" }
                ].map((material, index) => (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-transform transform hover:scale-105">
                    <h3 className="font-bold text-lg mb-2 text-blue-700">{material.name}</h3>
                    <p className="text-gray-600">{material.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* --- Testimonial Section --- */}
          <section className="bg-blue-700 text-white py-12 px-4">
            <div className="max-w-3xl mx-auto text-center">
              <blockquote className="text-xl italic mb-4">
                "The attention to detail on my wedding suit was extraordinary. I've never had clothing fit so perfectly before."
              </blockquote>
              <div className="font-semibold">— Michael T., Regular Client</div>
            </div>
          </section>
        </>
      }
    />
  );
};

export default Tailors;
