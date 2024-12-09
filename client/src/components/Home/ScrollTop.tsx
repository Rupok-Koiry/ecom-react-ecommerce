import { useScroll, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { FaArrowUpLong } from "react-icons/fa6";
import { Link } from "react-scroll";

const ScrollTop = () => {
  const { scrollYProgress } = useScroll();
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [showButton, setShowButton] = useState(false);

  const circumference = 24 * 2 * Math.PI;

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const percentage = Math.floor(latest * 100);
      setScrollPercentage(percentage);
      setShowButton(percentage > 12);
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <Link to="home" smooth={true} duration={500}>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: showButton ? 0 : 100, opacity: showButton ? 1 : 0 }}
        className="fixed bottom-8 right-8 z-20 inline-flex cursor-pointer items-center justify-center rounded-full bg-primary-brand"
      >
        <svg className="h-14 w-14">
          {/* Define the linear gradient */}
          <defs>
            <linearGradient
              id="scrollGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop
                offset="0%"
                style={{ stopColor: "var(--primary-brand)", stopOpacity: 1 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: "var(--secondary-brand)", stopOpacity: 1 }}
              />
            </linearGradient>
          </defs>
          {/* Background circle */}
          <circle
            className="text-secondary-grey"
            strokeWidth="3"
            stroke="currentColor"
            fill="transparent"
            r="24"
            cx="28"
            cy="28"
          />
          {/* Progress circle with gradient */}
          <circle
            className="text-primary-brand"
            strokeWidth="3"
            strokeDasharray={circumference}
            strokeDashoffset={
              circumference - (scrollPercentage / 100) * circumference
            }
            strokeLinecap="round"
            stroke="url(#scrollGradient)"
            fill="transparent"
            r="24"
            cx="28"
            cy="28"
          />
        </svg>
        {/* Scroll-to-top icon */}
        <span className="absolute text-2xl text-primary-white">
          <FaArrowUpLong />
        </span>
      </motion.div>
    </Link>
  );
};

export default ScrollTop;
