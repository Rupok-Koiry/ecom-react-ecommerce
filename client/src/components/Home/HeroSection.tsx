const HeroSection = () => {
  return (
    <section className="relative bg-primary-background py-12">
      <div className="container mx-auto text-center text-primary-text">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to Our Online Store!
        </h1>
        <p className="mb-6">Find amazing products from your favorite vendors</p>
        <button className="px-6 py-2 bg-primary-brand text-white rounded hover:bg-secondary-brand">
          Shop Now
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
