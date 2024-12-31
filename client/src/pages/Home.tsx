import Hero from "../components/Hero";
import Categories from "../components/Categories";
import FlashSale from "../components/FlashSale";
import ScrollToTop from "../components/ScrollTop";
import Newsletter from "../components/Newsletter";
import AvailableProducts from "./AvalibleProducts";
import RecentlyAdded from "../components/RecentlyAdded";

const Home = () => {
  return (
    <>
      <Hero />
      <AvailableProducts />
      <Categories />
      <FlashSale />
      <RecentlyAdded />
      <Newsletter />
      <ScrollToTop />
    </>
  );
};

export default Home;
