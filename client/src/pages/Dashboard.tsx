import { useEffect, useState } from "react";
import { useVendorShop } from "../hooks/shops/useVendorShop";
import { useCreateShop } from "../hooks/shops/useCreateShop";
import Button from "../components/Button";
import { useUserProfile } from "../hooks/users/useUserProfile";
import SectionTitle from "../components/SectionTitle";
import { useUpdateShop } from "../hooks/shops/useUpdateShop";

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setShopData((prev) => ({ ...prev, [name]: value }));
  };
  useEffect(() => {
    if (shop) {
      setShopData({
        name: shop.name,
        image: shop.image,
        description: shop.description,
      });
    }
  }, [shop]);

  const handleSubmit = (e: React.FormEvent) => {
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

  return (
    <div className="bg-primary-background lg:py-14 py-10 px-5">
      <SectionTitle title={shop ? "Create Shop" : "Update Shop"} />
      <div className="mx-auto">
        {/* Create Shop Form */}
        <div className="bg-primary-white p-6 rounded-lg shadow-md">
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
            <Button
              loading={isCreatePending || isUpdatePending}
              disabled={isCreatePending || isUpdatePending}
            >
              {shop ? "Create" : "Update"}
              Shop
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VendorShops;
