import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="hero min-h-[65vh] py-8 px-5 md:py-0 md:px-0 flex justify-center items-center text-center rounded-b-xl">
      <div className="max-w-4xl">
        <h2 className="text-3xl lg:text-4xl xl:text-5xl text-white font-bold mb-8 capitalize tracking-wide font-playwrite ">
          Welcome to Our Online Store!
        </h2>
        <p className="text-zinc-100 md:text-lg my-5">
          Find amazing products from your favorite vendors. Shop now and get the
          best deals on all products.
        </p>
        <Link
          to="/products"
          className="px-6 py-2 bg-primary-brand text-white rounded hover:bg-secondary-brand"
        >
          Shop Now
        </Link>
      </div>
    </section>
  );
};

export default Hero;
