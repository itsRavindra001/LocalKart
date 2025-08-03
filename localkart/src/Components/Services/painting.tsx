import React from 'react';
import ServicePageLayout from '../ServicePageLayout';

const paintingImages = [
 'https://img.freepik.com/premium-photo/height-painting-service_1048944-15593236.jpg?semt=ais_hybrid&w=740',
 'https://thumbs.dreamstime.com/b/painter-worker-roller-painting-wall-surface-color-home-impovement-refurbishment-painter-worker-roller-159778171.jpg',
 'https://static.vecteezy.com/system/resources/thumbnails/031/407/373/small/professional-handyman-using-rolling-brush-to-do-painting-job-working-on-renovating-project-to-color-walls-repairman-contractor-holding-roller-paintbrush-for-redecoration-and-renovation-photo.jpg',
 'https://img.freepik.com/free-vector/household-renovation-professions_23-2148676135.jpg?semt=ais_country_boost&w=740', 
];

const Painting = () => (
  <ServicePageLayout
    title="Painting"
    description="Revamp your space with expert wall painting, texture finishes, and waterproofing solutions."
    images={paintingImages}
    features={[
      'Interior & Exterior Painting',
      'Wall Texturing & Finishes',
      'Waterproof Coating',
      'Quick & Clean Service',
    ]}
    serviceName="Painting"
  />
);

export default Painting;
