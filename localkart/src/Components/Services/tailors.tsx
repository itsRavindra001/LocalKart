import React from 'react';
import ServicePageLayout from '../ServicePageLayout';

const tailorsImages = [
  'https://cdn.pixabay.com/photo/2022/03/13/01/41/tailoring-7065117_640.jpg',
  'https://img.freepik.com/premium-photo/young-man-tailor-working-new-clothing_85869-8158.jpg?semt=ais_hybrid',
  'https://img.freepik.com/premium-photo/tailor-sewing-jacket-closeup_236854-8031.jpg?semt=ais_hybrid&w=740',
  'https://media.gettyimages.com/id/1072509440/photo/male-tailor-cutting-a-textile-at-workbench.jpg?s=612x612&w=0&k=20&c=hwODCZMAUgmcZ_iB_9VrtMwJbBmlPxNZj4_rLqHlLi8=',
];

const Tailors = () => (
  <ServicePageLayout
    title="Tailors"
    description="Professional tailoring services for all your custom stitching and alteration needs."
    images={tailorsImages}
    features={[
      'Custom Stitching for Men & Women',
      'Clothing Alterations',
      'Wedding/Occasion Wear Tailoring',
      'Pickup & Delivery Available',
    ]}
    serviceName="Tailors"
  />
);

export default Tailors;
