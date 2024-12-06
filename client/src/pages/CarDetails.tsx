import {
  FaCar,
  FaPalette,
  FaDollarSign,
  FaCheckCircle,
  FaTimesCircle,
  FaStar,
  FaShieldAlt,
  FaStarHalfAlt,
  FaRegStar,
} from "react-icons/fa";
import { useCar } from "../hooks/cars/useCar";
import { getRandomReviews } from "../constants/reviews";
import Button from "../components/Button";
import { CarTypes } from "../constants/types";
import Magnifier from "../components/Magnifier";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";
import { Navigate } from "react-router";

const CarDetailsPage = () => {
  const {
    car,
    error,
    isLoading,
  }: {
    car: CarTypes | null;
    error: Error | null;
    isLoading: boolean;
  } = useCar();

  if (isLoading) return <Spinner className="h-screen" />;
  if (error) return <ErrorMessage message={`${error.message}!`} />;

  if (!car) return <Navigate to="/404" />;

  return (
    <section className="bg-primary-background p-6 container mx-auto">
      <div className="max-w-6xl mx-auto bg-primary-white shadow-lg rounded-lg p-8">
        {/* Car Image Gallery */}
        <div className="mb-8">
          <div className="flex justify-center">
            <Swiper
              navigation={true}
              modules={[Navigation]}
              className="mySwiper"
              style={
                {
                  "--swiper-navigation-color": "#d17842",
                } as React.CSSProperties
              }
            >
              {car.images.map((image: string, index: number) => (
                <SwiperSlide key={index}>
                  <div className="flex justify-center items-center">
                    <Magnifier src={image} alt={car.name} />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        {/* Car Information */}
        <div className="text-primary-text mb-8">
          <h2 className="text-3xl font-semibold mb-4 flex items-center gap-2">
            <FaCar className="text-primary-orange" /> {car.name}
          </h2>
          <p className="text-lg mb-4 text-secondary-text">{car.description}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <p className="text-lg mb-2 flex items-center gap-2">
              <FaPalette className="text-primary-grey" />{" "}
              <span className="font-semibold">Color:</span> {car.color}
            </p>
            <p className="text-lg mb-2 flex items-center gap-2">
              <FaCar className="text-primary-grey" />{" "}
              <span className="font-semibold">Type:</span> {car.type}
            </p>
            <p className="text-lg mb-2 flex items-center gap-2">
              <FaDollarSign className=" text-primary-green" />{" "}
              <span className="font-semibold">Price per Hour:</span> $
              {car.pricePerHour}
            </p>
            <p
              className={`text-lg font-semibold flex items-center uppercase ${
                car.status === "available"
                  ? "text-primary-green"
                  : "text-primary-red"
              }`}
            >
              {car.status === "available" ? (
                <FaCheckCircle className="mr-2" />
              ) : (
                <FaTimesCircle className="mr-2" />
              )}
              {car.status}
            </p>
          </div>
        </div>

        {/* Additional Options */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 flex items-center text-primary-text">
            <FaShieldAlt className="mr-2 text-primary-orange" /> Additional
            Features
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {car.features.map((feature, index) => (
              <div className="flex items-center" key={index}>
                <FaCheckCircle className="mr-2 text-primary-green" size={24} />

                <p className="text-lg text-primary-text flex items-center capitalize">
                  {feature?.split("-")?.join(" ")}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Reviews */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 flex items-center text-primary-text">
            <FaStar className="mr-2 text-primary-orange" /> Customer Reviews
          </h2>
          <div className="space-y-6">
            {getRandomReviews().map((review, index) => (
              <div
                className="bg-secondary-background p-4 rounded-lg shadow-md"
                key={index}
              >
                <div className="flex justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <img
                      src={review.image}
                      alt={review.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <span className="ml-2 text-lg font-medium text-secondary-text">
                      {review.name}
                    </span>
                  </div>
                  <div className="flex items-center mb-2 gap-0.5">
                    {Array.from({ length: 5 }, (_, i) => {
                      if (i < Math.floor(review.rating)) {
                        return (
                          <FaStar key={i} className="text-primary-orange" />
                        );
                      } else if (i < review.rating) {
                        return (
                          <FaStarHalfAlt
                            key={i}
                            className="text-primary-orange"
                          />
                        );
                      } else {
                        return <FaRegStar key={i} className="text-gray-400" />;
                      }
                    })}
                  </div>
                </div>
                <p className="text-primary-text">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Book Now Button */}
        <div className="flex justify-center">
          <Button
            className="text-lg"
            href="/booking"
            disabled={car.status === "unavailable"}
          >
            <FaCar className="mr-2" /> Book Now
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CarDetailsPage;
