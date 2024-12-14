import { useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import SectionTitle from "../components/SectionTitle";
import Spinner from "../components/Spinner";
import { useProductDetails } from "../hooks/products/useProductDetails";
import { useAllProducts } from "../hooks/products/useAllProducts";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useProductReviews } from "../hooks/products/useProductReviews";
import { Link } from "react-router-dom";
import { useLocalStorageState } from "../utils/useLocalStorageState";
import { useEffect, useState } from "react";
import { useUserOrders } from "../hooks/orders/useUserOrders";
import { useCreateReview } from "../hooks/reviews/useCreateReview";
import AddToCartButton from "../components/AddToCartButton";
import CompareButton from "../components/CompareButton";

const ProductDetails = () => {
  const { id } = useParams();
  const {
    product,
    error: productError,
    isLoading: productLoading,
  } = useProductDetails(id as string);
  const {
    products,

    error: productsError,
    isLoading: productsLoading,
  } = useAllProducts({
    category: product?.category._id,
    limit: 4,
  });
  const {
    reviews,

    error: reviewsError,
    isLoading: reviewsLoading,
  } = useProductReviews(id as string);

  const { orders } = useUserOrders();
  const { create } = useCreateReview();
  const [recentViews, setRecentViews] = useLocalStorageState([], "recentViews");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    create({
      productId: id as string,
      reviewData: {
        rating,
        comment,
      },
    });
    setRating(0);
    setComment("");
  };
  useEffect(() => {
    if (product) {
      // Check if the product is already in the recent views
      const productExists = recentViews.some(
        (item: any) => item._id === product._id
      );

      if (!productExists) {
        // Add the new product to the start of the array
        const updatedRecentViews = [
          {
            _id: product._id,
            name: product.name,
            image: product.images[0],
            price: product.price,
          },
          ...recentViews,
        ];

        // Keep only the last 10 products
        if (updatedRecentViews.length > 10) {
          updatedRecentViews.pop();
        }

        // Update the recent views state
        setRecentViews(updatedRecentViews);
      }
    }
  }, [product, recentViews, setRecentViews]);
  if (productLoading || productsLoading || reviewsLoading) return <Spinner />;
  if (productError || productsError || reviewsError)
    return (
      <h2 className="text-center text-2xl font-bold text-error-color">
        {productError?.message ||
          productsError?.message ||
          reviewsError?.message}
      </h2>
    );

  return (
    <div className="bg-primary-background lg:py-14 py-10 px-5">
      {/* Product Details Section */}
      <section className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Product Images */}
        <div className="flex justify-center">
          <Swiper
            navigation={true}
            modules={[Navigation]}
            className="mySwiper"
            style={
              {
                "--swiper-navigation-color": "#4a6cf7",
              } as React.CSSProperties
            }
          >
            {product.images.map((image: string, index: number) => (
              <SwiperSlide key={index}>
                <div className="flex justify-center items-center">
                  <img
                    src={image}
                    alt={product.name}
                    className="rounded-lg object-cover shadow-md"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Product Details */}
        <div>
          <h2 className="text-4xl font-bold text-primary-text mb-4 ">
            {product.name}
          </h2>
          <div className="flex items-center gap-4 mb-4">
            <p className="text-4xl font-semibold text-success-color font-playwrite ">
              ${product.price}
            </p>
          </div>
          <p className="text-secondary-text  mb-3">
            Category:{" "}
            <span className="text-primary-brand font-medium">
              {product.category.name}
            </span>
          </p>
          <p className="text-secondary-text  mb-3">
            Shop:{" "}
            <Link
              to={`/shops/${product.shop._id}`}
              className="text-primary-brand underline cursor-pointer hover:text-secondary-brand"
            >
              {product.shop.name}
            </Link>
          </p>
          <p className="text-secondary-text mb-6">{product.description}</p>
          <div className="flex gap-3">
            <AddToCartButton product={product} />

            <CompareButton product={product} />
          </div>
        </div>
      </section>
      <hr className="border-t border-primary-brand container mx-auto my-14 lg:my-10" />

      {/* Related Products */}
      <section className="container mx-auto">
        <SectionTitle
          title="Related Products"
          description="Explore similar items from the same category."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {products
            ?.filter((p: any) => p._id !== product._id)
            .map((relatedProduct: any) => (
              <div
                key={relatedProduct._id}
                className="bg-primary-background p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow ease-in duration-300"
              >
                <Link to={`/products/${relatedProduct._id}`}>
                  <img
                    src={relatedProduct.images[0]}
                    alt={relatedProduct.name}
                    className="w-full h-52 object-contain rounded-lg mb-4 bg-[rgba(109,123,255,0.2)]"
                  />
                  <h3 className="text-lg font-bold text-primary-text mb-2">
                    {relatedProduct.name}
                  </h3>
                  <p className="text-success-color font-semibold mb-4 font-playwrite text-lg">
                    ${relatedProduct.price}
                  </p>
                </Link>

                <div className="flex justify-between gap-3">
                  <AddToCartButton product={relatedProduct} />

                  <CompareButton product={relatedProduct} />
                </div>
              </div>
            ))}
        </div>
      </section>
      <hr className="border-t border-primary-brand container mx-auto my-14 lg:my-10" />

      {/* Customer Reviews */}
      <section className="container mx-auto">
        <SectionTitle
          title="Customer Reviews"
          description="See what others are saying about this product."
        />
        <Swiper
          navigation={true}
          modules={[Navigation]}
          spaceBetween={30}
          breakpoints={{
            576: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            992: {
              slidesPerView: 3,
            },
          }}
        >
          {reviews?.map((review: any, index: number) => (
            <SwiperSlide key={index}>
              <div className="p-4 bg-primary-background rounded-lg shadow-md mb-2">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <img
                      src={review.user.profilePic}
                      alt="User"
                      className="w-14 h-14 rounded-full object-cover"
                    />
                    <h4 className="text-primary-text font-bold ml-4">
                      {review.user.name}
                    </h4>
                  </div>
                  <div className="flex items-center gap-1 text-warning-color">
                    {[...Array(review.rating)].map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>
                </div>
                <p className="text-secondary-text">{review.comment}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
      {/* Add a Review Section */}
      {orders?.some((order: any) =>
        order.products.some(
          (orderedProduct: any) => orderedProduct.product._id === id
        )
      ) && (
        <section className="container mx-auto my-14">
          <SectionTitle
            title="Add Your Review"
            description="Share your experience with this product."
          />
          <form
            onSubmit={handleReviewSubmit}
            className="bg-primary-background p-6 rounded-lg shadow-md max-w-xl mx-auto"
          >
            <div className="mb-6">
              <label
                htmlFor="rating"
                className="block text-secondary-text font-medium mb-2"
              >
                Rating
              </label>
              <div className="flex items-center gap-2">
                {[...Array(5)].map((_, index) => (
                  <button
                    type="button"
                    key={index}
                    onClick={() => setRating(index + 1)}
                    className={`text-2xl ${
                      rating > index
                        ? "text-warning-color"
                        : "text-secondary-text"
                    }`}
                  >
                    <FaStar />
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-6">
              <label
                htmlFor="comment"
                className="block text-secondary-text font-medium mb-2"
              >
                Comment
              </label>
              <textarea
                id="comment"
                rows={4}
                className="w-full border border-primary-brand rounded-lg p-3 text-primary-text bg-primary-background focus:outline-none focus:ring-2 focus:ring-secondary-brand"
                placeholder="Write your review here..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-primary-brand text-white py-3 rounded-lg font-bold hover:bg-secondary-brand transition duration-300"
            >
              Submit Review
            </button>
          </form>
        </section>
      )}
    </div>
  );
};

export default ProductDetails;
