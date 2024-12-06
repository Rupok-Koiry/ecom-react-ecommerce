import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import { AnimatePresence, motion } from "framer-motion";
import { RxCross2 } from "react-icons/rx";
import { useCreateUser } from "../../hooks/users/useCreateUser";
import { useUpdateUser } from "../../hooks/users/useUpdateUser";
import Button from "../Button";
import { UserTypes } from "../../constants/types";

interface UserModalProps {
  modalIsOpen: boolean;
  setModalIsOpen: (value: boolean) => void;
  user: UserTypes | null;
}

interface FormData {
  name: string;
  email: string;
  role: "user" | "admin";
  password: string;
  phone?: string;
  address?: string;
}

const UserModal: React.FC<UserModalProps> = ({
  modalIsOpen,
  setModalIsOpen,
  user,
}) => {
  const { updateUser } = useUpdateUser();
  const { createUser } = useCreateUser();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    clearErrors,
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      email: "",
      role: "user",
      password: "",
      phone: "",
      address: "",
    },
  });

  const closeModal = () => {
    setModalIsOpen(false);
  };

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        address: user.address,
      });
    } else {
      reset({
        name: "",
        email: "",
        role: "user",
        password: "",
        phone: "",
        address: "",
      });
    }
  }, [user, reset]);

  const onSubmit = (newUser: FormData) => {
    clearErrors();

    if (user) {
      updateUser({ newUser, userId: user?._id });
    } else {
      createUser(newUser);
    }
    closeModal();
  };

  return (
    <AnimatePresence>
      {modalIsOpen && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="User Details"
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
            <h2 className="text-2xl font-semibold text-primary-text mb-4 text-center">
              {user ? "Edit User" : "Add New User"}
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-primary-text mb-2">
                  Name
                </label>
                <input
                  type="text"
                  {...register("name", { required: "Name is required" })}
                  className="w-full border-secondary-grey rounded-md shadow-sm focus:border-primary-orange border outline-none py-1.5 lg:py-2 px-3"
                  placeholder="Enter user name"
                />
                {errors.name && (
                  <p className="text-primary-red text-sm">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-primary-text mb-2">
                  Email
                </label>
                <input
                  type="email"
                  {...register("email", { required: "Email is required" })}
                  className="w-full border-secondary-grey rounded-md shadow-sm focus:border-primary-orange border outline-none py-1.5 lg:py-2 px-3"
                  placeholder="Enter user email"
                />
                {errors.email && (
                  <p className="text-primary-red text-sm">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-primary-text mb-2">
                  Role
                </label>
                <select
                  {...register("role", { required: "Role is required" })}
                  className="w-full border-secondary-grey rounded-md shadow-sm focus:border-primary-orange border outline-none py-1.5 lg:py-2 px-3"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
                {errors.role && (
                  <p className="text-primary-red text-sm">
                    {errors.role.message}
                  </p>
                )}
              </div>
              {!user && (
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-primary-text mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    {...register("password", {
                      required: "Password is required for new users",
                    })}
                    className="w-full border-secondary-grey rounded-md shadow-sm focus:border-primary-orange border outline-none py-1.5 lg:py-2 px-3"
                    placeholder="Enter user password"
                  />
                  {errors.password && (
                    <p className="text-primary-red text-sm">
                      {errors.password.message}
                    </p>
                  )}
                </div>
              )}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-primary-text mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  {...register("phone")}
                  className="w-full border-secondary-grey rounded-md shadow-sm focus:border-primary-orange border outline-none py-1.5 lg:py-2 px-3"
                  placeholder="Enter user phone number"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-primary-text mb-2">
                  Address
                </label>
                <textarea
                  {...register("address")}
                  className="w-full border-secondary-grey rounded-md shadow-sm focus:border-primary-orange border outline-none py-1.5 lg:py-2 px-3"
                  placeholder="Enter user address"
                  rows={3}
                />
              </div>
              <Button className="w-full">
                {user ? "Update User" : "Add User"}
              </Button>
            </form>
          </motion.div>
        </Modal>
      )}
    </AnimatePresence>
  );
};

export default UserModal;
