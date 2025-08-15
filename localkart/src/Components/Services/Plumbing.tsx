// import React from 'react';
import ServicePageLayout from '../ServicePageLayout';

const plumbingImages = [
  'https://media.istockphoto.com/id/1129277094/photo/man-repairing-sink-pipe-in-the-kitchen.jpg?s=612x612&w=0&k=20&c=lL7fDjUEdSLZZFDHBP4iVM9jADYpTgyhpZ1Ux70UGb4=',
  'https://media.gettyimages.com/id/185241289/photo/cleaning-the-kitchen.jpg?s=612x612&w=0&k=20&c=9SvYu94tOpnrO8AR6vgP8qdKqtqh_1vYbdrkDnOXi5Q=',
  'https://media.gettyimages.com/id/2152727410/photo/plumbing-repair-service-in-a-bathroom.jpg?s=612x612&w=0&k=20&c=Iih6v8nXD3rNlx2sEYGyEG8J111mMmjbEmu6qypOYPg=',
  'https://media.istockphoto.com/id/178126106/photo/hot-water-heater-service.jpg?s=612x612&w=0&k=20&c=dQDPH9tY01tOfw8Fts22QoiCaevnMpekRlktgsPgZ_E=',
];

const Plumbing = () => (
  <ServicePageLayout
    title="Plumbing"
    description="From leaky faucets to full pipe replacements, our licensed plumbers deliver fast, reliable service for all your plumbing needs."
    images={plumbingImages}
    features={[
      'Leak Detection & Repair',
      'Drain Cleaning & Unclogging',
      'Toilet & Faucet Installation',
      'Water Heater Service',
      'Pipe Replacement & Re-piping',
    ]}
    // serviceName="Plumbing"
  />
);

export default Plumbing;