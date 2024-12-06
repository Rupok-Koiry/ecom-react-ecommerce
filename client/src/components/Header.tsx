import { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/driveNow.png";
import ThemeButton from "./ThemeButton";
import { useMe } from "../hooks/auth/useMe";
import { HashLink } from "react-router-hash-link";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useMe();
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menuVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: {
      height: "auto",
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
    exit: {
      height: 0,
      opacity: 0,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  };
  const scrollWithOffset = (el: HTMLElement) => {
    const yOffset = -60;
    const yCoordinate =
      el.getBoundingClientRect().top + window.scrollY + yOffset;
    window.scrollTo({ top: yCoordinate, behavior: "smooth" });
  };
  return (
    <header className="sticky top-0 z-10">
      <nav className="bg-secondary-background navbar shadow-sm">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" className="flex gap-3 items-center">
            <img src={logo} alt="logo" className="h-14" />
          </Link>
          <div className="flex items-center space-x-4">
            <div className="md:hidden" onClick={toggleMenu}>
              {isOpen ? (
                <AiOutlineClose size={24} />
              ) : (
                <AiOutlineMenu size={24} />
              )}
            </div>
            <ul className="hidden md:flex items-center space-x-8 text-primary-text">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? "text-primary-orange transition duration-300 font-medium"
                      : "hover:text-primary-orange transition duration-300 font-medium"
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    isActive
                      ? "text-primary-orange transition duration-300 font-medium"
                      : "hover:text-primary-orange transition duration-300 font-medium"
                  }
                >
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/booking"
                  className={({ isActive }) =>
                    isActive
                      ? "text-primary-orange transition duration-300 font-medium"
                      : "hover:text-primary-orange transition duration-300 font-medium"
                  }
                >
                  Booking
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/cars"
                  className={({ isActive }) =>
                    isActive
                      ? "text-primary-orange transition duration-300 font-medium"
                      : "hover:text-primary-orange transition duration-300 font-medium"
                  }
                >
                  Cars
                </NavLink>
              </li>
              <li>
                <HashLink
                  smooth
                  scroll={scrollWithOffset}
                  to="/about#contact"
                  className={`hover:text-primary-orange transition duration-300 font-medium`}
                >
                  Contact
                </HashLink>
              </li>
              {user ? (
                <li>
                  <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                      isActive
                        ? "text-primary-orange transition duration-300 font-medium"
                        : "hover:text-primary-orange transition duration-300 font-medium"
                    }
                  >
                    Dashboard
                  </NavLink>
                </li>
              ) : (
                <li>
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      isActive
                        ? "text-primary-orange transition duration-300 font-medium"
                        : "hover:text-primary-orange transition duration-300 font-medium"
                    }
                  >
                    Login
                  </NavLink>
                </li>
              )}
            </ul>
            <ThemeButton />
          </div>
        </div>
        <AnimatePresence>
          {isOpen && (
            <motion.ul
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={menuVariants}
              className="md:hidden bg-primary-background text-primary-text space-y-4 p-4 overflow-hidden font-semibold shadow-sm"
            >
              <motion.li variants={itemVariants}>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? "text-primary-orange transition duration-300 block"
                      : "hover:text-primary-orange transition duration-300 block"
                  }
                  onClick={toggleMenu}
                >
                  Home
                </NavLink>
              </motion.li>
              <motion.li variants={itemVariants}>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    isActive
                      ? "text-primary-orange transition duration-300 block"
                      : "hover:text-primary-orange transition duration-300 block"
                  }
                  onClick={toggleMenu}
                >
                  About Us
                </NavLink>
              </motion.li>
              <motion.li variants={itemVariants}>
                <NavLink
                  to="/booking"
                  className={({ isActive }) =>
                    isActive
                      ? "text-primary-orange transition duration-300 block"
                      : "hover:text-primary-orange transition duration-300 block"
                  }
                  onClick={toggleMenu}
                >
                  Booking
                </NavLink>
              </motion.li>
              <motion.li variants={itemVariants}>
                <NavLink
                  to="/about#contact"
                  className={({ isActive }) =>
                    isActive
                      ? "text-primary-orange transition duration-300 block"
                      : "hover:text-primary-orange transition duration-300 block"
                  }
                  onClick={toggleMenu}
                >
                  Contact
                </NavLink>
              </motion.li>
              <motion.li variants={itemVariants}>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    isActive
                      ? "text-primary-orange transition duration-300 block"
                      : "hover:text-primary-orange transition duration-300 block"
                  }
                  onClick={toggleMenu}
                >
                  Dashboard
                </NavLink>
              </motion.li>
            </motion.ul>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Header;
