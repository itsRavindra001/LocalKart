import React from 'react';

const TermsOfService = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16 text-gray-800 font-sans">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-blue-700 mb-4">Terms of Service</h1>
        <p className="text-gray-500 text-lg">
          Please read these terms and conditions carefully before using our services.
        </p>
      </div>

      <div className="bg-white shadow-lg rounded-2xl p-8 space-y-6 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-blue-600 mb-2">1. Acceptance of Terms</h2>
          <p>
            By accessing or using LocalKart, you agree to be bound by these Terms. If you do not
            agree, please do not use our platform.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-blue-600 mb-2">2. Services</h2>
          <p>
            LocalKart connects users with trusted local service providers. We do not directly
            provide services, but act as a platform to facilitate bookings.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-blue-600 mb-2">3. User Responsibilities</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Provide accurate and complete information.</li>
            <li>Use the platform for lawful purposes only.</li>
            <li>Respect service providers and adhere to scheduled bookings.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-blue-600 mb-2">4. Payments</h2>
          <p>
            Payment details, if applicable, are handled securely. We do not store your payment
            credentials directly.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-blue-600 mb-2">5. Cancellations & Refunds</h2>
          <p>
            Cancellation and refund policies depend on the service provider. Please review provider
            terms before booking.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-blue-600 mb-2">6. Modifications</h2>
          <p>
            We reserve the right to modify or update these Terms at any time. Continued use of the
            platform implies acceptance of any changes.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-blue-600 mb-2">7. Contact Us</h2>
          <p>
            If you have any questions regarding these Terms, please contact us at{' '}
            <a
              href="mailto:support@localkart.com"
              className="text-blue-500 hover:underline"
            >
              support@localkart.com
            </a>
            .
          </p>
        </section>
      </div>

      <div className="mt-12 text-center">
        <a
          href="/"
          className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition"
        >
          Back to Home
        </a>
      </div>
    </div>
  );
};

export default TermsOfService;
