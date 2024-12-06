import React, { useState } from "react";
import Modal from "react-modal";
import { AnimatePresence, motion } from "framer-motion";
import { RxCross2 } from "react-icons/rx";
import Button from "../Button";
import { BookingTypes, CarTypes } from "../../constants/types";

interface ReturnCarModalProps {
  modalIsOpen: boolean;
  setModalIsOpen: (value: boolean) => void;
  booking:
    | (BookingTypes & {
        car: CarTypes;
      })
    | null;
  onReturnCar: (endDate: string) => void;
  loading?: boolean;
}

const ReturnCarModal: React.FC<ReturnCarModalProps> = ({
  modalIsOpen,
  setModalIsOpen,
  booking,
  onReturnCar,
  loading = false,
}) => {
  const [endDate, setEndDate] = useState("");

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onReturnCar(endDate);
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
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                Return {booking?.car.name}
              </h2>
            </div>
            {/* Car Booking Form */}
            <form className="space-y-4" onSubmit={handleFormSubmit}>
              {/* Personal Details Section */}
              <label className="block text-sm font-medium text-primary-text">
                End Date
              </label>
              <input
                type="datetime-local"
                placeholder="Enter Card Number"
                className="w-full border-secondary-grey rounded-md shadow-sm focus:border-primary-orange border outline-none py-1.5 lg:py-2 px-3"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />

              {/* Submit Button */}
              <Button className="w-full" loading={loading} disabled={loading}>
                Return Car
              </Button>
            </form>
          </motion.div>
        </Modal>
      )}
    </AnimatePresence>
  );
};

export default ReturnCarModal;
