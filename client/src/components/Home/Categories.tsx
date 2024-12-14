import { Navigation } from "swiper/modules";
import SectionTitle from "../SectionTitle";
import Spinner from "../../components/Spinner";
import { Swiper, SwiperSlide } from "swiper/react";
import { useAllCategories } from "../../hooks/categories/useAllCategories";
import { Link } from "react-router-dom";

const Categories = () => {
  const { isLoading, error, categories } = useAllCategories();

  if (isLoading) return <Spinner />;
  if (error)
    return (
      <h2 className="text-center text-2xl font-bold text-error-color">
        {error.message}
      </h2>
    );

  return (
    <section className="border-b border-secondary-grey py-10 container mx-auto">
      <SectionTitle
        title="Top Categories"
        description="Discover our wide selection of electronics, from the latest smartphones and laptops to high-quality earbuds and smartwatches, all categorized to suit your tech needs and preferences."
        className="text-center"
      />
      <div className="flex justify-center">
        <Swiper
          navigation={true}
          modules={[Navigation]}
          spaceBetween={30}
          breakpoints={{
            576: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
            992: {
              slidesPerView: 5,
            },
          }}
          className="mySwiper"
          style={
            {
              "--swiper-navigation-color": "#4a6cf7",
            } as React.CSSProperties
          }
        >
          {categories.map((category: any) => (
            <SwiperSlide key={category._id}>
              <div className="flex justify-center items-center">
                <Link to={`/products?category=${category._id}`}>
                  <p className="text-primary-text text-center text-lg lg:text-xl size-40 lg:size-48 flex justify-center items-center font-playwrite bg-secondary-background hover:scale-95 transition duration-300 rounded-full p-4 mb-3">
                    {category.name}
                  </p>
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Categories;
