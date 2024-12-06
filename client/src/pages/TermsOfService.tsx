import React from "react";

const TermsOfService: React.FC = () => {
  return (
    <div className="container bg-primary-background py-8 lg:py-10 px-5 mx-auto">
      <div className="max-w-3xl mx-auto bg-primary-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl text-primary-text font-semibold mb-6">
          Terms of Service
        </h1>

        <p className="mb-4 text-secondary-text">
          Welcome to{" "}
          <span className="font-medium">
            Drive <span className="text-primary-orange">Now</span>
          </span>
          ! These terms and conditions outline the rules and regulations for the
          use of our car rental services. By accessing or using our services,
          you agree to be bound by these terms.
        </p>

        <h2 className="text-2xl text-primary-text font-semibold mt-6 mb-3">
          <span className="text-primary-orange">1.</span> General Conditions
        </h2>
        <p className="mb-4 text-secondary-text">
          You must be at least 18 years old to use our services. By using our
          services, you represent and warrant that you are legally capable of
          entering into binding contracts.
        </p>

        <h2 className="text-2xl text-primary-text font-semibold mt-6 mb-3">
          <span className="text-primary-orange">2.</span> Use of Services
        </h2>
        <p className="mb-4 text-secondary-text">
          Our vehicles are available for rent subject to availability. You agree
          to return the vehicle in the same condition as you received it, except
          for normal wear and tear. You are responsible for any damage or loss
          that occurs during your rental period.
        </p>

        <h2 className="text-2xl text-primary-text font-semibold mt-6 mb-3">
          <span className="text-primary-orange">3.</span> Payment and Fees
        </h2>
        <p className="mb-4 text-secondary-text">
          All payments must be made in full at the time of booking. Additional
          fees may apply for late returns, damages, or other incidents. You
          agree to pay any applicable fees promptly.
        </p>

        <h2 className="text-2xl text-primary-text font-semibold mt-6 mb-3">
          <span className="text-primary-orange">4.</span> Cancellations and
          Refunds
        </h2>
        <p className="mb-4 text-secondary-text">
          You may cancel your booking at any time before the rental period
          begins. Cancellations made less than 24 hours before the start of the
          rental period may be subject to a cancellation fee. Refunds will be
          processed according to our refund policy.
        </p>

        <h2 className="text-2xl text-primary-text font-semibold mt-6 mb-3">
          <span className="text-primary-orange">5.</span> Prohibited Activities
        </h2>
        <p className="mb-4 text-secondary-text">
          You may not use our vehicles for any illegal activities, racing,
          towing, or any other activities that may cause harm or damage to the
          vehicle or others. Violation of this provision may result in immediate
          termination of your rental and additional charges.
        </p>

        <h2 className="text-2xl text-primary-text font-semibold mt-6 mb-3">
          <span className="text-primary-orange">6.</span> Limitation of
          Liability
        </h2>
        <p className="mb-4 text-secondary-text">
          Drive Now is not liable for any direct, indirect, incidental, or
          consequential damages arising out of your use of our services,
          including but not limited to damages for loss of profits, data, or
          other intangibles.
        </p>

        <h2 className="text-2xl text-primary-text font-semibold mt-6 mb-3">
          <span className="text-primary-orange">7.</span> Governing Law
        </h2>
        <p className="mb-4 text-secondary-text">
          These terms shall be governed by and construed in accordance with the
          laws of the jurisdiction in which Drive Now operates, without regard
          to its conflict of law provisions.
        </p>

        <h2 className="text-2xl text-primary-text font-semibold mt-6 mb-3">
          <span className="text-primary-orange">8.</span> Changes to These Terms
        </h2>
        <p className="mb-4 text-secondary-text">
          We reserve the right to modify these terms at any time. Any changes
          will be posted on this page, and your continued use of our services
          after the changes are posted will constitute your acceptance of the
          new terms.
        </p>

        <h2 className="text-2xl text-primary-text font-semibold mt-6 mb-3">
          <span className="text-primary-orange">9.</span> Contact Us
        </h2>
        <p className="mb-4 text-secondary-text">
          If you have any questions about these Terms of Service, please contact
          us at{" "}
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

export default TermsOfService;
