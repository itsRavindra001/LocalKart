import React from 'react';
import ServicePageLayout from '../ServicePageLayout';

const tutorsImages = [
  'https://thumbs.dreamstime.com/b/tutor-23355995.jpg',
  'https://static.vecteezy.com/system/resources/thumbnails/053/609/908/small/small-class-teacher-and-pupils-in-the-home-classroom-reviewing-lessons-and-offering-homework-advice-photo.jpg',
  'https://img.freepik.com/free-photo/side-view-child-tutor-home_23-2148524538.jpg?semt=ais_country_boost&w=740',
  'https://img.freepik.com/free-photo/front-view-child-home-with-female-tutor_23-2148524633.jpg?semt=ais_country_boost&w=740',
];

const Tutors = () => (
  <ServicePageLayout
    title="Tutors"
    description="Find qualified tutors for all subjects and levels, offering in-person or online learning support."
    images={tutorsImages}
    features={[
      'Subject Experts (Maths, Science, English)',
      'Home Tuition & Online Classes',
      'Exam Preparation Help',
      'Flexible Timings',
    ]}
    serviceName="Tutors"
  />
);

export default Tutors;
