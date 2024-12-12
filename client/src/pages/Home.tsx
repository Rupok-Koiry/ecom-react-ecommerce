import Hero from "../components/Hero";
import Categories from "../components/Home/Categories";
import FlashSale from "../components/Home/FlashSale";
import ScrollToTop from "../components/Home/ScrollTop";
import AvailableProducts from "./AvalibleProducts";

const Home = () => {
  return (
    <>
      <Hero />
      <AvailableProducts />
      <Categories />
      <FlashSale />
      <ScrollToTop />
    </>
  );
};

export default Home;
