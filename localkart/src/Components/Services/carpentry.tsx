import React from 'react';
import ServicePageLayout from '../ServicePageLayout';

const carpentryImages = [
    'https://images.pexels.com/photos/313776/pexels-photo-313776.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    'https://img.freepik.com/free-photo/close-up-male-carpenter-sanding-furniture-with-power-tool-workbench_23-2147944825.jpg?semt=ais_hybrid&w=740',
    'https://img.freepik.com/free-photo/portrait-male-carpenter-holding-wooden-plank-workbench-workshop_23-2147944921.jpg?semt=ais_hybrid&w=740',
    'https://www.shutterstock.com/image-photo/young-carpenter-sanding-wood-piece-260nw-2361923721.jpg',
];

const Carpentry = () => (
  <ServicePageLayout
    title="Carpentry"
    description="Custom woodwork, furniture repairs, modular cabinets, and door installations by skilled carpenters."
    images={carpentryImages}
    features={[
      'Custom Furniture Making',
      'Door & Window Installation',
      'Wood Polishing & Repairs',
      'Wardrobe & Cabinet Fitting',
    ]}
    serviceName="Carpentry"
  />
);

export default Carpentry;
