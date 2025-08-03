// src/App.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/Pages/Navbar';
import Home from './Components/Pages/Home';
import Provider from './Components/Pages/Provider';
import AuthPage from './Components/Pages/AuthPage';
import ForgotPassword from './Components/Pages/ForgotPassword';
import ACRepair from './Components/Services/AcRepair';
import Electrician from './Components/Services/Electrician';
import Plumbing from './Components/Services/Plumbing';
import Salon from './Components/Services/Salon';
import BookingPage from './Components/Pages/BookingPage';
import Contact from './Components/Pages/Contact';
import PrivacyPolicy from './Components/Pages/PrivacyPolicy';
import TermsOfService from './Components/Pages/TermsOfService';
import HouseCleaning from './Components/Services/cleaning';
import Painting from './Components/Services/painting';
import Carpentry from './Components/Services/carpentry';
import Groceries from './Components/Services/groceries';
import Tailors from './Components/Services/tailors';
import Tutors from './Components/Services/tutors';
import Footer from './Components/Pages/Footer';
import GetStarted from './Components/Pages/GetStarted';
import Services from './Components/Pages/Services';
import PaymentPage from './Components/Pages/Payment';
import CartPage from './Components/Pages/CartPage';
const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services/ac-repair" element={<ACRepair />} />
        <Route path="/services/electrician" element={<Electrician />} />
        <Route path="/services/plumbing" element={<Plumbing />} />
        <Route path="/services/salon" element={<Salon />} />
        <Route path="/services/cleaning" element={<HouseCleaning />} />
        <Route path="/services/painting" element={<Painting />} />
        <Route path="/provider" element={<Provider />} />
        <Route path="/services/carpentry" element={<Carpentry />} />
        <Route path="/services/groceries" element={<Groceries />} />
        <Route path="/services/tutors" element={<Tutors />} />
        <Route path="/getstarted" element={<GetStarted />} />
        <Route path="/services/tailors" element={<Tailors />} />
         <Route path="/login" element={<AuthPage />} />
         <Route path="/services" element={<Services />} />
        <Route path="/signup" element={<AuthPage />} />
        <Route path="/book" element={<BookingPage />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
      <Footer/>
    </>
  );
};

export default App;
