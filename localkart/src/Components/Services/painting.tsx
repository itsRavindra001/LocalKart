import React from 'react';
import { Brush, Home, Palette, Droplets, Clock, CheckCircle } from 'lucide-react';
import ServicePageLayout from '../ServicePageLayout';

const Painting = () => {
  const paintingImages = [
    'https://img.freepik.com/premium-photo/height-painting-service_1048944-15593236.jpg?semt=ais_hybrid&w=740',
    'https://thumbs.dreamstime.com/b/painter-worker-roller-painting-wall-surface-color-home-impovement-refurbishment-painter-worker-roller-159778171.jpg',
    'https://static.vecteezy.com/system/resources/thumbnails/031/407/373/small/professional-handyman-using-rolling-brush-to-do-painting-job-working-on-renovating-project-to-color-walls-repairman-contractor-holding-roller-paintbrush-for-redecoration-and-renovation-photo.jpg',
    'https://img.freepik.com/free-vector/household-renovation-professions_23-2148676135.jpg?semt=ais_country_boost&w=740',
  ];

  // Enhanced features with icons
  const features = [
    { icon: <Brush className="w-6 h-6 text-blue-600" />, text: 'Interior & exterior painting' },
    { icon: <Palette className="w-6 h-6 text-blue-600" />, text: 'Custom wall textures & finishes' },
    { icon: <Droplets className="w-6 h-6 text-blue-600" />, text: 'Premium waterproof coatings' },
    { icon: <Home className="w-6 h-6 text-blue-600" />, text: 'Residential & commercial services' },
    { icon: <Clock className="w-6 h-6 text-blue-600" />, text: 'Quick-dry solutions available' },
    { icon: <CheckCircle className="w-6 h-6 text-blue-600" />, text: '5-year quality guarantee' }
  ];

  return (
    <ServicePageLayout
      title="Professional Painting Services"
      description="Transform your spaces with our expert painting solutions using premium materials and flawless techniques"
      images={paintingImages}
      features={features.map(f => f.text)}
      serviceType="painting"
      additionalContent={
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Service Packages */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              {
                title: "Basic Painting",
                price: "$1.50/sq.ft",
                desc: "Standard wall painting service",
                features: ["1 coat primer", "2 finish coats", "Basic color options", "Wall preparation"],
                icon: <Brush className="w-8 h-8 text-blue-600 mx-auto" />
              },
              {
                title: "Premium Painting",
                price: "$2.50/sq.ft",
                desc: "Enhanced quality finish",
                features: ["Premium paints", "Wall repairs included", "Color consultation", "Edge detailing"],
                icon: <Palette className="w-8 h-8 text-blue-600 mx-auto" />,
                popular: true
              },
              {
                title: "Elite Package",
                price: "$3.50/sq.ft",
                desc: "Luxury finish with textures",
                features: ["Designer colors", "Custom textures", "Wall treatments", "5-year warranty"],
                icon: <Droplets className="w-8 h-8 text-blue-600 mx-auto" />
              }
            ].map((pkg, index) => (
              <div key={index} className={`bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow ${pkg.popular ? 'ring-2 ring-blue-500' : ''}`}>
                {pkg.popular && <div className="bg-blue-500 text-white text-sm font-bold px-3 py-1 rounded-full inline-block mb-4">MOST POPULAR</div>}
                <div className="flex justify-center mb-4">
                  {pkg.icon}
                </div>
                <h3 className="text-xl font-bold text-center text-gray-800 mb-2">{pkg.title}</h3>
                <p className="text-2xl font-bold text-center text-blue-600 mb-4">{pkg.price}</p>
                <p className="text-gray-600 text-center mb-4">{pkg.desc}</p>
                <ul className="space-y-2 mb-6">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition">
                  Get Quote
                </button>
              </div>
            ))}
          </div>

          {/* Painting Process */}
          <div className="bg-blue-50 rounded-xl p-8 mb-12">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Our Painting Process</h2>
            <div className="relative">
              {/* Timeline line */}
              <div className="hidden md:block absolute left-1/2 h-full w-0.5 bg-blue-200 transform -translate-x-1/2"></div>
              
              {/* Timeline items */}
              {[
                {
                  step: "1",
                  title: "Surface Preparation",
                  desc: "Cleaning, sanding, and repairing walls"
                },
                {
                  step: "2",
                  title: "Primer Application",
                  desc: "Ensuring proper paint adhesion"
                },
                {
                  step: "3",
                  title: "Paint Application",
                  desc: "Precision cutting and rolling"
                },
                {
                  step: "4",
                  title: "Final Inspection",
                  desc: "Quality check and touch-ups"
                }
              ].map((step, index) => (
                <div key={index} className={`relative mb-8 md:flex ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className="md:w-1/2 p-4">
                    <div className="bg-white rounded-lg p-6 h-full shadow-sm">
                      <div className="flex items-center mb-2">
                        <div className="bg-blue-100 p-2 rounded-full mr-3">
                          <span className="font-bold text-blue-600">{step.step}</span>
                        </div>
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

          {/* Paint Options */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Premium Paint Brands We Use</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              {['Dulux', 'Asian Paints', 'Berger', 'Nippon', 'Jotun', 'Sherwin-Williams'].map((brand, index) => (
                <div key={index} className="bg-white p-4 rounded-lg flex items-center justify-center shadow-sm hover:shadow-md transition">
                  <span className="font-medium text-blue-700">{brand}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Before/After Gallery */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Transformation Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  before: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                  after: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                  desc: 'Living room makeover'
                },
                {
                  before: 'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                  after: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                  desc: 'Exterior facade renewal'
                }
              ].map((project, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="grid grid-cols-2">
                    <div className="p-2">
                      <h3 className="text-center font-medium text-gray-700 mb-2">Before</h3>
                      <img src={project.before} alt={`Before ${project.desc}`} className="w-full h-48 object-cover rounded-lg" />
                    </div>
                    <div className="p-2">
                      <h3 className="text-center font-medium text-gray-700 mb-2">After</h3>
                      <img src={project.after} alt={`After ${project.desc}`} className="w-full h-48 object-cover rounded-lg" />
                    </div>
                  </div>
                  <div className="p-4 text-center">
                    <p className="font-medium text-blue-600">{project.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Satisfaction Guarantee */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">100% Satisfaction Guarantee</h2>
            <p className="text-xl mb-6">If you're not completely happy, we'll make it right!</p>
            <button className="bg-white text-blue-700 font-bold py-3 px-8 rounded-lg hover:bg-blue-50 transition">
              Book Your Painting Project
            </button>
          </div>
        </div>
      }
    />
  );
};

export default Painting;