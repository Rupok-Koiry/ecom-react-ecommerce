import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "../components/Button";
import { useMe } from "../hooks/auth/useMe";
import { useEffect } from "react";
import { useUpdateMe } from "../hooks/auth/useUpdateMe";
import BookingTable from "../components/BookingTable";
import StatsCard from "../components/StatsCard";
import {
  FaCar,
  FaMoneyBillWave,
  FaClipboardList,
  FaHourglassHalf,
} from "react-icons/fa";
import { useBookings } from "../hooks/bookings/useBookings";
import { useCars } from "../hooks/cars/useCars";
import { BookingTypes } from "../constants/types";

interface IFormInput {
  name: string;
  email: string;
  phone: string;
  address: string;
}

const schema: yup.ObjectSchema<IFormInput> = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  phone: yup.string().required("Phone number is required"),
  address: yup.string().required("Address is required"),
});

const Dashboard = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });
  const { bookings } = useBookings();
  const { cars } = useCars();
  const { user } = useMe();
  const { isUpdating, updateUser } = useUpdateMe();

  useEffect(() => {
    if (!user) return;
    reset(user);
  }, [reset, user]);
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    updateUser(data);
  };

  return (
    <section className="lg:py-10 py-8">
      {user.role === "admin" ? (
        <div className="bg-primary-background">
          {/* Header */}
          <h2 className="text-2xl lg:text-3xl font-semibold text-center text-primary-text mb-8">
            Dashboard Overview
          </h2>

          {/* Stats Section */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <StatsCard
              title="Total Bookings"
              value={bookings?.length || 0}
              textColor="text-primary-blue"
              borderColor="border-primary-blue"
              icon={<FaClipboardList size={30} />}
            />
            <StatsCard
              title="Available Cars"
              value={cars?.length || 0}
              textColor="text-primary-green"
              borderColor="border-primary-green"
              icon={<FaCar size={30} />}
            />
            <StatsCard
              title="Total Revenue"
              value={`$${
                bookings
                  ?.filter(
                    (booking: BookingTypes) => booking.status === "completed"
                  )
                  .reduce(
                    (acc: number, booking: BookingTypes) =>
                      acc + booking.totalCost,
                    0
                  ) || 0
              }`}
              textColor="text-primary-orange"
              borderColor="border-primary-orange"
              icon={<FaMoneyBillWave size={30} />}
            />
            <StatsCard
              title="Pending Requests"
              value={
                bookings?.filter(
                  (booking: BookingTypes) => booking.status === "pending"
                ).length || 0
              }
              textColor="text-primary-red"
              borderColor="border-primary-red"
              icon={<FaHourglassHalf size={30} />}
            />
          </section>
        </div>
      ) : (
        <div className="lg:grid lg:grid-cols-2 gap-8 items-center">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 mb-8 lg:mb-0"
          >
            <h2 className="text-2xl lg:text-3xl font-semibold text-center text-primary-text mb-3">
              Profile
            </h2>
            <div>
              <label className="block text-sm font-medium text-primary-text mb-2">
                Name
              </label>
              <input
                type="text"
                {...register("name")}
                className="w-full mb-0.5 border-secondary-grey rounded-md shadow-sm focus:border-primary-orange border outline-none py-1.5 lg:py-2 px-3"
              />
              {errors.name && (
                <p className="text-primary-red text-xs">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-primary-text mb-2">
                Email Address
              </label>
              <input
                type="email"
                {...register("email")}
                className="w-full mb-0.5 border-secondary-grey rounded-md shadow-sm focus:border-primary-orange border outline-none py-1.5 lg:py-2 px-3"
              />
              {errors.email && (
                <p className="text-primary-red text-xs">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-primary-text mb-2">
                Phone
              </label>
              <input
                type="tel"
                {...register("phone")}
                className="w-full mb-0.5 border-secondary-grey rounded-md shadow-sm focus:border-primary-orange border outline-none py-1.5 lg:py-2 px-3"
              />
              {errors.phone && (
                <p className="text-primary-red text-xs">
                  {errors.phone.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-primary-text mb-2">
                Address
              </label>
              <input
                type="text"
                {...register("address")}
                className="w-full mb-0.5 border-secondary-grey rounded-md shadow-sm focus:border-primary-orange border outline-none py-1.5 lg:py-2 px-3"
              />
              {errors.address && (
                <p className="text-primary-red text-xs">
                  {errors.address.message}
                </p>
              )}
            </div>
            <Button
              className="w-full"
              loading={isUpdating}
              disabled={isUpdating}
            >
              Submit
            </Button>
          </form>
          <div>
            <h2 className="text-2xl lg:text-3xl font-semibold text-center text-primary-text mb-5">
              Booking History
            </h2>
            <BookingTable showAction={false} />
            <Button href="/dashboard/manage-bookings" className="mt-3 w-full">
              Manage Booking
            </Button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Dashboard;
