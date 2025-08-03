import React from 'react';
import ServicePageLayout from '../ServicePageLayout';

const houseCleaningImages = [
  'https://cdn.pixabay.com/photo/2024/07/28/17/51/woman-8928096_640.png',
  'https://media.istockphoto.com/id/1409789197/vector/professional-cleaner-with-a-sanitizing-spray-and-a-mop-vector-illustration.jpg?s=612x612&w=0&k=20&c=GYjqPrZYdkwkb7-NmKjMhcvRhW0fEFST5ivflHSwb1U=',
  'https://img.freepik.com/free-vector/cleaners-with-cleaning-products-housekeeping-service_18591-52068.jpg?semt=ais_hybrid',
  'https://static.vecteezy.com/system/resources/thumbnails/001/984/801/small/housekeeping-team-with-cleaning-equipment-free-vector.jpg',
];

const HouseCleaning = () => (
  <ServicePageLayout
    title="House Cleaning"
    description="Professional house cleaning services for spotless and fresh homes, including deep cleaning and sanitation."
    images={houseCleaningImages}
    features={[
      'Deep Cleaning',
      'Bathroom & Kitchen Cleaning',
      'Move-in/Move-out Cleaning',
      'Eco-Friendly Products',
    ]}
    serviceName="House Cleaning"
  />
);

export default HouseCleaning;
