import FeaturedCars from "../components/FeaturedCars";
import Hero from "../components/Hero";
import Testimonials from "../components/Testimonials";
import WhyUs from "../components/WhyUs";

const Home = () => {
  return (
    <div>
      <Hero />
      <FeaturedCars />
      <WhyUs />
      <Testimonials />
    </div>
  );
};

export default Home;
