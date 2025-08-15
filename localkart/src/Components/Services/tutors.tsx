import React from 'react';
import { BookOpen, GraduationCap, Clock, Monitor, Award, CheckCircle } from 'lucide-react';
import ServicePageLayout from '../ServicePageLayout';

const Tutors = () => {
  const tutorsImages = [
    'https://thumbs.dreamstime.com/b/tutor-23355995.jpg',
    'https://static.vecteezy.com/system/resources/thumbnails/053/609/908/small/small-class-teacher-and-pupils-in-the-home-classroom-reviewing-lessons-and-offering-homework-advice-photo.jpg',
    'https://img.freepik.com/free-photo/side-view-child-tutor-home_23-2148524538.jpg?semt=ais_country_boost&w=740',
    'https://img.freepik.com/free-photo/front-view-child-home-with-female-tutor_23-2148524633.jpg?semt=ais_country_boost&w=740',
  ];

  // Enhanced features with icons
  const features = [
    { icon: <GraduationCap className="w-5 h-5 text-indigo-600" />, text: 'Certified subject experts (Maths, Science, English)' },
    { icon: <BookOpen className="w-5 h-5 text-indigo-600" />, text: 'Customized learning plans for each student' },
    { icon: <Monitor className="w-5 h-5 text-indigo-600" />, text: 'Flexible online or in-person sessions' },
    { icon: <Clock className="w-5 h-5 text-indigo-600" />, text: 'Convenient scheduling including evenings/weekends' },
    { icon: <Award className="w-5 h-5 text-indigo-600" />, text: 'Exam preparation (SAT, ACT, GCSE, IB)' },
    { icon: <CheckCircle className="w-5 h-5 text-indigo-600" />, text: 'Progress tracking and regular feedback' }
  ];

  return (
    <ServicePageLayout
      title="Expert Tutoring Services"
      description="Personalized learning with qualified tutors to help students excel academically"
      images={tutorsImages}
      features={features.map(f => f.text)}
      serviceType="tutoring"
      additionalContent={
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* How It Works Section */}
          <div className="bg-white rounded-xl shadow-md p-8 mb-12">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Our Tutoring Approach</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <BookOpen className="w-8 h-8 text-indigo-600 mx-auto" />,
                  title: "Assessment",
                  desc: "Initial evaluation to identify strengths and areas for improvement"
                },
                {
                  icon: <GraduationCap className="w-8 h-8 text-indigo-600 mx-auto" />,
                  title: "Personalized Plan",
                  desc: "Custom learning strategy tailored to the student's needs"
                },
                {
                  icon: <Monitor className="w-8 h-8 text-indigo-600 mx-auto" />,
                  title: "Engaging Sessions",
                  desc: "Interactive lessons that make learning effective and enjoyable"
                }
              ].map((step, index) => (
                <div key={index} className="text-center p-4">
                  <div className="flex justify-center mb-4">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Subjects Section */}
          <div className="bg-indigo-50 rounded-xl p-8 mb-12">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Subjects We Cover</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                "Mathematics", "Physics", "Chemistry", "Biology",
                "English Literature", "History", "Geography", "Economics",
                "Computer Science", "Foreign Languages", "Test Prep", "College Admissions"
              ].map((subject, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-sm text-center">
                  <p className="font-medium text-indigo-700">{subject}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonial Section */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl p-8">
            <div className="max-w-3xl mx-auto text-center">
              <blockquote className="text-xl italic mb-4">
                "My daughter's grades improved by two letter grades after just three months with her math tutor. The personalized approach made all the difference!"
              </blockquote>
              <div className="font-semibold">— Sarah K., Parent</div>
            </div>
          </div>
        </div>
      }
    />
  );
};

export default Tutors;