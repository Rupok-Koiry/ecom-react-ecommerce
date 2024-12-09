// import FeaturedCars from "../components/FeaturedCars";
// import Hero from "../components/Hero";
// import Testimonials from "../components/Testimonials";
// import WhyUs from "../components/WhyUs";

import Categories from "../components/Home/Categories";
import HeroSection from "../components/Home/HeroSection";
import ScrollToTop from "../components/Home/ScrollTop";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <Categories />
      <ScrollToTop />
      {/* <Hero />
      <FeaturedCars />
      <WhyUs />
      <Testimonials /> */}
    </div>
  );
};

export default Home;
