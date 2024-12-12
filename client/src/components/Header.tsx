import { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/logo.png";
import ThemeButton from "./ThemeButton";
import { useUserProfile } from "../hooks/users/useUserProfile";
import { useLogout } from "../hooks/auth/useLogout";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { userProfile } = useUserProfile();
  const { logout } = useLogout();
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

  return (
    <header className="sticky top-0 z-10">
      <nav className="bg-secondary-background navbar shadow-sm">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" className="flex gap-3 items-center">
            <img src={logo} alt="logo" className="h-14" />
            <span className="font-playwrite text-primary-text font-bold text-lg">
              -Com
            </span>
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
                      ? "text-primary-brand transition duration-300 font-medium"
                      : "hover:text-primary-brand transition duration-300 font-medium"
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/comparison"
                  className={({ isActive }) =>
                    isActive
                      ? "text-primary-brand transition duration-300 font-medium"
                      : "hover:text-primary-brand transition duration-300 font-medium"
                  }
                >
                  Comparison
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/recent-views"
                  className={({ isActive }) =>
                    isActive
                      ? "text-primary-brand transition duration-300 font-medium"
                      : "hover:text-primary-brand transition duration-300 font-medium"
                  }
                >
                  Recent Views
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/cart"
                  className={({ isActive }) =>
                    isActive
                      ? "text-primary-brand transition duration-300 font-medium"
                      : "hover:text-primary-brand transition duration-300 font-medium"
                  }
                >
                  Cart
                </NavLink>
              </li>
              {userProfile?.role === "user" && (
                <>
                  <li>
                    <NavLink
                      to="/order-history"
                      className={({ isActive }) =>
                        isActive
                          ? "text-primary-brand transition duration-300 font-medium"
                          : "hover:text-primary-brand transition duration-300 font-medium"
                      }
                    >
                      Order History
                    </NavLink>
                  </li>
                  <li>
                    <button
                      onClick={() => logout}
                      className={
                        "text-primary-brand transition duration-300 font-medium"
                      }
                    >
                      Logout
                    </button>
                  </li>
                </>
              )}

              {userProfile?.role === "vendor" ||
                (userProfile?.role === "admin" && (
                  <li>
                    <NavLink
                      to="/dashboard"
                      className={({ isActive }) =>
                        isActive
                          ? "text-primary-brand transition duration-300 font-medium"
                          : "hover:text-primary-brand transition duration-300 font-medium"
                      }
                    >
                      Dashboard
                    </NavLink>
                  </li>
                ))}
              {!userProfile && (
                <li>
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      isActive
                        ? "text-primary-brand transition duration-300 font-medium"
                        : "hover:text-primary-brand transition duration-300 font-medium"
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
                      ? "text-primary-brand transition duration-300 block"
                      : "hover:text-primary-brand transition duration-300 block"
                  }
                  onClick={toggleMenu}
                >
                  Home
                </NavLink>
              </motion.li>
              {userProfile?.role === "user" && (
                <motion.li variants={itemVariants}>
                  <NavLink
                    to="/order-history"
                    className={({ isActive }) =>
                      isActive
                        ? "text-primary-brand transition duration-300 block"
                        : "hover:text-primary-brand transition duration-300 block"
                    }
                    onClick={toggleMenu}
                  >
                    Order History
                  </NavLink>
                </motion.li>
              )}
              <motion.li variants={itemVariants}>
                <NavLink
                  to="/comparison"
                  className={({ isActive }) =>
                    isActive
                      ? "text-primary-brand transition duration-300 block"
                      : "hover:text-primary-brand transition duration-300 block"
                  }
                  onClick={toggleMenu}
                >
                  Comparison
                </NavLink>
              </motion.li>
              <motion.li variants={itemVariants}>
                <NavLink
                  to="/recent-views"
                  className={({ isActive }) =>
                    isActive
                      ? "text-primary-brand transition duration-300 block"
                      : "hover:text-primary-brand transition duration-300 block"
                  }
                  onClick={toggleMenu}
                >
                  Recent Views
                </NavLink>
              </motion.li>
              <motion.li variants={itemVariants}>
                <NavLink
                  to="/cart"
                  className={({ isActive }) =>
                    isActive
                      ? "text-primary-brand transition duration-300 block"
                      : "hover:text-primary-brand transition duration-300 block"
                  }
                  onClick={toggleMenu}
                >
                  Cart
                </NavLink>
              </motion.li>
              {userProfile?.role === "vendor" && (
                <motion.li variants={itemVariants}>
                  <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                      isActive
                        ? "text-primary-brand transition duration-300 block"
                        : "hover:text-primary-brand transition duration-300 block"
                    }
                    onClick={toggleMenu}
                  >
                    Dashboard
                  </NavLink>
                </motion.li>
              )}
              {!userProfile && (
                <motion.li variants={itemVariants}>
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      isActive
                        ? "text-primary-brand transition duration-300 block"
                        : "hover:text-primary-brand transition duration-300 block"
                    }
                    onClick={toggleMenu}
                  >
                    Login
                  </NavLink>
                </motion.li>
              )}
            </motion.ul>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Header;
