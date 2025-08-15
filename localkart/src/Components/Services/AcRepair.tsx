// import React from 'react';
import { Wrench, ShieldCheck, Clock, Thermometer, Hammer, CheckCircle } from 'lucide-react';
import ServicePageLayout from '../ServicePageLayout';

const ACRepair = () => {
  const acImages = [
    'https://i.pinimg.com/originals/a6/66/a0/a666a0b9f8d02cdcc79a93a135c30c09.jpg',
    'https://thumbs.dreamstime.com/b/ac-repair-technician-air-conditioner-maintenance-service-223791070.jpg',
    'https://img.freepik.com/premium-photo/male-technician-repairing-air-conditioner-indoors_392895-539149.jpg?semt=ais_hybrid&w=740',
    'https://cdn.create.vista.com/api/media/small/211231218/stock-photo-close-shot-young-repairman-fixing-air-conditioner-hanging-white-brick',
  ];

  // Features with icons
  const features = [
    { icon: <Wrench className="w-6 h-6 text-blue-600" />, text: 'Certified AC technicians' },
    { icon: <Thermometer className="w-6 h-6 text-blue-600" />, text: '24/7 emergency repairs' },
    { icon: <ShieldCheck className="w-6 h-6 text-blue-600" />, text: '90-day service warranty' },
    { icon: <Hammer className="w-6 h-6 text-blue-600" />, text: 'All brands serviced' },
    { icon: <Clock className="w-6 h-6 text-blue-600" />, text: 'Same-day service available' },
    { icon: <CheckCircle className="w-6 h-6 text-blue-600" />, text: 'Upfront pricing - no surprises' },
  ];

  return (
    <ServicePageLayout
      title="Professional AC Repair Services"
      description="Fast, reliable air conditioner repair and maintenance by certified HVAC specialists"
      images={acImages}
      features={features}
      serviceType="ac-repair"
      additionalContent={
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Service Highlights */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              {
                icon: <Wrench className="w-10 h-10 text-blue-600 mx-auto" />,
                title: "Expert Diagnosis",
                desc: "Accurate troubleshooting of all AC issues"
              },
              {
                icon: <Thermometer className="w-10 h-10 text-blue-600 mx-auto" />,
                title: "Cooling Solutions",
                desc: "Repairs that restore optimal performance"
              },
              {
                icon: <ShieldCheck className="w-10 h-10 text-blue-600 mx-auto" />,
                title: "Preventive Care",
                desc: "Maintenance to avoid future breakdowns"
              }
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Brands We Service */}
          <div className="bg-blue-50 rounded-xl p-8 mb-12">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Brands We Service</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              {['Carrier', 'Daikin', 'LG', 'Samsung', 'Voltas', 'Hitachi'].map((brand, index) => (
                <div key={index} className="bg-white p-4 rounded-lg flex items-center justify-center shadow-sm">
                  <span className="font-medium text-blue-700">{brand}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Emergency Service CTA */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">24/7 Emergency AC Repair</h2>
            <p className="text-xl mb-6">No cooling? We'll be there within 2 hours!</p>
            <button className="bg-white text-blue-700 font-bold py-3 px-8 rounded-lg hover:bg-blue-50 transition">
              Call Now: (+91) 012-3456-7890
            </button>
          </div>

          {/* Problem/Solution Section */}
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Common AC Problems</h3>
              <ul className="space-y-3">
                {[
                  "Not cooling properly",
                  "Strange noises",
                  "Water leakage",
                  "Frozen coils",
                  "Thermostat issues",
                  "High energy bills"
                ].map((problem, index) => (
                  <li key={index} className="flex items-start">
                    <Wrench className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>{problem}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Our Solutions</h3>
              <ul className="space-y-3">
                {[
                  "Refrigerant recharge",
                  "Component repairs",
                  "Drain line clearing",
                  "Coil cleaning",
                  "Thermostat calibration",
                  "System optimization"
                ].map((solution, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>{solution}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      }
    />
  );
};

export default ACRepair;
