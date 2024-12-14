import React from "react";

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="container bg-primary-background py-8 lg:py-10 px-5 mx-auto">
      <div className="max-w-3xl mx-auto bg-primary-white shadow-md rounded-lg p-8">
        <h2 className="text-3xl text-primary-text font-semibold mb-5 font-playwrite">
          Privacy Policy
        </h2>

        <p className="mb-4 text-secondary-text">
          Welcome to{" "}
          <span className="font-medium">
            E-com <span className="text-primary-brand">Platform</span>
          </span>
          ! Your privacy is very important to us. This Privacy Policy outlines
          how we collect, use, and protect your personal information when you
          interact with our e-commerce services.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-3 text-primary-text">
          Information We Collect
        </h2>
        <p className="mb-4 text-secondary-text">
          We may collect the following information when you use our platform:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li className="text-primary-brand">
            <span className="text-secondary-text">
              Personal Identification Information (Name, email address, phone
              number, shipping address, etc.)
            </span>
          </li>
          <li className="text-primary-brand">
            <span className="text-secondary-text">
              Payment details (credit card, billing address, etc.)
            </span>
          </li>
          <li className="text-primary-brand">
            <span className="text-secondary-text">
              Purchase history and preferences
            </span>
          </li>
          <li className="text-primary-brand">
            <span className="text-secondary-text">
              Location data (if you allow us to collect it for better shipping
              estimates)
            </span>
          </li>
        </ul>

        <h2 className="text-2xl text-primary-text font-semibold mt-6 mb-3 ">
          How We Use Your Information
        </h2>
        <p className="mb-4 text-secondary-text">
          We use the information we collect to:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li className="text-primary-brand">
            <span className="text-secondary-text">
              Process and fulfill your orders efficiently
            </span>
          </li>
          <li className="text-primary-brand">
            <span className="text-secondary-text">
              Provide customer support and resolve issues
            </span>
          </li>
          <li className="text-primary-brand">
            <span className="text-secondary-text">
              Send you promotional offers and product updates
            </span>
          </li>
          <li className="text-primary-brand">
            <span className="text-secondary-text">
              Improve the functionality of our website and services
            </span>
          </li>
          <li className="text-primary-brand">
            <span className="text-secondary-text">
              Comply with legal obligations and fraud prevention
            </span>
          </li>
        </ul>

        <h2 className="text-2xl text-primary-text font-semibold mt-6 mb-3">
          Data Security
        </h2>
        <p className="mb-4 text-secondary-text">
          We use industry-standard security measures to protect your
          information. While we strive to safeguard your data, please note that
          no online platform can guarantee complete security.
        </p>

        <h2 className="text-2xl text-primary-text font-semibold mt-6 mb-3">
          Third-Party Disclosure
        </h2>
        <p className="mb-4 text-secondary-text">
          Your data may be shared with trusted third-party services such as
          payment processors and shipping carriers. These partners are obligated
          to keep your information secure and confidential.
        </p>

        <h2 className="text-2xl text-primary-text font-semibold mt-6 mb-3">
          Your Rights
        </h2>
        <p className="mb-4 text-secondary-text">
          You have the right to access, correct, or delete your personal
          information. For any requests, please contact us.
        </p>

        <h2 className="text-2xl text-primary-text font-semibold mt-6 mb-3">
          Changes to Our Privacy Policy
        </h2>
        <p className="mb-4 text-secondary-text">
          We may update our Privacy Policy to reflect changes in our practices
          or for legal reasons. Updated policies will be posted on this page.
        </p>

        <h2 className="text-2xl text-primary-text font-semibold mt-6 mb-3">
          Contact Us
        </h2>
        <p className="mb-4 text-secondary-text">
          For questions about our Privacy Policy, reach us at{" "}
          <a
            href="mailto:support@e-com.com"
            className="text-primary-brand font-medium"
          >
            support@e-com.com
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
