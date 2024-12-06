import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import ReviewItem from "./ReviewItem";

const reviewData = [
  {
    imgUrl: "/images/review1.png",
    name: "Kate Winslett",
    reviewText:
      "Drive Now offers an unmatched car rental experience! The booking process was seamless, and the car was in perfect condition. Customer service was top-notch, making my journey stress-free and enjoyable.",
    rating: 5,
  },
  {
    imgUrl: "/images/review2.png",
    name: "Emily Johnson",
    reviewText:
      "I highly recommend Drive Now for anyone in need of a rental car. The fleet is well-maintained, and the rates are competitive. The team is responsive and ensures a smooth process from start to finish. Great service!",
    rating: 4,
  },
  {
    imgUrl: "/images/review3.png",
    name: "John Smith",
    reviewText:
      "From pickup to drop-off, Drive Now exceeded my expectations. The car was clean, modern, and fuel-efficient. I appreciated the flexibility in rental options and the ease of communication. Will rent again!",
    rating: 5,
  },
  {
    imgUrl: "/images/review4.png",
    name: "Michael Davis",
    reviewText:
      "Drive Now truly understands customer needs. The website is easy to navigate, and the rental options are diverse. The car I rented was reliable and comfortable, making my trip pleasant. Highly satisfied!",
    rating: 4.5,
  },
  {
    imgUrl: "/images/review5.png",
    name: "Sarah Brown",
    reviewText:
      "Fantastic experience with Drive Now! The car was delivered on time, in excellent condition, and the rental rates were transparent with no hidden fees. Friendly staff and hassle-free returns. Five stars!",
    rating: 5,
  },
  {
    imgUrl: "/images/review6.png",
    name: "Jessica Green",
    reviewText:
      "Drive Now made my travel plans simple and stress-free. The booking process was straightforward, and the car was perfect for my needs. I appreciate the attention to detail and will definitely rent again.",
    rating: 5,
  },
  {
    imgUrl: "/images/review7.png",
    name: "Chris Martin",
    reviewText:
      "I had a wonderful experience with Drive Now. The car was clean and well-maintained, and the staff was professional and courteous. The entire process was quick and easy. Highly recommend this service!",
    rating: 4.5,
  },
  {
    imgUrl: "/images/review8.png",
    name: "Laura Wilson",
    reviewText:
      "Drive Now provides a reliable and convenient car rental service. The variety of cars to choose from is impressive, and the pricing is fair. The whole process was smooth, making my trip enjoyable.",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section>
      <div className="container mx-auto py-10 lg:py-12 px-5">
        <h2 className="text-3xl text-primary-text text-center font-semibold mb-4">
          Trusted Reviews
        </h2>
        <div className="relative">
          <Swiper
            spaceBetween={30}
            pagination={{
              clickable: true,
              el: ".custom-pagination",
            }}
            breakpoints={{
              768: {
                slidesPerView: 2,
              },
              992: {
                slidesPerView: 3,
              },
            }}
            modules={[Pagination]}
          >
            {reviewData.map((review, index) => (
              <SwiperSlide key={index}>
                <ReviewItem
                  imgUrl={review.imgUrl}
                  name={review.name}
                  reviewText={review.reviewText}
                  rating={review.rating}
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="custom-pagination"></div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
