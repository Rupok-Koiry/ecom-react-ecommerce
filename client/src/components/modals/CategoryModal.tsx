import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import { AnimatePresence, motion } from "framer-motion";
import { RxCross2 } from "react-icons/rx";
import Button from "../Button";
import { useUpdateCategory } from "../../hooks/categories/useUpdateCategory";
import { useCreateCategory } from "../../hooks/categories/useCreateCategory";

interface FormData {
  name: string;
}

const CategoryModal: React.FC<any> = ({
  modalIsOpen,
  setModalIsOpen,
  category,
}) => {
  const { update } = useUpdateCategory();
  const { create } = useCreateCategory();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: "",
    },
  });

  const closeModal = () => {
    setModalIsOpen(false);
  };

  useEffect(() => {
    if (category) {
      reset({
        name: category.name,
      });
    } else {
      reset({
        name: "",
      });
    }
  }, [category, reset]);

  const onSubmit = (newCat: FormData) => {
    if (category) {
      update({
        updatedCategory: newCat,
        categoryId: category?._id,
      });
    } else {
      create(newCat);
    }
    closeModal();
  };

  return (
    <AnimatePresence>
      {modalIsOpen && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Category Details"
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
              {category ? "Edit category" : "Add new category"}
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-primary-text mb-2">
                  Name
                </label>
                <input
                  type="text"
                  {...register("name", { required: "Name is required" })}
                  className="w-full border-secondary-grey rounded-md shadow-sm focus:border-primary-brand border outline-none py-1.5 lg:py-2 px-3"
                  placeholder="Enter category name"
                />
                {errors.name && (
                  <p className="text-error-color text-sm">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <Button className="w-full">
                {category ? "Update category" : "Add category"}
              </Button>
            </form>
          </motion.div>
        </Modal>
      )}
    </AnimatePresence>
  );
};

export default CategoryModal;
