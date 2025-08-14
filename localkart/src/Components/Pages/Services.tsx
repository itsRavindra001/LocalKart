import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const services = [
  { name: 'Plumbing', price: 250, slug: 'plumbing', img: 'https://img.freepik.com/free-vector/plumbing-service-advertising-banner-repairman-uniform-standing-with-wrench-hand-tools-box-near-sink_575670-1705.jpg?semt=ais_hybrid&w=740' },
  { name: 'Electrician', price: 300, slug: 'electrician', img: 'https://t4.ftcdn.net/jpg/11/66/04/09/360_F_1166040934_x8kGgvbpoMfatoBqu60I9lhDeiaomEHC.jpg' },
  { name: 'Salon at Home', price: 400, slug: 'salon', img: 'https://media.gettyimages.com/id/pop033/vector/man-getting-haircut.jpg?s=612x612&w=0&k=20&c=EOkSuxsdxpM4toekb0fROqunydH1Gjhx0d271RpFgLg=' },
  { name: 'AC Repair', price: 500, slug: 'ac-repair', img: 'https://media.istockphoto.com/id/1323570577/vector/air-conditioner-repair-service-friendly-smiling-repairman.jpg?s=612x612&w=0&k=20&c=Tt3aD0QyuJlcJlv6N093tezEFD5v8tS22VpvxBdAnBs=' },
  { name: 'House Cleaning', price: 350, slug: 'cleaning', img: 'https://thumbs.dreamstime.com/b/smiling-cartoon-cleaning-woman-mop-bucket-384145220.jpg' },
  { name: 'Painting', price: 450, slug: 'painting', img: 'https://media.istockphoto.com/id/578576392/vector/painter-coloring-wall-by-paint-roller-people-occupations.jpg?s=612x612&w=0&k=20&c=pj4JtRaGsU66VRS8o49X-uS0ZWqYV98qDocq4zpk61Y=' },
  { name: 'Carpentry', price: 300, slug: 'carpentry', img: 'https://i.pinimg.com/originals/15/b4/07/15b4070ae324c30e412f413076c0f79b.jpg' },
  { name: 'Pest Control', price: 600, slug: 'pest-control', img: 'https://i.pinimg.com/originals/45/98/2b/45982b8c6c6a6f55aa6e0dbcb454b85f.jpg' },
  { name: 'Tutors', price: 200, slug: 'tutors', img: 'https://thumbs.dreamstime.com/b/teacher-helping-student-studies-school-desk-cartoon-illustration-cartoon-illustration-teacher-helping-student-376254486.jpg' },
  { name: 'Tailors', price: 150, slug: 'tailors', img: 'https://t4.ftcdn.net/jpg/09/07/28/05/360_F_907280531_QxHlhpy9nJjLsHI2AhGl9Z0t9j09wEZl.jpg' },
];

const Services = () => {
  const handlePayment = async (serviceName: string, amount: number) => {
    try {
      // Create Razorpay order
      const { data } = await axios.post('/api/payment/order', { amount });

      const options = {
        key: data.key,
        amount: data.amount,
        currency: data.currency,
        name: "LocalKart Services",
        description: `Payment for ${serviceName}`,
        order_id: data.id,
        handler: async (response: any) => {
          const verifyRes = await axios.post('/api/payment/verify', response);
          if (verifyRes.data.success) {
            alert(`✅ Payment Successful for ${serviceName}`);
          } else {
            alert("❌ Payment Verification Failed");
          }
        },
        theme: { color: "#3399cc" },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment Error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
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

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {services.map(({ name, price, slug, img }) => (
          <div
            key={slug}
            className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition bg-white"
          >
            <img
              src={img}
              alt={name}
              className="w-full h-44 object-cover group-hover:scale-110 transition duration-300"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition duration-300" />
            <div className="absolute inset-x-0 bottom-0 pb-4 text-center text-white">
              <p className="text-lg font-semibold">{name}</p>
              <p className="text-sm">₹{price}</p>
              <button
                onClick={() => handlePayment(name, price)}
                className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
              >
                Pay Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
