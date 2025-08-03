import React from 'react';
import ServicePageLayout from '../ServicePageLayout';

const acImages = [
  'https://i.pinimg.com/originals/a6/66/a0/a666a0b9f8d02cdcc79a93a135c30c09.jpg',
  'https://thumbs.dreamstime.com/b/ac-repair-technician-air-conditioner-maintenance-service-223791070.jpg',
  'https://img.freepik.com/premium-photo/male-technician-repairing-air-conditioner-indoors_392895-539149.jpg?semt=ais_hybrid&w=740',
  'https://cdn.create.vista.com/api/media/small/211231218/stock-photo-close-shot-young-repairman-fixing-air-conditioner-hanging-white-brick',
];

const ACRepair = () => (
  <ServicePageLayout
    title="AC Repair"
    description="Our certified technicians diagnose and fix any air conditioner issue—fast and affordably."
    images={acImages}
    features={[
      'Installation & Maintenance',
      'Gas Charging & Leak Repair',
      'Compressor & Motor Replacement',
      'Preventative Tune-ups',
    ]}
    serviceName="AC Repair"
  />
);

export default ACRepair;