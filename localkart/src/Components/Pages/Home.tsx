import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Hero from './Hero';

const popularServices = [
  { name: 'Plumbing', img: 'https://img.freepik.com/free-vector/plumbing-service-advertising-banner-repairman-uniform-standing-with-wrench-hand-tools-box-near-sink_575670-1705.jpg?semt=ais_hybrid&w=740', to: '/services/plumbing' },
  { name: 'Electrician', img: 'https://t4.ftcdn.net/jpg/11/66/04/09/360_F_1166040934_x8kGgvbpoMfatoBqu60I9lhDeiaomEHC.jpg', to: '/services/electrician' },
  { name: 'Salon at Home', img: 'https://media.gettyimages.com/id/pop033/vector/man-getting-haircut.jpg?s=612x612&w=0&k=20&c=EOkSuxsdxpM4toekb0fROqunydH1Gjhx0d271RpFgLg=', to: '/services/salon' },
  { name: 'AC Repair', img: 'https://media.istockphoto.com/id/1323570577/vector/air-conditioner-repair-service-friendly-smiling-repairman.jpg?s=612x612&w=0&k=20&c=Tt3aD0QyuJlcJlv6N093tezEFD5v8tS22VpvxBdAnBs=', to: '/services/ac-repair' },
  { name: 'House Cleaning', img: 'https://thumbs.dreamstime.com/b/smiling-cartoon-cleaning-woman-mop-bucket-384145220.jpg', to: '/services/cleaning' },
  { name: 'Painting', img: 'https://media.istockphoto.com/id/578576392/vector/painter-coloring-wall-by-paint-roller-people-occupations.jpg?s=612x612&w=0&k=20&c=pj4JtRaGsU66VRS8o49X-uS0ZWqYV98qDocq4zpk61Y=', to: '/services/painting' },
  { name: 'Carpentry', img: 'https://i.pinimg.com/originals/15/b4/07/15b4070ae324c30e412f413076c0f79b.jpg', to: '/services/carpentry' },
  { name: 'Groceries', img: 'https://i.pinimg.com/originals/5d/6b/5b/5d6b5b167c0877f7079ddff8c4861fe4.jpg', to: '/services/groceries' },
  { name: 'Tutors', img: 'https://thumbs.dreamstime.com/b/teacher-helping-student-studies-school-desk-cartoon-illustration-cartoon-illustration-teacher-helping-student-376254486.jpg', to: '/services/tutors' },
  { name: 'Tailors', img: 'https://t4.ftcdn.net/jpg/09/07/28/05/360_F_907280531_QxHlhpy9nJjLsHI2AhGl9Z0t9j09wEZl.jpg', to: '/services/tailors' }
];

const steps = [
  {
    icon: '📍',
    title: 'Choose Location',
    desc: 'Enter your city or area to view available services nearby.',
    img: 'https://img.icons8.com/clouds/500/marker.png'
  },
  {
    icon: '🛠️',
    title: 'Select Service',
    desc: 'Pick the service you need from verified local providers.',
    img: 'https://img.icons8.com/clouds/500/maintenance.png'
  },
  {
    icon: '📅',
    title: 'Schedule Booking',
    desc: 'Pick your preferred time slot and confirm instantly.',
    img: 'https://img.icons8.com/clouds/500/calendar.png'
  },
  {
    icon: '✅',
    title: 'Get Work Done',
    desc: 'A trusted professional will arrive at your doorstep.',
    img: 'https://img.icons8.com/clouds/500/checked.png'
  }
];

const whyLocalKart = [
  ['🔍', 'Easy Search', 'Find services quickly with our smart search'],
  ['📅', 'Book Instantly', 'Select time slots that work for you'],
  ['👤', 'Trusted Providers', 'All service providers are verified'],
  ['✅', 'Quality Assured', '100% satisfaction guarantee'],
  ['💸', 'Affordable Pricing', 'Transparent and competitive rates'],
  ['🔐', 'Secure Payments', 'Pay safely with encrypted transactions'],
  ['📞', '24/7 Support', 'Always here to help via chat or call'],
  ['🌐', 'Wide Reach', 'Available across multiple cities and towns']
];

const Home: React.FC = () => {
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
          }
        });
      },
      { threshold: 0.15 }
    );

    stepsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      stepsRef.current.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  return (
    <div className="font-sans text-gray-800 overflow-x-hidden">
      <Hero />

      {/* Popular Services */}
      <section className="w-full py-20 px-4 bg-gradient-to-r from-sky-50 to-emerald-50">
  <div className="max-w-screen-xl mx-auto text-center">
    <h2 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-500 mb-12">
      Popular Services
    </h2>

    {/* First 10 services in 5 columns */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10 justify-items-center">
      {popularServices.slice(0, 10).map((svc) => (
        <Link
          key={svc.name}
          to={svc.to}
          className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 w-60"
        >
          <div className="relative pt-[80%] overflow-hidden rounded-t-2xl">
            <img
              src={svc.img}
              alt={svc.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600">
              {svc.name}
            </h3>
          </div>
        </Link>
      ))}
    </div>

    {/* Remaining services centered */}
    {popularServices.length > 10 && (
      <div className="mt-12 flex justify-center">
        <div className="flex flex-wrap gap-10 justify-center">
          {popularServices.slice(10).map((svc) => (
            <Link
              key={svc.name}
              to={svc.to}
              className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 w-60"
            >
              <div className="relative pt-[75%] overflow-hidden rounded-t-2xl">
                <img
                  src={svc.img}
                  alt={svc.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600">
                  {svc.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    )}
  </div>
</section>


      {/* Call to Action */}
      <section className="relative isolate py-20 px-4 flex flex-col items-center text-center overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-600">
        <div className="absolute inset-0 -z-10 opacity-30 blur-xl" />
        <h2 className="text-3xl md:text-4xl font-extrabold text-white drop-shadow-lg mb-4">
          Ready to Get Started?
        </h2>
        <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl">
          Join thousands of satisfied customers and service providers
        </p>
        <div className="flex flex-wrap justify-center gap-6">
          <Link
            to="/book"
            className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-full shadow hover:shadow-xl transform hover:-translate-y-1 transition"
          >
            Book Services
          </Link>
          <Link
            to="/provider"
            className="px-8 py-3 bg-blue-100 text-blue-800 font-semibold rounded-full shadow hover:shadow-xl transform hover:-translate-y-1 transition"
          >
            Become a Provider
          </Link>
        </div>
      </section>

      {/* Why Choose LocalKart */}
      <section className="py-20 px-4 bg-gray-50">
        <h2 className="text-2xl md:text-4xl font-extrabold text-gray-900 text-center mb-16">
          Why Choose LocalKart?
        </h2>
        <div className="max-w-screen-xl mx-auto grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-8">
          {whyLocalKart.map(([icon, title, desc], i) => (
            <div
              key={i}
              className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 text-center flex flex-col items-center"
            >
              <div className="text-4xl mb-4 w-16 h-16 flex items-center justify-center bg-blue-50 text-blue-600 rounded-full shadow-inner">
                {icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How LocalKart Works */}
      <section className="relative py-12 px-4 bg-gradient-to-br from-blue-50 via-white to-emerald-50 font-sans">
  <h2 className="text-xl md:text-xl font-bold text-blue-700 text-center mb-12">
    How LocalKart Works
  </h2>

  <div className="relative max-w-5xl mx-auto flex flex-col gap-10 lg:gap-14">
    {/* Vertical timeline for large screens */}
    <span className="hidden lg:block absolute left-1/2 top-0 h-full w-0.5 bg-blue-200 rounded-full -translate-x-1/2" />

    {steps.map((step, i) => (
      <div
        key={i}
        ref={(el) => (stepsRef.current[i] = el)}
        className={`group relative flex flex-col lg:flex-row items-center lg:items-start gap-6
          transform transition-all duration-700 opacity-0 translate-y-6
          ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
      >
        {/* Timeline Dot */}
        <div className="hidden lg:flex flex-col items-center">
          <span className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-[10px] text-white font-bold flex items-center justify-center shadow">
            {i + 1}
          </span>
          <span className="flex-1 bg-blue-200 w-0.5" />
        </div>

        {/* Step Card */}
        <div className="w-full lg:w-1/2 backdrop-blur-sm bg-white/80 p-4 rounded-xl shadow-md ring-1 ring-blue-100">
          <div className="text-xl mb-1">{step.icon}</div>
          <h3 className="text-base font-semibold text-blue-700 mb-1">{step.title}</h3>
          <p className="text-gray-600 text-sm">{step.desc}</p>
        </div>

        {/* Image */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <img
            src={step.img}
            alt={step.title}
            className="rounded-xl w-full max-w-[160px] mx-auto shadow group-hover:shadow-md transition"
          />
        </div>
      </div>
    ))}
  </div>
</section>

    </div>
  );
};

export default Home;
