import React from 'react';
import { Zap, Shield, Home, Wrench, Clock, CheckCircle } from 'lucide-react';
import ServicePageLayout from '../ServicePageLayout';

const Electrician = () => {
  const electricianImages = [
    'https://www.spectrumelectricinc.com/blog/admin/uploads/2022/electrical_panel_2_1668762979.jpg',
    'https://img.freepik.com/free-photo/male-electrician-works-switchboard-with-electrical-connecting-cable_169016-16355.jpg?semt=ais_hybrid&w=740',
    'https://thumbs.dreamstime.com/b/electrical-engineer-using-digital-multi-meter-measuring-equipment-to-checking-electric-current-voltage-circuit-breaker-main-188610103.jpg',
    'https://static.vecteezy.com/system/resources/thumbnails/035/201/600/small/electrician-at-work-service-for-the-repair-of-electrical-wiring-and-replacement-of-ceiling-lamps-a-builder-is-installing-a-loftstyle-wooden-ceiling-rentagent-helps-with-the-housework-photo.jpg',
  ];

  // Enhanced features with icons
  const features = [
    { icon: <Zap className="w-6 h-6 text-blue-600" />, text: 'Complete home wiring & rewiring' },
    { icon: <Home className="w-6 h-6 text-blue-600" />, text: 'Ceiling fan & lighting installation' },
    { icon: <Wrench className="w-6 h-6 text-blue-600" />, text: 'Electrical panel upgrades' },
    { icon: <Clock className="w-6 h-6 text-blue-600" />, text: '24/7 emergency repairs' },
    { icon: <Shield className="w-6 h-6 text-blue-600" />, text: 'Safety inspections & certifications' },
    { icon: <CheckCircle className="w-6 h-6 text-blue-600" />, text: '100% satisfaction guarantee' }
  ];

  return (
    <ServicePageLayout
      title="Professional Electrical Services"
      description="Certified electricians providing safe, reliable solutions for homes and businesses"
      images={electricianImages}
      serviceType="electrician"
      additionalContent={
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Service Highlights */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              {
                icon: <Zap className="w-10 h-10 text-blue-600 mx-auto" />,
                title: "Expert Wiring",
                desc: "Safe installation meeting all electrical codes"
              },
              {
                icon: <Shield className="w-10 h-10 text-blue-600 mx-auto" />,
                title: "Safety First",
                desc: "Thorough inspections to prevent hazards"
              },
              {
                icon: <Clock className="w-10 h-10 text-blue-600 mx-auto" />,
                title: "Rapid Response",
                desc: "Emergency service available 24/7"
              }
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Services Grid */}
          <div className="bg-blue-50 rounded-xl p-8 mb-12">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Our Electrical Services</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[
                "Circuit breaker repairs",
                "GFCI outlet installation",
                "Whole-house rewiring",
                "Lighting design & installation",
                "Surge protection",
                "Generator hookups",
                "EV charger installation",
                "Smart home wiring",
                "Commercial electrical"
              ].map((service, index) => (
                <div key={index} className="bg-white p-4 rounded-lg flex items-center shadow-sm">
                  <CheckCircle className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" />
                  <span className="font-medium text-blue-700">{service}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Emergency CTA */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl p-8 text-center mb-12">
            <h2 className="text-2xl font-bold mb-4">24/7 Emergency Electrical Service</h2>
            <p className="text-xl mb-6">Power outage? Sparking wires? We respond immediately!</p>
            <button className="bg-white text-blue-700 font-bold py-3 px-8 rounded-lg hover:bg-blue-50 transition">
              Call Now: +91 012-3456-7890
            </button>
          </div>

          {/* Safety Tips */}
          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Electrical Safety Tips</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Do's</h3>
                <ul className="space-y-3">
                  {[
                    "Use certified electrical products",
                    "Install child-proof outlets",
                    "Regularly test GFCI outlets",
                    "Label circuit breakers clearly",
                    "Use surge protectors"
                  ].map((tip, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Don'ts</h3>
                <ul className="space-y-3">
                  {[
                    "Overload power strips",
                    "Ignore flickering lights",
                    "DIY major electrical work",
                    "Use damaged cords",
                    "Ignore burning smells"
                  ].map((tip, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="w-5 h-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      }
      features={features.map(f => f.text)}
    />
  );
};

export default Electrician;