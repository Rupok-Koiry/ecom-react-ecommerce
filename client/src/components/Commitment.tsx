import { FaCar } from "react-icons/fa6";
import { FaHandshake, FaLeaf, FaShieldAlt } from "react-icons/fa";
const Commitment = () => {
  const values = [
    {
      title: "Exceptional Service",
      icon: <FaHandshake />,
      description: "We prioritize customer satisfaction above all else",
    },
    {
      title: "Sustainability",
      icon: <FaLeaf />,
      description: "Committed to reducing our environmental impact",
    },
    {
      title: "Safety First",
      icon: <FaShieldAlt />,
      description: "Ensuring the well-being of our customers on every journey",
    },
    {
      title: "Transparency",
      icon: <FaCar />,
      description: "Clear and honest pricing with no hidden fees",
    },
  ];
  return (
    <section className="bg-primary-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold text-primary-text mb-4">
        Values & Commitment
      </h2>
      <p className="text-secondary-text mb-6">
        At <span className="font-medium">Drive</span>{" "}
        <span className="text-primary-orange font-medium">Now</span>, we are
        committed to upholding these core values:
      </p>
      <div className="space-y-4">
        {values.map((value, index) => (
          <div key={index} className="flex items-start">
            <div className="text-primary-orange text-2xl mr-4">
              {value.icon}
            </div>
            <div>
              <h3 className="font-semibold text-primary-text mb-1">
                {value.title}
              </h3>
              <p className="text-sm text-secondary-text">{value.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Commitment;
