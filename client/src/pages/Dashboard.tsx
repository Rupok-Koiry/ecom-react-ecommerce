import { useEffect, useState } from "react";
import { useVendorShop } from "../hooks/shops/useVendorShop";
import { useCreateShop } from "../hooks/shops/useCreateShop";
import Button from "../components/Button";
import { useUserProfile } from "../hooks/users/useUserProfile";
import SectionTitle from "../components/SectionTitle";
import { useUpdateShop } from "../hooks/shops/useUpdateShop";
import StatsCard from "../components/StatsCard";
import {
  FaCar,
  FaClipboardList,
  FaHourglassHalf,
  FaMoneyBillWave,
} from "react-icons/fa6";
import api from "../services/api";
import { useUpdateUserProfile } from "../hooks/users/useUpdateUserProfile";
import { useForm } from "react-hook-form";
interface ProfileFormData {
  name: string;
  email: string;
  address: string;
  phone: string;
}
const VendorShops = () => {
  const [shopData, setShopData] = useState({
    name: "",
    image: "",
    description: "",
  });
  const { userProfile } = useUserProfile();
  const { shop } = useVendorShop();
  const { create, isPending: isCreatePending } = useCreateShop();
  const { update, isPending: isUpdatePending } = useUpdateShop();
  const { updateUser, isPending: isUserUpdating } = useUpdateUserProfile();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileFormData>();
  const onSubmitProfile = (formData: any) => {
    updateUser(formData);
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setShopData((prev) => ({ ...prev, [name]: value }));
  };
  useEffect(() => {
    if (!userProfile) return;
    reset(userProfile);
  }, [reset, userProfile]);
  useEffect(() => {
    if (shop) {
      setShopData({
        name: shop.name,
        image: shop.image,
        description: shop.description,
      });
    }
  }, [shop]);

  const handleVendorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (shop) {
      update({
        updatedShop: { ...shopData, vendor: userProfile._id },
        shopId: shop._id,
      });
    } else {
      create({ ...shopData, vendor: userProfile._id });
    }
  };
  const [counts, setCounts] = useState({
    productCount: 0,
    userCount: 0,
    orderCount: 0,
    totalEarning: 0,
  });
  useEffect(() => {
    api.get("/model-counts").then((res) => {
      setCounts(res.data);
    });
  }, []);

  return (
    <div className="bg-primary-background lg:py-14 py-10 px-5">
      {userProfile.role === "admin" ? (
        <div className="bg-primary-background">
          {/* Header */}
          <SectionTitle title="Dashboard Overview" />
          {/* Stats Section */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <StatsCard
              title="Total Products"
              value={counts.productCount}
              textColor="text-primary-brand"
              borderColor="border-primary-brand"
              icon={<FaClipboardList size={30} />}
            />
            <StatsCard
              title="Total Orders"
              value={counts.orderCount}
              textColor="text-success-color"
              borderColor="border-success-color"
              icon={<FaCar size={30} />}
            />
            <StatsCard
              title="Total Earnings"
              value={`$${counts.totalEarning}`}
              textColor="text-error-color"
              borderColor="border-error-color"
              icon={<FaMoneyBillWave size={30} />}
            />
            <StatsCard
              title="Total Users"
              value={counts.userCount}
              textColor="text-warning-color"
              borderColor="border-warning-color"
              icon={<FaHourglassHalf size={30} />}
            />
          </section>
        </div>
      ) : userProfile.role === "vendor" ? (
        <div className="mx-auto">
          <SectionTitle title={shop ? "Update Shop" : "Create Shop"} />
          {/* Create Shop Form */}
          <div className="bg-primary-white p-6 rounded-lg shadow-md">
            <form onSubmit={handleVendorSubmit} className="space-y-5">
              <div>
                <label className="block text-secondary-text text-sm font-medium mb-2">
                  Shop Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={shopData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-primary-grey rounded-md focus:outline-none focus:ring-2 focus:ring-primary-brand"
                  placeholder="Enter shop name"
                />
              </div>
              <div>
                <label className="block text-secondary-text text-sm font-medium mb-2">
                  Image URL
                </label>
                <input
                  type="text"
                  name="image"
                  value={shopData.image}
                  onChange={handleChange}
                  className="w-full p-3 border border-primary-grey rounded-md focus:outline-none focus:ring-2 focus:ring-primary-brand"
                  placeholder="Enter image URL"
                />
              </div>
              <div>
                <label className="block text-secondary-text text-sm font-medium mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={shopData.description}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-primary-grey rounded-md focus:outline-none focus:ring-2 focus:ring-primary-brand"
                  placeholder="Enter shop description"
                  rows={4}
                ></textarea>
              </div>
              <Button
                loading={isCreatePending || isUpdatePending}
                disabled={isCreatePending || isUpdatePending}
              >
                {shop ? "Update " : "Create "}
                Shop
              </Button>
            </form>
          </div>
        </div>
      ) : (
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-secondary-text mb-6">
            Profile Information
          </h2>
          <form onSubmit={handleSubmit(onSubmitProfile)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-primary-text mb-2">
                Name
              </label>
              <input
                {...register("name", { required: "Name is required" })}
                className="w-full rounded-md shadow-sm border py-2 px-3"
              />
              {errors.name && (
                <p className="text-red-500 text-xs">{errors.name.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-primary-text mb-2">
                Name
              </label>
              <input
                value={userProfile.email}
                disabled
                className="w-full rounded-md shadow-sm border py-2 px-3"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-primary-text mb-2">
                Phone
              </label>
              <input
                {...register("phone", { required: "Phone is required" })}
                className="w-full rounded-md shadow-sm border py-2 px-3"
              />
              {errors.phone && (
                <p className="text-red-500 text-xs">{errors.phone.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-primary-text mb-2">
                Address
              </label>
              <input
                {...register("address", { required: "Address is required" })}
                className="w-full rounded-md shadow-sm border py-2 px-3"
              />
              {errors.address && (
                <p className="text-red-500 text-xs">{errors.address.message}</p>
              )}
            </div>
            <Button loading={isUserUpdating} disabled={isUserUpdating}>
              Update Profile
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default VendorShops;
