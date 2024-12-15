import React, { useState, useEffect } from "react";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import {
  FaCalendarAlt,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaAmazonPay,
} from "react-icons/fa";
import { BsSpeedometer } from "react-icons/bs";

import { motion, AnimatePresence } from "framer-motion";
import { useLogout } from "../../hooks/auth/useLogout";
import { useVendorShop } from "../../hooks/shops/useVendorShop";
import { FaComments, FaUser } from "react-icons/fa6";
import { useUserProfile } from "../../hooks/users/useUserProfile";

interface NavItemProps {
  to: string;
  icon: React.ElementType;
  children: React.ReactNode;
}

const DashboardLayout: React.FC = () => {
  const { userProfile } = useUserProfile();
  const { shop } = useVendorShop();
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 1024);
  const location = useLocation();
  const { isPending, logout } = useLogout();
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  }, [location, isMobile]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const sidebarVariants = {
    open: { x: 0, opacity: 1 },
    closed: { x: "-100%", opacity: 0 },
  };

  const NavItem: React.FC<NavItemProps & { end?: boolean }> = ({
    to,
    icon: Icon,
    children,
    end,
  }) => (
    <motion.li whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <NavLink
        to={to}
        end={end}
        className={({ isActive }) =>
          `flex items-center p-3 rounded-lg transition-colors font-medium ${
            isActive
              ? "bg-secondary-background text-primary-brand"
              : "text-secondary-text hover:bg-secondary-background hover:text-primary-brand"
          }`
        }
        onClick={() => isMobile && setIsSidebarOpen(false)}
      >
        <Icon className="mr-3" />
        {children}
      </NavLink>
    </motion.li>
  );
  return (
    <div className="flex h-screen bg-primary-background overflow-hidden">
      {/* Mobile Sidebar Toggle */}
      <motion.button
        className="lg:hidden fixed top-2/4 right-4 z-20 p-2 bg-primary-brand text-primary-white rounded-full shadow-lg"
        onClick={toggleSidebar}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isSidebarOpen ? <FaTimes /> : <FaBars />}
      </motion.button>

      {/* Sidebar */}
      <AnimatePresence>
        {(isSidebarOpen || !isMobile) && (
          <motion.aside
            className="absolute lg:static w-64 h-[calc(100%-80px)] bg-primary-white shadow-lg overflow-auto rounded-lg z-10"
            initial="closed"
            animate="open"
            exit="closed"
            variants={sidebarVariants}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="p-6 h-full flex flex-col">
              <nav className="flex-grow">
                <motion.ul
                  className="space-y-3"
                  initial="closed"
                  animate="open"
                  variants={{
                    open: {
                      transition: { staggerChildren: 0.07, delayChildren: 0.2 },
                    },
                    closed: {
                      transition: {
                        staggerChildren: 0.05,
                        staggerDirection: -1,
                      },
                    },
                  }}
                >
                  <NavItem to="/dashboard" icon={BsSpeedometer} end>
                    Dashboard
                  </NavItem>

                  {userProfile?.role === "admin" ? (
                    <>
                      <NavItem to="/dashboard/manage-users" icon={FaUser}>
                        Manage Users
                      </NavItem>
                      <NavItem
                        to="/dashboard/manage-categories"
                        icon={FaCalendarAlt}
                      >
                        Manage Category
                      </NavItem>
                      <NavItem
                        to="/dashboard/manage-transactions"
                        icon={FaAmazonPay}
                      >
                        Transactions
                      </NavItem>
                    </>
                  ) : (
                    <>
                      <NavItem
                        to="/dashboard/manage-products"
                        icon={FaCalendarAlt}
                      >
                        Manage Products
                      </NavItem>
                      <NavItem to="/dashboard/manage-reviews" icon={FaComments}>
                        Manage Review
                      </NavItem>
                      <NavItem
                        to={`/dashboard/order-history/${shop?._id}`}
                        icon={FaAmazonPay}
                      >
                        Order History
                      </NavItem>
                    </>
                  )}
                </motion.ul>
              </nav>
              <motion.div
                className="mt-auto border-t border-secondary-background pt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <motion.button
                  className="flex items-center w-full p-3 rounded-lg bg-secondary-background text-secondary-text hover:bg-primary-brand hover:text-primary-white transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={isPending}
                  onClick={() => logout()}
                >
                  <FaSignOutAlt className="mr-3" />
                  Sign Out
                </motion.button>
              </motion.div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto pt-16 lg:pt-0">
        <motion.div
          className="max-w-7xl mx-auto py-6 px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Outlet />
        </motion.div>
      </main>
    </div>
  );
};

export default DashboardLayout;
