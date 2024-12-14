import { useParams } from "react-router-dom";
import { FaUserPlus, FaUserMinus } from "react-icons/fa";
import SectionTitle from "../components/SectionTitle";
import Spinner from "../components/Spinner";
import { useShopDetails } from "../hooks/shops/useShopDetails";
import { useAllProducts } from "../hooks/products/useAllProducts";
import { useUserProfile } from "../hooks/users/useUserProfile";
import { useFollowShop } from "../hooks/users/useFollowShop";
import { useUnfollowShop } from "../hooks/users/useUnfollowShop";
import { Link } from "react-router-dom";
import CompareButton from "../components/CompareButton";
import AddToCartButton from "../components/AddToCartButton";

const Shop = () => {
  const { id } = useParams();
  const { userProfile } = useUserProfile();
  const { follow } = useFollowShop();
  const { unfollow } = useUnfollowShop();

  const {
    isLoading: shopLoading,
    error: shopError,
    shop,
  } = useShopDetails(id as string);
  const {
    isLoading: productsLoading,
    error: productsError,
    products,
  } = useAllProducts({
    shop: id as string,
  });

  if (shopLoading || productsLoading) return <Spinner />;
  if (shopError || productsError)
    return (
      <h2 className="text-center text-2xl font-bold text-error-color">
        {shopError?.message || productsError?.message}
      </h2>
    );

  const toggleFollow = () => {
    if (shop.followers.includes(userProfile?._id)) {
      unfollow(shop._id);
    } else {
      follow(shop._id);
    }
  };

  return (
    <div className="bg-primary-background py-10 lg:py-14 px-5">
      {/* Shop Header */}
      <section className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center md:items-start md:justify-between gap-6 bg-primary-background p-6 rounded-lg shadow-md">
          {/* Shop Info */}
          <div className="flex items-center gap-6 flex-col md:flex-row">
            <img
              src={shop.image}
              alt={shop.name}
              className="w-24 h-24 object-cover rounded-full shadow-md"
            />
            <div>
              <h2 className="text-3xl font-bold text-primary-text">
                {shop.name}
              </h2>
              <p className="text-secondary-text">{shop.description}</p>
              <p className="text-success-color font-medium mt-2">
                {shop.followers.length} Followers
              </p>
            </div>
          </div>

          {/* Follow/Unfollow Button */}
          <button
            onClick={toggleFollow}
            className={`flex items-center gap-2 px-6 py-3 rounded-md shadow-md text-primary-white font-semibold transition duration-300 ${
              shop.followers.includes(userProfile?._id)
                ? "bg-error-color hover:bg-error-color/90"
                : "bg-primary-brand hover:bg-secondary-brand"
            }`}
          >
            {shop.followers.includes(userProfile?._id) ? (
              <>
                <FaUserMinus /> Unfollow
              </>
            ) : (
              <>
                <FaUserPlus /> Follow
              </>
            )}
          </button>
        </div>
      </section>
      <hr className="border-t border-primary-brand container mx-auto my-14 lg:my-10" />
      {/* Products Section */}
      <section className="container mx-auto">
        <SectionTitle
          title="Shop Products"
          description={`Browse items from ${shop.name}`}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product: any) => (
            <div
              key={product._id}
              className="bg-primary-background p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow ease-in duration-300"
            >
              <Link to={`/products/${product._id}`}>
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-52 object-contain rounded-lg mb-4 bg-[rgba(109,123,255,0.2)]"
                />
                <h3 className="text-lg font-bold text-primary-text mb-2">
                  {product.name}
                </h3>
                <p className="text-success-color font-semibold mb-4 font-playwrite text-lg">
                  ${product.price}
                </p>
              </Link>

              <div className="flex justify-between gap-3">
                <AddToCartButton product={product} />

                <CompareButton product={product} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Shop;
