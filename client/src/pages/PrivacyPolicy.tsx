import React from "react";

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="container bg-primary-background py-8 lg:py-10 px-5 mx-auto">
      <div className="max-w-3xl mx-auto bg-primary-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl text-primary-text font-semibold mb-6">
          Privacy Policy
        </h1>

        <p className="mb-4 text-secondary-text">
          Welcome to{" "}
          <span className="font-medium">
            Drive <span className="text-primary-orange">Now</span>
          </span>
          ! Your privacy is very important to us. This Privacy Policy outlines
          how we collect, use, and protect your personal information when you
          use our car rental services.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-3 text-primary-text">
          Information We Collect
        </h2>
        <p className="mb-4 text-secondary-text">
          We may collect the following information when you use our services:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li className="text-primary-orange">
            <span className="text-secondary-text">
              Personal Identification Information (Name, email address, phone
              number, etc.)
            </span>
          </li>
          <li className="text-primary-orange">
            <span className="text-secondary-text">
              Payment information (credit card details, billing address, etc.)
            </span>
          </li>
          <li className="text-primary-orange">
            <span className="text-secondary-text">
              Rental history and preferences
            </span>
          </li>
          <li className="text-primary-orange">
            <span className="text-secondary-text">
              Location data (if you allow us to collect it)
            </span>
          </li>
        </ul>

        <h2 className="text-2xl text-primary-text font-semibold mt-6 mb-3 ">
          How We Use Your Information
        </h2>
        <p className="mb-4 text-secondary-text">
          We use the information we collect in the following ways:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li className="text-primary-orange">
            <span className="text-secondary-text">
              To provide and manage our car rental services
            </span>
          </li>
          <li className="text-primary-orange">
            <span className="text-secondary-text">
              To process payments and bookings
            </span>
          </li>
          <li className="text-primary-orange">
            <span className="text-secondary-text">
              To personalize your experience and offer customer support
            </span>
          </li>
          <li className="text-primary-orange">
            <span className="text-secondary-text">
              To send you promotional offers and updates
            </span>
          </li>
          <li className="text-primary-orange">
            <span className="text-secondary-text">
              To improve our website and services
            </span>
          </li>
        </ul>

        <h2 className="text-2xl text-primary-text font-semibold mt-6 mb-3">
          Data Security
        </h2>
        <p className="mb-4 text-secondary-text">
          We take your privacy seriously and use industry-standard security
          measures to protect your information. However, please note that no
          method of transmission over the internet or electronic storage is
          completely secure.
        </p>

        <h2 className="text-2xl text-primary-text font-semibold mt-6 mb-3">
          Third-Party Disclosure
        </h2>
        <p className="mb-4 text-secondary-text">
          We do not sell, trade, or otherwise transfer your personal information
          to outside parties without your consent, except for trusted third
          parties who assist us in operating our website and conducting our
          business, as long as those parties agree to keep this information
          confidential.
        </p>

        <h2 className="text-2xl text-primary-text font-semibold mt-6 mb-3">
          Your Consent
        </h2>
        <p className="mb-4 text-secondary-text">
          By using our site or services, you consent to our Privacy Policy.
        </p>

        <h2 className="text-2xl text-primary-text font-semibold mt-6 mb-3">
          Changes to Our Privacy Policy
        </h2>
        <p className="mb-4 text-secondary-text">
          We may update our Privacy Policy from time to time. Any changes will
          be posted on this page.
        </p>

        <h2 className="text-2xl text-primary-text font-semibold mt-6 mb-3">
          Contact Us
        </h2>
        <p className="mb-4 text-secondary-text">
          If you have any questions about our Privacy Policy, please contact us
          at{" "}
          <a
            href="mailto:support@drivenow.com"
            className="text-primary-orange font-medium"
          >
            support@drivenow.com
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
