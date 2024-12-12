import Hero from "../components/Hero";
import Categories from "../components/Home/Categories";
import ScrollToTop from "../components/Home/ScrollTop";
import AvailableProducts from "./AvalibleProducts";

const Home = () => {
  return (
    <>
      <Hero />
      <AvailableProducts />
      <Categories />
      <ScrollToTop />
    </>
  );
};

export default Home;
