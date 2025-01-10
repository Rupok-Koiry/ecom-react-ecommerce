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
import { useUpdateUserProfile } from "../hooks/users/useUpdateUserProfile";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import Spinner from "../components/Spinner";
import {
  fetchAnalyticsData,
  fetchOrderMetrics,
  fetchPaymentMetrics,
} from "../services/apiAnalytics";
import { useQuery } from "@tanstack/react-query";
import PaymentChart from "../components/PaymentChart";
import OrderChart from "../components/OrderChart";
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

  const { data: analyticsData, isLoading: isLoadingAnalytics } = useQuery({
    queryKey: ["analyticsData"],
    queryFn: () => fetchAnalyticsData(),
  });

  const { data: orderMetrics, isLoading: isLoadingOrders } = useQuery({
    queryKey: ["orderMetrics"],
    queryFn: () => fetchOrderMetrics(),
  });

  const { data: paymentMetrics, isLoading: isLoadingPayments } = useQuery({
    queryKey: ["paymentMetrics"],
    queryFn: () => fetchPaymentMetrics(),
  });
  if (isLoadingAnalytics || isLoadingOrders || isLoadingPayments) {
    return <Spinner />;
  }

  const orderDates = orderMetrics?.map((item: { date: string }) =>
    format(new Date(item.date), "MMM d")
  );

  const orderCounts = orderMetrics?.map(
    (item: { orderCount: number }) => item.orderCount
  );

  const orderChartConfig = {
    labels: orderDates,
    datasets: [
      {
        label: "Orders Created",
        data: orderCounts,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const paymentDates = paymentMetrics?.map((item: { date: string }) =>
    format(new Date(item.date), "MMM d")
  );
  const paymentChartConfig = {
    labels: paymentDates,
    datasets: [
      {
        label: "Payments Received",
        data: paymentMetrics?.map(
          (item: { totalAmount: number }) => item.totalAmount
        ),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="bg-primary-background lg:py-14 py-10 px-5">
      {userProfile.role === "admin" || userProfile.role === "vendor" ? (
        <>
          <div className="bg-primary-background">
            {/* Header */}
            <SectionTitle title="Dashboard Overview" />
            {/* Stats Section */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <StatsCard
                title="Total Products"
                value={analyticsData?.productCount}
                textColor="text-primary-brand"
                borderColor="border-primary-brand"
                icon={<FaClipboardList size={30} />}
              />
              <StatsCard
                title="Total Orders"
                value={analyticsData?.orderCount}
                textColor="text-success-color"
                borderColor="border-success-color"
                icon={<FaCar size={30} />}
              />
              <StatsCard
                title="Total Earnings"
                value={`$${analyticsData?.totalEarning}`}
                textColor="text-error-color"
                borderColor="border-error-color"
                icon={<FaMoneyBillWave size={30} />}
              />
              <StatsCard
                title="Total Users"
                value={analyticsData?.userCount}
                textColor="text-warning-color"
                borderColor="border-warning-color"
                icon={<FaHourglassHalf size={30} />}
              />
            </section>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-6">
              <div className="bg-secondary-background rounded-lg shadow-lg p-3 lg:p-5">
                <h3 className="text-lg font-semibold mb-4 text-primary-text">
                  Order Metrics
                </h3>
                <OrderChart chartData={orderChartConfig} />
              </div>
              <div className="bg-secondary-background rounded-lg shadow-lg p-3 lg:p-5">
                <h3 className="text-lg font-semibold mb-4 text-primary-text">
                  Payment Metrics
                </h3>
                <PaymentChart chartData={paymentChartConfig} />
              </div>
            </div>
          </div>
          {userProfile.role === "vendor" && (
            <div className="mx-auto">
              <SectionTitle title={shop ? "Update Shop" : "Create Shop"} />
              {/* Create Shop Form */}
              <div className="bg-secondary-background p-6 rounded-lg shadow-md">
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
                      className="w-full mb-0.5 border-secondary-grey rounded-md shadow-sm focus:border-primary-brand border outline-none py-1.5 lg:py-2 px-3"
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
                      className="w-full mb-0.5 border-secondary-grey rounded-md shadow-sm focus:border-primary-brand border outline-none py-1.5 lg:py-2 px-3"
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
                      className="w-full mb-0.5 border-secondary-grey rounded-md shadow-sm focus:border-primary-brand border outline-none py-1.5 lg:py-2 px-3"
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
          )}
        </>
      ) : (
        <div className="p-6 bg-secondary-background rounded-lg shadow-md">
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
                className="w-full mb-0.5 border-secondary-grey rounded-md shadow-sm focus:border-primary-brand border outline-none py-1.5 lg:py-2 px-3"
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
                className="w-full mb-0.5 border-secondary-grey rounded-md shadow-sm focus:border-primary-brand border outline-none py-1.5 lg:py-2 px-3"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-primary-text mb-2">
                Phone
              </label>
              <input
                {...register("phone", { required: "Phone is required" })}
                className="w-full mb-0.5 border-secondary-grey rounded-md shadow-sm focus:border-primary-brand border outline-none py-1.5 lg:py-2 px-3"
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
                className="w-full mb-0.5 border-secondary-grey rounded-md shadow-sm focus:border-primary-brand border outline-none py-1.5 lg:py-2 px-3"
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
