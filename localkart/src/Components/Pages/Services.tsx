import React from 'react';
import { Link } from 'react-router-dom';

const services = [
  {
    name: 'Plumbing',
    slug: 'plumbing',
    img: 'https://img.freepik.com/free-vector/plumbing-service-advertising-banner-repairman-uniform-standing-with-wrench-hand-tools-box-near-sink_575670-1705.jpg?semt=ais_hybrid&w=740',
  },
  {
    name: 'Electrician',
    slug: 'electrician',
    img: 'https://t4.ftcdn.net/jpg/11/66/04/09/360_F_1166040934_x8kGgvbpoMfatoBqu60I9lhDeiaomEHC.jpg',
  },
  {
    name: 'Salon at Home',
    slug: 'salon',
    img: 'https://media.gettyimages.com/id/pop033/vector/man-getting-haircut.jpg?s=612x612&w=0&k=20&c=EOkSuxsdxpM4toekb0fROqunydH1Gjhx0d271RpFgLg=',
  },
  {
    name: 'AC Repair',
    slug: 'ac-repair',
    img: 'https://media.istockphoto.com/id/1323570577/vector/air-conditioner-repair-service-friendly-smiling-repairman.jpg?s=612x612&w=0&k=20&c=Tt3aD0QyuJlcJlv6N093tezEFD5v8tS22VpvxBdAnBs=',
  },
  {
    name: 'House Cleaning',
    slug: 'cleaning',
    img: 'https://thumbs.dreamstime.com/b/smiling-cartoon-cleaning-woman-mop-bucket-384145220.jpg',
  },
  {
    name: 'Painting',
    slug: 'painting',
    img: 'https://media.istockphoto.com/id/578576392/vector/painter-coloring-wall-by-paint-roller-people-occupations.jpg?s=612x612&w=0&k=20&c=pj4JtRaGsU66VRS8o49X-uS0ZWqYV98qDocq4zpk61Y=',
  },
  {
    name: 'Carpentry',
    slug: 'carpentry',
    img: 'https://i.pinimg.com/originals/15/b4/07/15b4070ae324c30e412f413076c0f79b.jpg',
  },
  {
    name: 'Groceries',
    slug: 'groceries',
    img: 'https://i.pinimg.com/originals/5d/6b/5b/5d6b5b167c0877f7079ddff8c4861fe4.jpg',
  },
  {
    name: 'Tutors',
    slug: 'tutors',
    img: 'https://thumbs.dreamstime.com/b/teacher-helping-student-studies-school-desk-cartoon-illustration-cartoon-illustration-teacher-helping-student-376254486.jpg',
  },
  {
    name: 'Tailors',
    slug: 'tailors',
    img: 'https://t4.ftcdn.net/jpg/09/07/28/05/360_F_907280531_QxHlhpy9nJjLsHI2AhGl9Z0t9j09wEZl.jpg',
  },
];

const Services = () => (
  <section className="min-h-screen w-full bg-gradient-to-br from-emerald-50 via-white to-blue-100 py-20 px-4 md:px-10">
    {/* Header */}
    <div className="max-w-4xl mx-auto mb-14 text-center backdrop-blur-md bg-white/60 rounded-3xl shadow-lg p-10">
      <h1 className="text-4xl md:text-5xl font-extrabold text-blue-700 mb-4">
        Explore Our Services
      </h1>
      <p className="text-gray-600 text-lg">
        Book trusted local professionals across multiple categories — all in one place.
      </p>
    </div>

    {/* Services Grid 5x2 */}
    <div className="max-w-7xl mx-auto grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {services.map(({ name, slug, img }) => (
        <Link
          key={slug}
          to={`/services/${slug}`}
          className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition"
        >
          <img
            src={img}
            alt={name}
            className="w-full h-44 object-cover group-hover:scale-110 transition duration-300"
          />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition duration-300" />
          <span className="absolute inset-x-0 bottom-0 pb-3 text-center text-lg font-semibold text-white drop-shadow-lg">
            {name}
          </span>
        </Link>
      ))}
    </div>
  </section>
);

export default Services;
