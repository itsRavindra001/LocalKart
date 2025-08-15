// import React from 'react';
import ServicePageLayout from '../ServicePageLayout';

const salonImages = [
  'https://images.squarespace-cdn.com/content/v1/6270536f27fa2a2db87d05c3/a85b7a93-dc5f-4ab7-9b3c-0dfa787188bb/Pompadour.jpeg',
  'https://static.vecteezy.com/system/resources/thumbnails/022/288/150/small/hairdresser-cuts-wet-hair-of-woman-photo.jpg',
  'https://t3.ftcdn.net/jpg/03/60/24/52/360_F_360245264_LZl2Rg4AX7G2j3aNMPYwuvbaIvTU2aTD.jpg',
  'https://media.istockphoto.com/id/1167658687/photo/professional-doing-pedicure-of-customer-at-spa.jpg?s=612x612&w=0&k=20&c=itTbRFNTWdTF6simoWuRCV3M_Z_0K9HFSHsMTS3T98o=',
];

const Salon = () => (
  <ServicePageLayout
    title="Salon at Home"
    description="Enjoy a full range of beauty treatments—haircuts, styling, mani-pedis, facials, and more—all in the comfort of your home."
    images={salonImages}
    features={[
      'Haircut & Styling',
      'Manicure & Pedicure',
      'Facial & Skincare Treatments',
      'Makeup & Special Occasion',
      'Hair Coloring & Treatments',
    ]}
    // serviceName="Salon at Home"
  />
);

export default Salon;
