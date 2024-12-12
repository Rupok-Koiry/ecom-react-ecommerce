import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Modal from "react-modal";
import { AnimatePresence, motion } from "framer-motion";
import { RxCross2 } from "react-icons/rx";
import Dropzone from "react-dropzone";
import axios from "axios";
import Button from "../Button";
import { useUpdateProduct } from "../../hooks/products/useUpdateProduct";
import { useCreateProduct } from "../../hooks/products/useCreateProduct";
import { useVendorShop } from "../../hooks/shops/useVendorShop";
import { useAllCategories } from "../../hooks/categories/useAllCategories";

interface FormData {
  name: string;
  description: string;
  price: number;
  category: string;
  shop: string;
  images: string[];
  discount: number;
}

const ProductModal: React.FC<any> = ({
  modalIsOpen,
  setModalIsOpen,
  product,
}) => {
  const { updateProduct } = useUpdateProduct();
  const { createProduct } = useCreateProduct();
  const { shop } = useVendorShop();
  const { categories } = useAllCategories();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
    clearErrors,
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      category: "",
      shop: "",
      images: [],
      discount: 0,
    },
  });

  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const closeModal = () => {
    setModalIsOpen(false);
  };

  useEffect(() => {
    if (product) {
      reset({
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category._id,
        shop: product.shop._id,
        images: product.images,
        discount: product.discount,
      });
      setUploadedImages(product.images);
    } else {
      reset({
        name: "",
        description: "",
        price: 0,
        category: "",
        shop: "",
        images: [],
        discount: 0,
      });
      setUploadedImages([]);
    }
  }, [product, reset]);

  const onSubmit = (newProduct: FormData) => {
    clearErrors("images");
    newProduct.images = uploadedImages;
    newProduct.shop = shop._id;

    if (product) {
      updateProduct({
        updatedProduct: newProduct,
        productId: product?._id,
      });
    } else {
      createProduct(newProduct);
    }
    closeModal();
  };

  const onDrop = async (acceptedFiles: File[]) => {
    setLoading(true);
    const imageUploads = acceptedFiles.map(async (file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "cleancode");

      try {
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/djkdk03mf/image/upload",
          formData
        );
        return response.data.secure_url;
      } catch (error) {
        console.error("Error uploading image:", error);
        return null;
      }
    });

    const imgUrls = await Promise.all(imageUploads);
    setUploadedImages((prevImages) => [
      ...prevImages,
      ...imgUrls.filter((url): url is string => url !== null),
    ]);
    setLoading(false);
  };

  const removeImage = (index: number) => {
    setUploadedImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  return (
    <AnimatePresence>
      {modalIsOpen && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Product Details"
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
              {product ? "Edit Product" : "Add New Product"}
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
                  placeholder="Enter product name"
                />
                {errors.name && (
                  <p className="text-error-color text-sm">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-primary-text mb-2">
                  Description
                </label>
                <textarea
                  {...register("description", {
                    required: "Description is required",
                  })}
                  className="w-full border-secondary-grey rounded-md shadow-sm focus:border-primary-brand border outline-none py-1.5 lg:py-2 px-3"
                  placeholder="Enter product description"
                  rows={3}
                />
                {errors.description && (
                  <p className="text-error-color text-sm">
                    {errors.description.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-primary-text mb-2">
                  Price
                </label>
                <input
                  type="number"
                  {...register("price", { required: "Price is required" })}
                  className="w-full border-secondary-grey rounded-md shadow-sm focus:border-primary-brand border outline-none py-1.5 lg:py-2 px-3"
                  placeholder="Enter product price"
                />
                {errors.price && (
                  <p className="text-error-color text-sm">
                    {errors.price.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-primary-text mb-2">
                  Category
                </label>

                <select
                  {...register("category", {
                    required: "Category is required",
                  })}
                  className="w-full border-secondary-grey rounded-md shadow-sm focus:border-primary-brand border outline-none py-1.5 lg:py-2 px-3"
                >
                  <option value="">Select Category</option>
                  {categories?.map((category: any) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="text-error-color text-sm">
                    {errors.category.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-primary-text mb-2">
                  Discount
                </label>
                <input
                  type="number"
                  {...register("discount")}
                  className="w-full border-secondary-grey rounded-md shadow-sm focus:border-primary-brand border outline-none py-1.5 lg:py-2 px-3"
                  placeholder="Enter discount percentage"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-primary-text mb-2">
                  Images
                </label>
                <Controller
                  name="images"
                  control={control}
                  rules={{
                    validate: () =>
                      uploadedImages.length > 0 ||
                      "At least one image is required",
                  }}
                  render={({ field }) => (
                    <Dropzone
                      onDrop={async (acceptedFiles) => {
                        const imgUrls = await onDrop(acceptedFiles);
                        field.onChange(imgUrls);
                      }}
                      multiple
                      accept={{
                        "image/png": [".png"],
                        "image/jpg": [".jpg"],
                        "image/jpeg": [".jpeg"],
                      }}
                    >
                      {({ getRootProps, getInputProps }) => (
                        <div
                          {...getRootProps()}
                          className="w-full px-8 py-3 border border-secondary-grey hover:border-primary-brand rounded-md cursor-pointer"
                        >
                          <input {...getInputProps()} />
                          <div className="flex justify-center text-4xl">
                            {/* <IoMdCloudUpload className="text-primary-brand" /> */}
                          </div>
                          <p className="text-secondary-text text-center">
                            Upload product images
                          </p>
                          {loading && (
                            <p className="text-primary-text text-center">
                              Uploading...
                            </p>
                          )}
                        </div>
                      )}
                    </Dropzone>
                  )}
                />
                {errors.images && (
                  <p className="text-error-color text-sm">
                    {errors.images.message}
                  </p>
                )}
                <div className="mt-2 flex flex-wrap gap-3">
                  {uploadedImages.map((url, index) => (
                    <div key={index} className="relative">
                      <img
                        src={url}
                        alt={`Uploaded ${index}`}
                        className="h-24 w-24 rounded-md object-cover"
                      />
                      <button
                        type="button"
                        className="absolute top-0 right-0 bg-error-color text-primary-white rounded-full p-1 hover:bg-red-700"
                        onClick={() => removeImage(index)}
                      >
                        <RxCross2 />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <Button className="w-full" disabled={loading} loading={loading}>
                {product ? "Update Product" : "Add Product"}
              </Button>
            </form>
          </motion.div>
        </Modal>
      )}
    </AnimatePresence>
  );
};

export default ProductModal;
