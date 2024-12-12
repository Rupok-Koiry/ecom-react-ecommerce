import { useState } from "react";
import { useAllShops } from "../hooks/shops/useAllShops";
import { useCreateShop } from "../hooks/shops/useCreateShop";
import Button from "../components/Button";
import { useUserProfile } from "../hooks/users/useUserProfile";
import SectionTitle from "../components/SectionTitle";

const VendorShops = () => {
  const [shopData, setShopData] = useState({
    name: "",
    image: "",
    description: "",
  });
  const { userProfile } = useUserProfile();
  const { shops } = useAllShops();
  const { create, isPending } = useCreateShop();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setShopData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    create({ ...shopData, vendor: userProfile._id });

    setShopData({ name: "", image: "", description: "" });
  };

  return (
    <div className="bg-primary-background lg:py-14 py-10 px-5">
      <SectionTitle title="Vendor Shops" />
      <div className="mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Create Shop Form */}
        <div className="bg-primary-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-primary-text mb-6">
            Create a Shop
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
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
            <Button loading={isPending} disabled={isPending}>
              Create Shop
            </Button>
          </form>
        </div>

        {/* Shops List */}
        <div className="bg-primary-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-primary-text mb-6">
            Your Shops
          </h2>
          <div className="space-y-4">
            {shops?.map((shop: any) => (
              <div
                key={shop.id}
                className="p-4 bg-secondary-background rounded-lg shadow hover:shadow-lg transition-shadow duration-200"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={shop.image}
                    alt={shop.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{shop.name}</h3>
                    <p className="text-secondary-text text-sm">
                      {shop.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            {shops?.length === 0 && (
              <p className="text-center text-secondary-text">
                No shops found. Create one!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorShops;
