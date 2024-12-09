import { useNavigate, useParams } from "react-router-dom";
import { FaShoppingCart, FaStar } from "react-icons/fa";
import SectionTitle from "../components/SectionTitle";
import Spinner from "../components/Spinner";
import { useProductDetails } from "../hooks/products/useProductDetails";
import { useAllProducts } from "../hooks/products/useAllProducts";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useProductReviews } from "../hooks/products/useProductReviews";
import { Link } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLoading, error, product } = useProductDetails(id as string);
  const { products } = useAllProducts({
    category: product?.category._id,
    limit: 3,
  });
  const { reviews } = useProductReviews(id as string);

  if (isLoading) return <Spinner />;
  if (error)
    return (
      <h2 className="text-center text-2xl font-bold text-error-color">
        {error.message}
      </h2>
    );

  return (
    <div className="bg-secondary-background min-h-screen py-10">
      {/* Product Details Section */}
      <section className="container mx-auto px-4 lg:px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Product Images */}
        <Swiper
          navigation={true}
          modules={[Navigation]}
          className="mySwiper"
          style={
            {
              "--swiper-navigation-color": "#d17842",
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

        {/* Product Details */}
        <div>
          <h2 className="text-4xl font-bold text-primary-text mb-4">
            {product.name}
          </h2>
          <div className="flex items-center gap-4 mb-4">
            <p className="text-3xl font-semibold text-success-color">
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
          <button className="flex items-center gap-2 px-4 py-2 bg-primary-brand text-primary-white rounded-md shadow-md hover:bg-secondary-brand transition">
            <FaShoppingCart /> Add to Cart
          </button>
        </div>
      </section>
      {/* Related Products */}
      <section className="container mx-auto px-4 lg:px-8 mt-16">
        <SectionTitle
          title="Related Products"
          description="Explore similar items from the same category."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {products?.map((relatedProduct: any) => (
            <div
              key={relatedProduct.id}
              onClick={() => navigate(`/product/${relatedProduct.id}`)}
              className="p-4 bg-primary-background rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
            >
              <img
                src={relatedProduct.image}
                alt={relatedProduct.name}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="text-primary-text font-bold">
                {relatedProduct.name}
              </h3>
              <p className="text-success-color mt-2">${relatedProduct.price}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="container mx-auto px-4 lg:px-8 mt-16">
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
              <div className="p-4 bg-primary-background rounded-lg shadow-md">
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
    </div>
  );
};

export default ProductDetails;
