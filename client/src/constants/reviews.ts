const reviews = [
  {
    name: "John Doe",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    rating: 5,
    comment:
      "Amazing car! The ride was incredibly smooth, and the fuel efficiency was top-notch. We took it on a long trip and had no issues. The comfort level was excellent, and it had plenty of room for everyone. I would definitely rent this car again for another road trip.",
  },
  {
    name: "Jane Smith",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
    rating: 4.5,
    comment:
      "The car had everything I needed for my daily commute. It was comfortable, and the Bluetooth connectivity made listening to music a breeze. I appreciated the smooth handling, and it was easy to park. The only downside was a slight delay in acceleration, but overall, a great experience.",
  },
  {
    name: "Michael Johnson",
    image: "https://randomuser.me/api/portraits/men/3.jpg",
    rating: 3,
    comment:
      "The car was okay for the most part. It was decent for short trips, but there was some wear and tear that was noticeable. The interior could have been cleaner, and the exterior had a few scratches. However, it ran smoothly, and I did not encounter any major mechanical issues.",
  },
  {
    name: "Emily Brown",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
    rating: 5,
    comment:
      "Loved driving this car! It was in excellent condition and extremely reliable. The ride was smooth, and the car was very quiet, which made for a relaxing drive. The GPS was a great feature, and the seats were very comfortable for a long journey. I highly recommend this car to others.",
  },
  {
    name: "David Wilson",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
    rating: 2,
    comment:
      "I was not impressed with this car. There were a few mechanical issues, including a problem with the brakes that made me feel unsafe. The handling was not great either, and it seemed to struggle with speed. The car was functional, but I would not recommend renting this model.",
  },
  {
    name: "Sarah Davis",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
    rating: 4,
    comment:
      "This car was great for city driving. It was compact enough to navigate tight spaces, and the interior was surprisingly spacious and comfortable. The rearview camera was a lifesaver for parking, and the fuel economy was good. I did notice some noise at high speeds, but it was otherwise a solid choice.",
  },
  {
    name: "Chris Martinez",
    image: "https://randomuser.me/api/portraits/men/7.jpg",
    rating: 5,
    comment:
      "The vehicle's performance was outstanding. It had excellent acceleration, and the handling was smooth and responsive. The features were user-friendly, and I appreciated the attention to detail in the design. It was a joy to drive, and I will definitely rent this car again in the future.",
  },
  {
    name: "Sophia Taylor",
    image: "https://randomuser.me/api/portraits/women/8.jpg",
    rating: 4,
    comment:
      "I had a very good experience with this car. It was reliable and comfortable, making it a great option for both city and highway driving. The fuel efficiency was better than expected, and the car was easy to handle. However, the air conditioning could have been stronger on hot days.",
  },
  {
    name: "Daniel Anderson",
    image: "https://randomuser.me/api/portraits/men/9.jpg",
    rating: 3,
    comment:
      "The car was decent, but there were a few things that could have been improved. The interior was clean but lacked some modern amenities that would have been nice. It handled well on smooth roads, but it struggled a bit on rougher terrain. Overall, it was an average experience.",
  },
  {
    name: "Lisa Thompson",
    image: "https://randomuser.me/api/portraits/women/10.jpg",
    rating: 5,
    comment:
      "Fantastic car! The ride was incredibly smooth, and it felt very stable on the road. The sound system was a great touch, and the interior was very comfortable. I took this car on a weekend getaway, and it performed exceptionally well. I would highly recommend this vehicle for both short and long trips.",
  },
];
export const getRandomReviews = (count = 3) => {
  const shuffled = [...reviews].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};
