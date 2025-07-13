"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectCoverflow } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

export default function Customer() {
  const testimonials = [
    {
      message:
        "I never knew what was in my products until now. PurelyScan opened my eyes to hidden ingredients I'd been ignoring for years. It's become a must-have in my routine.",
      name: "Rachel Shillcock",
      handle: "@MissRachilli",
      image: "https://randomuser.me/api/portraits/women/45.jpg",
    },
    {
      message:
        "I used to feel overwhelmed reading product labels. With PurelyScan, I just scan and get instant clarity—it's like having a wellness expert in my pocket!",
      name: "Aarav Mehta",
      handle: "@Aarav",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      message:
        "The AI insights are fast, accurate, and easy to understand. I now feel confident picking healthier options for my family without spending hours researching.",
      name: "Priya Nair",
      handle: "@Nairpriya",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
    },
    {
      message:
        "PurelyScan has completely changed how I shop. I can make informed decisions in seconds rather than spending hours researching ingredients.",
      name: "James Wilson",
      handle: "@JWilson",
      image: "https://randomuser.me/api/portraits/men/22.jpg",
    },
    {
      message:
        "As someone with allergies, this app is a lifesaver. I can quickly identify products that are safe for me to use without the worry.",
      name: "Sofia Rodriguez",
      handle: "@SofiaR",
      image: "https://randomuser.me/api/portraits/women/29.jpg",
    },
    {
      message:
        "The personalized recommendations have introduced me to so many great products I would have otherwise missed. Truly game-changing!",
      name: "Liam Chen",
      handle: "@LiamC",
      image: "https://randomuser.me/api/portraits/men/54.jpg",
    },
  ];

  return (
    <div className="bg-blue-50 py-16 transition-colors dark:bg-black">
      <div className="mb-12 text-center">
        <h2 className="mb-4 text-4xl font-bold tracking-tight dark:text-white">Our Loved Users</h2>
        <p className="mx-auto max-w-2xl text-lg text-gray-700 dark:text-gray-300">
          PurelyScan has transformed my shopping experience!
        </p>
      </div>

      <div className="mx-auto max-w-6xl px-4">
        <Swiper
          modules={[Pagination, Navigation, Autoplay, EffectCoverflow]}
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={3}
          loop={true}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation={false}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 200,
            modifier: 1.5,
            slideShadows: false,
          }}
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 3 },
            1024: { slidesPerView: 3 },
          }}
          className="testimonial-swiper"
        >
          {testimonials.map((t, index) => (
            <SwiperSlide key={index}>
              <div className="flex min-h-[350px] flex-col justify-between rounded-xl border border-blue-200 bg-white p-6 shadow-md transition-all duration-300 dark:border-gray-700 dark:bg-gray-900">
                <p className="mb-6 text-gray-800 dark:text-gray-300">{t.message}</p>
                <div className="mt-auto flex items-center">
                  <img
                    src={t.image || "/placeholder.svg"}
                    alt={t.name}
                    className="border-primary-500 mr-3 h-12 w-12 rounded-full border-2"
                  />
                  <div>
                    <h4 className="font-semibold text-black dark:text-white">{t.name}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{t.handle}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
