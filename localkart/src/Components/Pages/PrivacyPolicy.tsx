import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-700 mb-6 text-center">Privacy Policy</h1>
        <p className="text-gray-600 mb-8 text-center text-lg">
          This Privacy Policy describes how LocalKart collects, uses, and protects your personal information.
        </p>

        {/* Section 1 */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-blue-600 mb-3">1. Information We Collect</h2>
          <p className="text-gray-700 mb-2">
            We collect information that you provide to us directly, such as your name, email address, phone number, service preferences, and payment details.
          </p>
          <p className="text-gray-700">
            Additionally, we may collect usage data including IP address, browser type, pages visited, and other diagnostic data to improve our services.
          </p>
        </section>

        {/* Section 2 */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-blue-600 mb-3">2. How We Use Your Information</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>To provide and maintain our services</li>
            <li>To personalize your experience and provide customer support</li>
            <li>To send updates, promotional messages, and service-related notices</li>
            <li>To improve security and detect/prevent fraud or abuse</li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-blue-600 mb-3">3. Sharing Your Information</h2>
          <p className="text-gray-700">
            We do not sell your personal information. We may share it with trusted third parties who help us operate our platform (such as payment processors and analytics providers), but only to the extent necessary to perform their services.
          </p>
        </section>

        {/* Section 4 */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-blue-600 mb-3">4. Data Security</h2>
          <p className="text-gray-700">
            We implement appropriate security measures to protect your data. However, please note that no method of transmission over the internet is completely secure.
          </p>
        </section>

        {/* Section 5 */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-blue-600 mb-3">5. Your Choices & Rights</h2>
          <p className="text-gray-700 mb-2">
            You may access, update, or delete your personal information by contacting us. You can also opt out of promotional communications at any time.
          </p>
        </section>

        {/* Section 6 */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-blue-600 mb-3">6. Changes to This Policy</h2>
          <p className="text-gray-700">
            We may update this policy periodically. We encourage you to review it regularly to stay informed about how we protect your information.
          </p>
        </section>

        {/* Contact */}
        <section className="mt-12 text-center">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Contact Us</h3>
          <p className="text-gray-600">If you have any questions about this Privacy Policy, please contact us at <span className="text-blue-600">support@localkart.com</span>.</p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
