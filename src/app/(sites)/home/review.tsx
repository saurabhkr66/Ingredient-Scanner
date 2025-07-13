import React from "react";

const testimonials = [
  {
    name: "Rajat Singh",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    title: "PurelyScan is a game changer.",
    body: "I recommend PurelyScan to everyone—from my clients to fellow parents. It breaks down complex ingredients into simple, science-backed insights within seconds.",
  },
  {
    name: "Aarushi Mehta",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    title: "Finally, a product I trust!",
    body: "This app made me realize how many harmful ingredients were in my routine. I'm more confident buying skincare now.",
  },
  {
    name: "Karan Joshi",
    image: "https://randomuser.me/api/portraits/men/54.jpg",
    title: "Makes label reading so easy!",
    body: "PurelyScan simplified everything. I don’t waste time Googling ingredients anymore—this tool does it all!",
  },
  {
    name: "Neha Sharma",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    title: "Highly recommended for families",
    body: "As a mom, I’m super cautious about products. PurelyScan helps me avoid risky chemicals with peace of mind.",
  },
];

export default function Review() {
  return (
    <div id="webcrumbs">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 lg:min-w-[1024px]">
        <h2 className="mb-4 text-center text-4xl font-bold">Our Loved Users</h2>
        <p className="mb-16 text-center text-lg">
          PurelyScan has transformed my shopping experience!
        </p>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {testimonials.map((user, index) => (
            <div
              key={index}
              className="rounded-lg bg-white p-6 shadow-md transition-shadow duration-300 hover:shadow-lg"
            >
              <div className="mb-4 flex items-center">
                <img
                  src={user.image}
                  alt={`${user.name} profile`}
                  className="mr-4 h-12 w-12 rounded-full border-2 border-blue-300 transition-all duration-300 hover:border-blue-500"
                />
                <h3 className="font-medium">{user.name}</h3>
              </div>

              <div className="mb-3 flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className="text-blue-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </span>
                ))}
              </div>

              <h4 className="mb-4 text-lg font-bold">"{user.title}"</h4>
              <p className="text-gray-700">{user.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
