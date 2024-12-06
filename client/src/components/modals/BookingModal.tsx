import React, { useState } from "react";
import Modal from "react-modal";
import { AnimatePresence, motion } from "framer-motion";
import { RxCross2 } from "react-icons/rx";
import { FaCar, FaPalette, FaDollarSign, FaCheckCircle } from "react-icons/fa";
import Button from "../Button";
import { CarTypes } from "../../constants/types";

interface BookingModalProps {
  modalIsOpen: boolean;
  setModalIsOpen: (value: boolean) => void;
  car: CarTypes | null;
  handleSubmitBooking?: () => void;
  loading?: boolean;
}

const BookingModal: React.FC<BookingModalProps> = ({
  modalIsOpen,
  setModalIsOpen,
  car,
  handleSubmitBooking,
  loading = false,
}) => {
  const [card, setCard] = useState("");
  const [passport, setPassport] = useState("");
  const [drivingLicense, setDrivingLicense] = useState("");

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (handleSubmitBooking) {
      handleSubmitBooking();
    }
  };

  return (
    <AnimatePresence>
      {modalIsOpen && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Booking"
          className="container z-50 mx-5"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.3 }}
            className="relative md:w-2/3 mx-auto max-h-[80vh] overflow-auto rounded-lg bg-primary-background p-8 shadow-lg"
          >
            <button
              onClick={closeModal}
              className="absolute right-3 top-3 rounded-full bg-primary-white p-2 text-xl text-primary-grey shadow-lg transition-transform duration-300 will-change-transform hover:scale-90 lg:text-2xl"
            >
              <RxCross2 />
            </button>
            <div className="text-primary-text mb-3">
              <h2 className="text-3xl font-semibold mb-4 flex items-center gap-2">
                <FaCar className="text-primary-orange" /> {car?.name}
              </h2>
              <p className="text-lg mb-4 text-secondary-text">
                {car?.description}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <p className="text-lg mb-2 flex items-center gap-2">
                  <FaPalette className="text-primary-grey" />{" "}
                  <span className="font-semibold">Color:</span> {car?.color}
                </p>
                <p className="text-lg mb-2 flex items-center gap-2">
                  <FaCar className="text-primary-grey" />{" "}
                  <span className="font-semibold">Type:</span> {car?.type}
                </p>
                <p className="text-lg mb-2 flex items-center gap-2">
                  <FaDollarSign className="text-primary-green" />{" "}
                  <span className="font-semibold">Price per Hour:</span> $
                  {car?.pricePerHour}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-5">
                {car?.features.map((feature, index) => (
                  <div className="flex items-center" key={index}>
                    <FaCheckCircle
                      className="mr-2 text-primary-green"
                      size={24}
                    />

                    <p className="text-lg text-primary-text flex items-center capitalize">
                      {feature?.split("-")?.join(" ")}{" "}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            {/* Car Booking Form */}
            <form className="space-y-4" onSubmit={handleFormSubmit}>
              {/* Personal Details Section */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-primary-text">
                  Card Number
                </label>
                <input
                  type="text"
                  placeholder="Enter Card Number"
                  className="w-full border-secondary-grey rounded-md shadow-sm focus:border-primary-orange border outline-none py-1.5 lg:py-2 px-3"
                  value={card}
                  onChange={(e) => setCard(e.target.value)}
                  required
                />
                <label className="block text-sm font-medium text-primary-text">
                  Passport
                </label>
                <input
                  type="text"
                  placeholder="Enter NID or Passport Number"
                  className="w-full border-secondary-grey rounded-md shadow-sm focus:border-primary-orange border outline-none py-1.5 lg:py-2 px-3"
                  value={passport}
                  onChange={(e) => setPassport(e.target.value)}
                  required
                />
                <label className="block text-sm font-medium text-primary-text">
                  Driving License
                </label>
                <input
                  type="text"
                  placeholder="Enter Driving License Number"
                  className="w-full border-secondary-grey rounded-md shadow-sm focus:border-primary-orange border outline-none py-1.5 lg:py-2 px-3"
                  value={drivingLicense}
                  onChange={(e) => setDrivingLicense(e.target.value)}
                  required
                />
              </div>

              {/* Submit Button */}
              <Button className="w-full" loading={loading} disabled={loading}>
                Confirm Booking
              </Button>
              <footer className="mt-4 text-center text-sm text-secondary-text font-medium">
                <a
                  href="/privacy-policy"
                  className="hover:text-primary-orange transition-all duration-300"
                >
                  Privacy Policy
                </a>{" "}
                |{" "}
                <a
                  href="/terms-of-service"
                  className="hover:text-primary-orange transition-all duration-300"
                >
                  Terms of Service
                </a>
              </footer>
            </form>
          </motion.div>
        </Modal>
      )}
    </AnimatePresence>
  );
};

export default BookingModal;
