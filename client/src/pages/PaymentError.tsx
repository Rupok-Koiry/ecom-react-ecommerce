import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { IoCloseCircle } from "react-icons/io5";

const PaymentError = () => {
  const navigate = useNavigate();

  // Animation Variants for Framer Motion
  const containerVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        delay: 0.2,
      },
    },
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 10,
      },
    },
  };

  return (
    <div className="flex items-center justify-center py-12 lg:py-16 bg-secondary-background text-primary-text">
      <motion.div
        className="p-8 bg-white shadow-lg rounded-lg flex flex-col items-center text-center border border-red-300"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={iconVariants} initial="hidden" animate="visible">
          <IoCloseCircle className="text-red-600 mb-4" size={80} />
        </motion.div>
        <h1 className="text-3xl font-bold text-red-600 mb-2">Payment Failed</h1>
        <p className="text-gray-600 mb-6">
          Unfortunately, your payment could not be processed. Please try again
          or contact support.
        </p>

        <Button onClick={() => navigate("/")}>Go to Home</Button>
      </motion.div>
    </div>
  );
};

export default PaymentError;
