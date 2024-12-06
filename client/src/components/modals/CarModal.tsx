import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Modal from "react-modal";
import { AnimatePresence, motion } from "framer-motion";
import { RxCross2 } from "react-icons/rx";
import Dropzone from "react-dropzone";
import axios from "axios";
import { IoMdCloudUpload } from "react-icons/io";
import { useCreateCar } from "../../hooks/cars/useCreateCar";
import { useUpdateCar } from "../../hooks/cars/useUpdateCar";
import { CarTypes } from "../../constants/types";
import Button from "../Button";

interface CarModalProps {
  modalIsOpen: boolean;
  setModalIsOpen: (value: boolean) => void;
  car: CarTypes | null;
}

interface FormData {
  name: string;
  pricePerHour: number;
  description: string;
  color: string;
  type: string;
  status: "available" | "unavailable";
  features: string;
  images: string[];
}

const CarModal: React.FC<CarModalProps> = ({
  modalIsOpen,
  setModalIsOpen,
  car,
}) => {
  const { updateCar } = useUpdateCar();
  const { createCar } = useCreateCar();
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
      pricePerHour: 0,
      description: "",
      color: "",
      type: "",
      status: "available",
      features: "",
      images: [],
    },
  });

  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const closeModal = () => {
    setModalIsOpen(false);
  };
  useEffect(() => {
    if (car) {
      reset({
        name: car.name,
        pricePerHour: car.pricePerHour,
        description: car.description,
        color: car.color,
        type: car.type,
        status: car.status,
        features: car.features.join(", "),
        images: car.images,
      });
      setUploadedImages(car.images);
    } else {
      reset({
        name: "",
        pricePerHour: 0,
        description: "",
        color: "",
        type: "",
        status: "available",
        features: "",
        images: [],
      });
      setUploadedImages([]);
    }
  }, [car, reset]);

  const onSubmit = (newCar: FormData) => {
    clearErrors("images");
    const features = newCar.features
      .split(", ")
      .map((f) => f.toLowerCase().trim().split(" ").join("-"));
    newCar.pricePerHour = Number(newCar.pricePerHour);
    newCar.images = uploadedImages;
    if (car) {
      updateCar({
        newCar: {
          ...newCar,
          features,
        },
        carId: car?._id,
      });
    } else {
      createCar({ ...newCar, features });
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
          contentLabel="Car Details"
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
              {car ? "Edit Car" : "Add New Car"}
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
                  placeholder="Enter car name"
                />
                {errors.name && (
                  <p className="text-primary-red text-sm">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-primary-text mb-2">
                  Price Per Hour
                </label>
                <input
                  type="text"
                  {...register("pricePerHour")}
                  className="w-full border-secondary-grey rounded-md shadow-sm focus:border-primary-orange border outline-none py-1.5 lg:py-2 px-3"
                  placeholder="Enter price per hour"
                />
                {errors.pricePerHour && (
                  <p className="text-primary-red text-sm">
                    {errors.pricePerHour.message}
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
                  className="w-full border-secondary-grey rounded-md shadow-sm focus:border-primary-orange border outline-none py-1.5 lg:py-2 px-3"
                  placeholder="Enter car description"
                  rows={3}
                />
                {errors.description && (
                  <p className="text-primary-red text-sm">
                    {errors.description.message}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-primary-text mb-2">
                    Color
                  </label>
                  <input
                    type="text"
                    {...register("color", { required: "Color is required" })}
                    className="w-full border-secondary-grey rounded-md shadow-sm focus:border-primary-orange border outline-none py-1.5 lg:py-2 px-3"
                    placeholder="Enter car color"
                  />
                  {errors.color && (
                    <p className="text-primary-red text-sm">
                      {errors.color.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-primary-text mb-2">
                    Type
                  </label>
                  <input
                    type="text"
                    {...register("type", { required: "Type is required" })}
                    className="w-full border-secondary-grey rounded-md shadow-sm focus:border-primary-orange border outline-none py-1.5 lg:py-2 px-3"
                    placeholder="Enter car type"
                  />
                  {errors.type && (
                    <p className="text-primary-red text-sm">
                      {errors.type.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-primary-text mb-2">
                  Status
                </label>
                <select
                  {...register("status", { required: "Status is required" })}
                  className="w-full border-secondary-grey rounded-md shadow-sm focus:border-primary-orange border outline-none py-1.5 lg:py-2 px-3"
                >
                  <option value="available">Available</option>
                  <option value="unavailable">Unavailable</option>
                </select>
                {errors.status && (
                  <p className="text-primary-red text-sm">
                    {errors.status.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-primary-text mb-2">
                  Features (comma-separated)
                </label>
                <input
                  type="text"
                  {...register("features")}
                  className="w-full border-secondary-grey rounded-md shadow-sm focus:border-primary-orange border outline-none py-1.5 lg:py-2 px-3"
                  placeholder="Enter car features (e.g. GPS, Child Seat, Insurance)"
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
                          className="w-full px-8 py-3 border border-secondary-grey hover:border-primary-orange rounded-md cursor-pointer"
                        >
                          <input {...getInputProps()} />
                          <div className="flex justify-center text-4xl">
                            <IoMdCloudUpload className="text-primary-orange" />
                          </div>
                          <p className="text-secondary-text text-center">
                            Upload relevant images of the car
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
                  <p className="text-primary-red text-sm">
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
                        className="absolute top-0 right-0 bg-primary-red text-primary-white rounded-full p-1 hover:bg-red-700"
                        onClick={() => removeImage(index)}
                      >
                        <RxCross2 />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <Button className="w-full" disabled={loading} loading={loading}>
                {car ? "Update Car" : "Add Car"}
              </Button>
            </form>
          </motion.div>
        </Modal>
      )}
    </AnimatePresence>
  );
};

export default CarModal;
