import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { IoCheckmarkCircle } from "react-icons/io5";

const PaymentSuccess = () => {
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
    <div className="flex items-center justify-center py-10 lg:py-14 bg-primary-background text-primary-text px-5">
      <motion.div
        className="p-6 lg:p-8 bg-primary-white shadow-lg rounded-lg flex flex-col items-center text-center border border-success-color"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={iconVariants} initial="hidden" animate="visible">
          <IoCheckmarkCircle className="text-success-color mb-4" size={80} />
        </motion.div>
        <h1 className="text-3xl font-bold text-success-color mb-2">
          Payment Successful!
        </h1>
        <p className="text-primary-grey  mb-6">
          Thank you for your payment. Your transaction has been completed
          successfully.
        </p>

        <Button onClick={() => navigate("/")}>Go to Home</Button>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;
