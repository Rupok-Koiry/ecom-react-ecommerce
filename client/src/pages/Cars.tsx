import CarFilters from "../components/CarFilters";
import CarList from "../components/CarList";
import { useNavigate } from "react-router";

const Cars = () => {
  const navigate = useNavigate();
  return (
    <main className="py-12 lg:py-8">
      <CarFilters />
      <CarList
        buttonText="View Details"
        onButtonClick={(car) => navigate(`/car/${car._id}`)}
      />
    </main>
  );
};

export default Cars;
