import CarList from "./CarList";
import { useNavigate } from "react-router";

const FeaturedCars = () => {
  const navigate = useNavigate();

  return (
    <section>
      <div className="container mx-auto py-12 lg:py-16 ">
        <h2 className="text-3xl text-primary-text text-center font-semibold mb-4">
          Featured Cars
        </h2>
        <CarList
          buttonText="View Details"
          onButtonClick={(car) => navigate(`/car/${car._id}`)}
          carCount={6}
        />
      </div>
    </section>
  );
};

export default FeaturedCars;
