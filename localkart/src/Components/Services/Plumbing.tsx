
import ServicePageLayout from '../ServicePageLayout';
import { FaWrench, FaTint, FaShower, FaToilet, FaFire } from 'react-icons/fa';

const plumbingImages = [
  'https://media.istockphoto.com/id/1129277094/photo/man-repairing-sink-pipe-in-the-kitchen.jpg?s=612x612&w=0&k=20&c=lL7fDjUEdSLZZFDHBP4iVM9jADYpTgyhpZ1Ux70UGb4=',
  'https://media.gettyimages.com/id/185241289/photo/cleaning-the-kitchen.jpg?s=612x612&w=0&k=20&c=9SvYu94tOpnrO8AR6vgP8qdKqtqh_1vYbdrkDnOXi5Q=',
  'https://media.gettyimages.com/id/2152727410/photo/plumbing-repair-service-in-a-bathroom.jpg?s=612x612&w=0&k=20&c=Iih6v8nXD3rNlx2sEYGyEG8J111mMmjbEmu6qypOYPg=',
  'https://media.istockphoto.com/id/178126106/photo/hot-water-heater-service.jpg?s=612x612&w=0&k=20&c=dQDPH9tY01tOfw8Fts22QoiCaevnMpekRlktgsPgZ_E=',
];

const Plumbing = () => {
  const features = [
    {
      icon: <FaTint className="text-blue-500 text-xl mr-2" />,
      text: 'Expert leak detection and repair services'
    },
    {
      icon: <FaShower className="text-blue-500 text-xl mr-2" />,
      text: 'Professional drain cleaning and unclogging'
    },
    {
      icon: <FaToilet className="text-blue-500 text-xl mr-2" />,
      text: 'Toilet and faucet installation/repair'
    },
    {
      icon: <FaFire className="text-blue-500 text-xl mr-2" />,
      text: 'Water heater maintenance and repair'
    },
    {
      icon: <FaWrench className="text-blue-500 text-xl mr-2" />,
      text: 'Complete pipe replacement and re-piping'
    }
  ];

  const additionalContent = (
    <div className="bg-blue-50 rounded-xl p-6 max-w-7xl mx-auto">
      <h3 className="text-2xl font-bold text-blue-800 mb-4">24/7 Emergency Plumbing Services</h3>
      <p className="text-gray-700 mb-4">
        Our licensed plumbers are available around the clock for emergency repairs. 
        Whether it's a burst pipe in the middle of the night or a clogged drain on the weekend, 
        we'll be there to fix your plumbing problems quickly and efficiently.
      </p>
      <div className="bg-white p-4 rounded-lg border border-blue-200">
        <h4 className="font-bold text-blue-700 mb-2">Service Areas:</h4>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
          {['Residential Homes', 'Apartments', 'Commercial Buildings', 
            'Restaurants', 'Office Buildings', 'Industrial Facilities'].map((area, i) => (
            <li key={i} className="flex items-center">
              <span className="text-blue-500 mr-2">✓</span>
              <span>{area}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  return (
    <ServicePageLayout
      title="Professional Plumbing Services"
      description="From leaky faucets to full pipe replacements, our licensed plumbers deliver fast, reliable service for all your plumbing needs with a 100% satisfaction guarantee."
      images={plumbingImages}
      serviceType="plumbing"
      additionalContent={additionalContent}
      features={features}
    />
  );
};

export default Plumbing;