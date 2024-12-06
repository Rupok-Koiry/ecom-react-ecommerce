export type UserTypes = {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  password: string;
  phone?: string;
  address?: string;
};
export type CarTypes = {
  _id: string;
  name: string;
  images: string[];
  description: string;
  color: string;
  type: string;
  status: "available" | "unavailable";
  features: string[];
  pricePerHour: number;
};
export type CarFiltersTypes = {
  search: string | null;
  type: string | null;
  price: string | null;
  status: string | null;
  features: string | null;
};
export type BookingStatusTypes =
  | "pending"
  | "approved"
  | "cancelled"
  | "completed";

export type BookingTypes = {
  _id: string;
  user: string;
  car: string;
  startDate: string;
  endDate?: string;
  totalCost: number;
  status: BookingStatusTypes;
  isPaid?: boolean;
};

export type SubmitBookingTypes = {
  card: string;
  passport: string;
  drivingLicense: string;
  closeModal: () => void;
};

export type ThemeTypes = "light" | "dark" | "system";
