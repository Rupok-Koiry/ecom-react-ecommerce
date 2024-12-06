import { FaHeart } from "react-icons/fa";
import { CarTypes } from "../constants/types";
import { useCars } from "../hooks/cars/useCars";
import Button from "./Button";
import Spinner from "./Spinner";
import ErrorMessage from "./ErrorMessage";
type CarListProps = {
  buttonText: string;
  onButtonClick: (car: CarTypes) => void;
  carCount?: number;
};

function CarList({ buttonText, onButtonClick, carCount }: CarListProps) {
  const { cars, error, isLoading } = useCars();
  const displayedCars = carCount ? cars?.slice(0, carCount) : cars;

  if (isLoading) return <Spinner />;
  if (error) return <ErrorMessage message={`${error.message}!`} />;
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 container px-5 mx-auto">
      {displayedCars?.map((car: CarTypes) => (
        <div
          className="bg-primary-white border border-secondary-grey rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105"
          key={car._id}
        >
          <div className="relative">
            <img
              src={car.images[0]}
              alt={car.name}
              className="w-full h-52 object-cover"
            />
            <button className="absolute top-2 right-2 bg-primary-white p-2 rounded-full shadow-lg hover:scale-90 transition-all">
              <FaHeart className="text-primary-red" />
            </button>
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold text-primary-text">
              {car.name}
            </h3>
            <div className="flex gap-5 items-center my-2">
              <p className="text-primary-grey uppercase">{car.type}</p>
              <p className="text-primary-orange font-bold">
                ${car.pricePerHour} / Hours
              </p>
            </div>
            <p className="text-secondary-text mb-4">{car.description}</p>
            <Button onClick={() => onButtonClick(car)}>{buttonText}</Button>
          </div>
        </div>
      ))}
    </section>
  );
}

export default CarList;
