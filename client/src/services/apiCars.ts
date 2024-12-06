import { CarFiltersTypes, CarTypes } from "../constants/types";
import handleApiRequest from "../utils/handleApiRequest";
import api from "./api";

export async function getAllCars(filters: CarFiltersTypes) {
  const { search, type, price, status, features } = filters;

  const response = await handleApiRequest(
    api.get("/cars", {
      params: {
        search,
        type,
        price,
        status,
        features,
      },
    })
  );

  return response.data.data;
}

export async function getCars(cardId: string) {
  const response = await handleApiRequest(api.get(`/cars/${cardId}`));
  return response.data.data;
}

export async function createCar(newCar: Omit<CarTypes, "_id">) {
  const response = await handleApiRequest(api.post("/cars", newCar));
  return response.data.data;
}
export async function updateCar({
  newCar,
  carId,
}: {
  newCar: Partial<CarTypes>;
  carId: string;
}) {
  const response = await handleApiRequest(api.patch(`/cars/${carId}`, newCar));
  return response.data.data;
}

export async function deleteCar(carId: string) {
  const response = await handleApiRequest(api.delete(`/cars/${carId}`));
  return response.data.data;
}

export async function returnCar(payload: {
  bookingId: string;
  endDate: string;
}) {
  const response = await handleApiRequest(api.patch(`/cars/return`, payload));
  return response.data.data;
}
