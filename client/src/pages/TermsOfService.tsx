import React from "react";

const TermsOfService: React.FC = () => {
  return (
    <div className="container bg-primary-background py-8 lg:py-10 px-5 mx-auto">
      <div className="max-w-3xl mx-auto bg-primary-white shadow-md rounded-lg p-8">
        <h2 className="text-3xl text-primary-text font-semibold mb-5 font-playwrite">
          Terms of Service
        </h2>

        <p className="mb-4 text-secondary-text">
          Welcome to{" "}
          <span className="font-medium">
            E-com <span className="text-primary-brand">Platform</span>
          </span>
          ! These terms and conditions outline the rules and regulations for the
          use of our e-commerce platform. By accessing or using our services,
          you agree to be bound by these terms.
        </p>

        <h2 className="text-2xl text-primary-text font-semibold mt-6 mb-3">
          <span className="text-primary-brand">1.</span> General Conditions
        </h2>
        <p className="mb-4 text-secondary-text">
          You must be at least 18 years old to use our platform. By using our
          services, you represent and warrant that you are legally capable of
          entering into binding contracts.
        </p>

        <h2 className="text-2xl text-primary-text font-semibold mt-6 mb-3">
          <span className="text-primary-brand">2.</span> Account Registration
        </h2>
        <p className="mb-4 text-secondary-text">
          To access certain features, you may be required to create an account.
          You agree to provide accurate and complete information and keep your
          account credentials confidential. You are responsible for all
          activities under your account.
        </p>

        <h2 className="text-2xl text-primary-text font-semibold mt-6 mb-3">
          <span className="text-primary-brand">3.</span> Product Listings and
          Availability
        </h2>
        <p className="mb-4 text-secondary-text">
          All products listed on our platform are subject to availability.
          Prices, descriptions, and availability of items may change without
          notice. We reserve the right to refuse or cancel orders at our sole
          discretion.
        </p>

        <h2 className="text-2xl text-primary-text font-semibold mt-6 mb-3">
          <span className="text-primary-brand">4.</span> Payments and Fees
        </h2>
        <p className="mb-4 text-secondary-text">
          All payments must be made in full at the time of purchase. We accept
          various payment methods as specified during checkout. In case of any
          issues with payment, we reserve the right to cancel the order.
        </p>

        <h2 className="text-2xl text-primary-text font-semibold mt-6 mb-3">
          <span className="text-primary-brand">5.</span> Shipping and Delivery
        </h2>
        <p className="mb-4 text-secondary-text">
          We aim to deliver your orders on time. However, delivery timelines may
          vary due to factors beyond our control. Shipping fees and policies
          will be clearly stated during checkout.
        </p>

        <h2 className="text-2xl text-primary-text font-semibold mt-6 mb-3">
          <span className="text-primary-brand">6.</span> Returns and Refunds
        </h2>
        <p className="mb-4 text-secondary-text">
          Products may be returned or refunded in accordance with our return
          policy. Please review the return policy on our website for details
          regarding eligibility, timelines, and conditions.
        </p>

        <h2 className="text-2xl text-primary-text font-semibold mt-6 mb-3">
          <span className="text-primary-brand">7.</span> Prohibited Activities
        </h2>
        <p className="mb-4 text-secondary-text">
          You may not use our platform for any unlawful purposes, infringe on
          intellectual property rights, or engage in fraudulent or harmful
          activities. Violations may result in account termination and legal
          action.
        </p>

        <h2 className="text-2xl text-primary-text font-semibold mt-6 mb-3">
          <span className="text-primary-brand">8.</span> Limitation of Liability
        </h2>
        <p className="mb-4 text-secondary-text">
          E-com is not liable for any direct, indirect, incidental, or
          consequential damages arising from your use of our platform, including
          but not limited to loss of profits, data, or other intangibles.
        </p>

        <h2 className="text-2xl text-primary-text font-semibold mt-6 mb-3">
          <span className="text-primary-brand">9.</span> Governing Law
        </h2>
        <p className="mb-4 text-secondary-text">
          These terms shall be governed by and construed in accordance with the
          laws of the jurisdiction where E-com operates, without regard to its
          conflict of law provisions.
        </p>

        <h2 className="text-2xl text-primary-text font-semibold mt-6 mb-3">
          <span className="text-primary-brand">10.</span> Changes to These Terms
        </h2>
        <p className="mb-4 text-secondary-text">
          We reserve the right to update or modify these terms at any time. Any
          changes will be posted on this page, and your continued use of our
          platform constitutes acceptance of the updated terms.
        </p>

        <h2 className="text-2xl text-primary-text font-semibold mt-6 mb-3">
          <span className="text-primary-brand">11.</span> Contact Us
        </h2>
        <p className="mb-4 text-secondary-text">
          For questions regarding these Terms of Service, please contact us at{" "}
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

export default TermsOfService;
