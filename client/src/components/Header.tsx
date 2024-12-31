import { useState } from "react";
import { AiFillCaretDown, AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/logo.png";
import ThemeButton from "./ThemeButton";
import { useUserProfile } from "../hooks/users/useUserProfile";
import { useLogout } from "../hooks/auth/useLogout";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useAllCategories } from "../hooks/categories/useAllCategories";

const Header = () => {
  const { categories } = useAllCategories();
  const [isOpen, setIsOpen] = useState(false);
  const { userProfile } = useUserProfile();
  const { logout } = useLogout();
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const [isProductsOpen, setIsProductsOpen] = useState(false);

  const { items } = useSelector((state: RootState) => state.cart);
  const toggleProductsMenu = () => setIsProductsOpen(!isProductsOpen);

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  };
  const menuVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: {
      height: "auto",
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
    exit: {
      height: 0,
      opacity: 0,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  };

  const categoryVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
  };

  return (
    <header className="sticky top-0 z-20">
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
            <ul className="hidden md:flex items-center space-x-5 xl:space-x-8 text-primary-text">
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
                {/* Products with Megamenu */}
                <div className="relative">
                  <button
                    className="hover:text-primary-brand font-medium flex items-center gap-1"
                    onMouseEnter={() => setIsProductsOpen(true)}
                    onMouseLeave={() => setIsProductsOpen(false)}
                  >
                    Products
                    <AiFillCaretDown
                      className={`transition-transform duration-300 ease-in ${
                        isProductsOpen ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </button>
                  <motion.div
                    className="absolute left-0 mt-2 w-screen max-w-md bg-primary-white shadow-lg p-5 rounded-md grid grid-cols-2 gap-4"
                    initial="hidden"
                    animate={isProductsOpen ? "visible" : "hidden"}
                    variants={menuVariants}
                    onMouseEnter={() => setIsProductsOpen(true)}
                    onMouseLeave={() => setIsProductsOpen(false)}
                  >
                    <motion.div
                      className="hover:text-primary-brand cursor-pointer"
                      variants={categoryVariants}
                    >
                      <Link to={`/products`}>All Products</Link>
                    </motion.div>
                    {categories?.map((category: any) => (
                      <motion.div
                        key={category.id}
                        className="hover:text-primary-brand cursor-pointer"
                        variants={categoryVariants}
                      >
                        <Link to={`/products?category=${category._id}`}>
                          {category.name}
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </li>
              <li>
                <NavLink
                  to="/shops"
                  className={({ isActive }) =>
                    isActive
                      ? "text-primary-brand transition duration-300 font-medium"
                      : "hover:text-primary-brand transition duration-300 font-medium"
                  }
                >
                  Shops
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
                  to="/cart"
                  className={({ isActive }) =>
                    isActive
                      ? "text-primary-brand transition duration-300 font-medium"
                      : "hover:text-primary-brand transition duration-300 font-medium"
                  }
                >
                  Cart ({items.length})
                </NavLink>
              </li>

              {userProfile ? (
                <>
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
                  <li>
                    <button
                      onClick={() => logout()}
                      className={
                        "text-primary-brand transition duration-300 font-medium"
                      }
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
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
              <li>
                <div>
                  <button
                    className=" hover:text-primary-brand w-full text-left flex items-center gap-1"
                    onClick={toggleProductsMenu}
                  >
                    Products
                    <AiFillCaretDown
                      className={`transition-transform ${
                        isProductsOpen ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </button>
                  {isProductsOpen && (
                    <motion.div
                      className="mt-2 p-4 bg-primary-white shadow-md rounded-md"
                      variants={menuVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <motion.div
                        className="py-1 hover:text-primary-brand"
                        variants={categoryVariants}
                      >
                        <Link to={`/products`}>All Products</Link>
                      </motion.div>
                      {categories?.map((category: any) => (
                        <motion.div
                          key={category.id}
                          className="py-1 hover:text-primary-brand"
                          variants={categoryVariants}
                        >
                          <Link to={`/products?category=${category._id}`}>
                            {category.name}
                          </Link>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </div>
              </li>
              <motion.li variants={itemVariants}>
                <NavLink
                  to="/shops"
                  className={({ isActive }) =>
                    isActive
                      ? "text-primary-brand transition duration-300 block"
                      : "hover:text-primary-brand transition duration-300 block"
                  }
                  onClick={toggleMenu}
                >
                  Shops
                </NavLink>
              </motion.li>

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
                  to="/cart"
                  className={({ isActive }) =>
                    isActive
                      ? "text-primary-brand transition duration-300 block"
                      : "hover:text-primary-brand transition duration-300 block"
                  }
                  onClick={toggleMenu}
                >
                  Cart ({items.length})
                </NavLink>
              </motion.li>
              {userProfile ? (
                <>
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
                  <motion.li variants={itemVariants}>
                    <button
                      onClick={() => logout()}
                      className={
                        "text-primary-brand transition duration-300 font-medium"
                      }
                    >
                      Logout
                    </button>
                  </motion.li>
                </>
              ) : (
                <>
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
                  <motion.li variants={itemVariants}>
                    <NavLink
                      to="/sign-up"
                      className={({ isActive }) =>
                        isActive
                          ? "text-primary-brand transition duration-300 block"
                          : "hover:text-primary-brand transition duration-300 block"
                      }
                      onClick={toggleMenu}
                    >
                      Signup
                    </NavLink>
                  </motion.li>
                </>
              )}
            </motion.ul>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Header;
