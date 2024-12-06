const Fleet = () => {
  const carTypes = [
    {
      type: "Economy",
      icon: "🚗",
      description: "Fuel-efficient cars for budget-conscious travelers",
    },
    {
      type: "Luxury",
      icon: "🏎️",
      description: "Premium vehicles for a touch of elegance",
    },
    {
      type: "SUVs",
      icon: "🚙",
      description:
        "Spacious and versatile for family trips or outdoor adventures",
    },
    /* {
      type: "Vans",
      icon: "🚐",
      description: "Perfect for group travel or moving large items",
    }, */
    {
      type: "Electric",
      icon: "🔋",
      description: "Eco-friendly options for sustainable travel",
    },
  ];
  return (
    <section className="bg-primary-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold text-primary-text mb-4">
        Our Fleet
      </h2>
      <p className="text-secondary-text mb-6">
        At <span className="font-medium">Drive</span>{" "}
        <span className="text-primary-orange font-medium">Now</span>, we offer a
        diverse range of vehicles to suit every need and preference:
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {carTypes.map((car, index) => (
          <div key={index} className="bg-secondary-background p-4 rounded-lg">
            <div className="text-3xl mb-2">{car.icon}</div>
            <h3 className="font-semibold text-primary-text mb-1">{car.type}</h3>
            <p className="text-sm text-secondary-text">{car.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Fleet;
