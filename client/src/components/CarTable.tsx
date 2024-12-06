import { FaPlus, FaRegPenToSquare, FaRegTrashCan } from "react-icons/fa6";
import { CarTypes } from "../constants/types";
import { useCars } from "../hooks/cars/useCars";
import Button from "./Button";
import { useDeleteCar } from "../hooks/cars/useDeleteCar";
import { useState } from "react";
import CarModal from "./modals/CarModal";
import Spinner from "./Spinner";
import ErrorMessage from "./ErrorMessage";

const getStatusBadgeColor = (status: string) => {
  switch (status) {
    case "available":
      return "bg-primary-green text-white";
    case "unavailable":
      return "bg-primary-red text-white";
    default:
      return "bg-secondary-grey text-white";
  }
};

const CarTable = () => {
  const { cars, error, isLoading } = useCars();
  const { deleteCar } = useDeleteCar();
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [selectedCar, setSelectedCar] = useState<CarTypes | null>(null);
  if (isLoading) return <Spinner />;
  if (error) return <ErrorMessage message={error.message} />;
  if (!cars.length) return <ErrorMessage message={"No Cars Found"} />;
  return (
    <div className="shadow overflow-x-auto rounded-lg">
      <table className="min-w-full text-sm text-secondary-text">
        <thead className="bg-secondary-background text-xs uppercase font-medium text-primary-text">
          <tr>
            <th></th>
            <th
              scope="col"
              className="px-6 py-3 text-left tracking-wider whitespace-nowrap"
            >
              Car Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left tracking-wider whitespace-nowrap"
            >
              Description
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left tracking-wider whitespace-nowrap"
            >
              Color
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left tracking-wider whitespace-nowrap"
            >
              Type
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left tracking-wider whitespace-nowrap"
            >
              Price Per Hour
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left tracking-wider whitespace-nowrap"
            >
              Status
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left tracking-wider whitespace-nowrap flex items-center gap-3"
            >
              Actions
              <Button
                className="text-sm py-2 px-2"
                onClick={() => {
                  setSelectedCar(null);
                  setModalIsOpen(true);
                }}
              >
                <FaPlus />
              </Button>
            </th>
          </tr>
        </thead>
        <tbody className="bg-primary-background">
          {cars.map((car: CarTypes, index: number) => (
            <tr
              key={car._id}
              className={`${
                index % 2 === 0 ? "bg-secondary-background bg-opacity-20" : ""
              }`}
            >
              <td className="pl-4">{index + 1}</td>
              <td className="px-6 py-4 whitespace-nowrap">{car.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{car.description}</td>
              <td className="px-6 py-4 whitespace-nowrap">{car.color}</td>
              <td className="px-6 py-4 whitespace-nowrap">{car.type}</td>
              <td className="px-6 py-4 whitespace-nowrap text-primary-green">
                ${car.pricePerHour}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium uppercase ${getStatusBadgeColor(
                    car.status
                  )}`}
                >
                  {car.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap flex gap-2 items-center">
                <Button
                  className="text-sm py-2 px-2"
                  onClick={() => {
                    setSelectedCar(car);
                    setModalIsOpen(true);
                  }}
                >
                  <FaRegPenToSquare />
                </Button>
                <Button
                  className="text-sm py-2 px-2"
                  onClick={() => deleteCar(car._id)}
                >
                  <FaRegTrashCan />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <CarModal
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
        car={selectedCar}
      />
    </div>
  );
};

export default CarTable;
