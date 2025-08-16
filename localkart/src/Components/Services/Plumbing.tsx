import React from 'react';
import ServicePageLayout from '../ServicePageLayout';
import { FaWrench, FaTint, FaShower, FaToilet, FaFire, FaClock, FaCheckCircle, FaMapMarkerAlt } from 'react-icons/fa';

const plumbingImages = [
  'https://media.istockphoto.com/id/1129277094/photo/man-repairing-sink-pipe-in-the-kitchen.jpg?s=612x612&w=0&k=20&c=lL7fDjUEdSLZZFDHBP4iVM9jADYpTgyhpZ1Ux70UGb4=',
  'https://media.gettyimages.com/id/185241289/photo/cleaning-the-kitchen.jpg?s=612x612&w=0&k=20&c=9SvYu94tOpnrO8AR6vgP8qdKqtqh_1vYbdrkDnOXi5Q=',
  'https://media.gettyimages.com/id/2152727410/photo/plumbing-repair-service-in-a-bathroom.jpg?s=612x612&w=0&k=20&c=Iih6v8nXD3rNlx2sEYGyEG8J111mMmjbEmu6qypOYPg=',
  'https://media.istockphoto.com/id/178126106/photo/hot-water-heater-service.jpg?s=612x612&w=0&k=20&c=dQDPH9tY01tOfw8Fts22QoiCaevnMpekRlktgsPgZ_E=',
];

const Plumbing = () => {
  const features = [
    {
      icon: <FaTint className="text-blue-600 text-2xl" />,
      text: 'Expert leak detection and repair',
      description: 'Advanced tools to locate hidden leaks with precision'
    },
    {
      icon: <FaShower className="text-blue-600 text-2xl" />,
      text: 'Drain cleaning specialists',
      description: 'Hydro-jetting technology for complete drain clearing'
    },
    {
      icon: <FaToilet className="text-blue-600 text-2xl" />,
      text: 'Toilet installation',
      description: 'Water-efficient models with professional installation'
    },
    {
      icon: <FaFire className="text-blue-600 text-2xl" />,
      text: 'Water heater services',
      description: 'Repair, maintenance, and installation of all types'
    },
    {
      icon: <FaWrench className="text-blue-600 text-2xl" />,
      text: 'Complete re-piping',
      description: 'Whole-home pipe replacement with minimal disruption'
    }
  ];

  const stats = [
    { value: '24/7', label: 'Emergency Service', icon: <FaClock className="text-white text-xl" /> },
    { value: '15 min', label: 'Average Response Time', icon: <FaCheckCircle className="text-white text-xl" /> },
    { value: '100+', label: 'Satisfied Customers', icon: <FaMapMarkerAlt className="text-white text-xl" /> }
  ];

  const additionalContent = (
    <div className="space-y-12">
      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {stats.map((stat, index) => (
          <div key={index} className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-6 text-white shadow-lg">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-500 p-3 rounded-full">
                {stat.icon}
              </div>
              <div>
                <p className="text-3xl font-bold">{stat.value}</p>
                <p className="text-blue-100">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Emergency Services */}
      <div className="bg-blue-50 rounded-xl p-8 max-w-7xl mx-auto border border-blue-100">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-6 md:mb-0 md:pr-8">
            <h3 className="text-2xl font-bold text-blue-800 mb-4 flex items-center">
              <FaClock className="mr-3 text-blue-600" />
              24/7 Emergency Plumbing
            </h3>
            <p className="text-gray-700 mb-4">
              We understand plumbing emergencies don't wait for business hours. Our rapid response team is available nights, weekends, and holidays to handle:
            </p>
            <ul className="space-y-2">
              {['Burst pipes', 'Severe leaks', 'Sewage backups', 'No hot water', 'Flooding'].map((item, i) => (
                <li key={i} className="flex items-center">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:w-1/2 bg-white p-6 rounded-lg shadow-inner border border-blue-200">
            <h4 className="font-bold text-blue-700 mb-4 text-center">Service Coverage</h4>
            <div className="grid grid-cols-2 gap-4">
              {['Residential Homes', 'Apartments', 'Commercial Buildings', 
                'Restaurants', 'Office Spaces', 'Industrial Sites'].map((area, i) => (
                <div key={i} className="flex items-center bg-blue-50 p-3 rounded">
                  <FaCheckCircle className="text-blue-500 mr-2" />
                  <span className="text-sm">{area}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="max-w-7xl mx-auto">
        <h3 className="text-2xl font-bold text-center text-blue-800 mb-8">What Our Customers Say</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              quote: "Fixed our burst pipe at 2 AM! Incredible service.",
              author: "Sarah K.",
              rating: "★★★★★"
            },
            {
              quote: "Professional and efficient. No mess left behind.",
              author: "Michael T.",
              rating: "★★★★★"
            },
            {
              quote: "Replaced all our old pipes in one day. Highly recommend!",
              author: "The Johnson Family",
              rating: "★★★★★"
            }
          ].map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <div className="text-yellow-400 mb-3">{testimonial.rating}</div>
              <p className="text-gray-700 italic mb-4">"{testimonial.quote}"</p>
              <p className="text-blue-600 font-medium">{testimonial.author}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <ServicePageLayout
      title={
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-800 inline-block relative">
            Professional Plumbing Services
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/3 h-1"></span>
          </h1>
        </div>
      }
      description={
        <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto">
          Comprehensive plumbing solutions with guaranteed satisfaction. Our licensed technicians deliver 
          <span className="font-semibold text-blue-600"> fast, reliable, and affordable </span> 
          service for all your residential and commercial plumbing needs.
        </p>
      }
      images={plumbingImages}
      serviceType="plumbing"
      additionalContent={additionalContent}
      features={features}
    />
  );
};

export default Plumbing;