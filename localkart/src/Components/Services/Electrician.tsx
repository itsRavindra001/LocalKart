import React from 'react';
import ServicePageLayout from '../ServicePageLayout';

const electricianImages = [
  'https://www.spectrumelectricinc.com/blog/admin/uploads/2022/electrical_panel_2_1668762979.jpg',
  'https://img.freepik.com/free-photo/male-electrician-works-switchboard-with-electrical-connecting-cable_169016-16355.jpg?semt=ais_hybrid&w=740',
  'https://thumbs.dreamstime.com/b/electrical-engineer-using-digital-multi-meter-measuring-equipment-to-checking-electric-current-voltage-circuit-breaker-main-188610103.jpg',
  'https://static.vecteezy.com/system/resources/thumbnails/035/201/600/small/electrician-at-work-service-for-the-repair-of-electrical-wiring-and-replacement-of-ceiling-lamps-a-builder-is-installing-a-loftstyle-wooden-ceiling-rentagent-helps-with-the-housework-photo.jpg',
];

const Electrician = () => (
  <ServicePageLayout
    title="Electrician"
    description="Safe, reliable electrical services for homes & businesses: wiring, panel upgrades, lighting, emergencies."
    images={electricianImages}
    features={[
      'Home Wiring & Rewiring',
      'Ceiling Fan & Lighting Installation',
      'Electrical Panel Upgrades',
      'Troubleshooting & Emergency Repairs',
    ]}
    serviceName="Electrician"
  />
);

export default Electrician;