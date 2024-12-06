import { useNavigate } from "react-router";
import BookingFilter from "./BookingFilter";
const Hero = () => {
  const navigate = useNavigate();
  const handleSubmit = ({
    location,
    type,
  }: {
    location: string;
    type: string;
  }) => {
    navigate(`/booking?location=${location}&type=${type}`);
  };
  return (
    <section className="hero min-h-[85vh] py-8 px-5 md:py-0 md:px-0 flex justify-center items-center text-center rounded-b-xl">
      <div className="max-w-4xl">
        <h2 className="text-3xl lg:text-4xl xl:text-5xl text-white font-bold mb-8 capitalize tracking-wide">
          Drive Your Dream Car Today
        </h2>
        <p className="text-zinc-100 md:text-lg my-5">
          Explore our extensive fleet of luxury and economy vehicles. Whether
          it's a weekend getaway or a business trip, Drive Now has the perfect
          car waiting for you.
        </p>
        <BookingFilter
          onSubmit={handleSubmit}
          buttonText="Book Now"
          showFeatures={false}
        />
      </div>
    </section>
  );
};

export default Hero;
