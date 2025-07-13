import React from "react";

export const Beyond = () => {
  return (
    <div id="beyond">
      <div className="w-full bg-blue-50 p-4 sm:p-6 lg:min-w-[900px] lg:p-16 dark:bg-black">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-6 text-center text-xl font-bold sm:mb-8 sm:text-2xl md:mb-12 md:text-3xl lg:text-4xl">
            <span className="text-gray-900 dark:text-white">Beyond Ingredients</span>
            <span className="ml-2 text-blue-500 dark:text-blue-400">– What We Detect</span>
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-3 md:gap-12">
            {[
              {
                title: "Cosmetics: Cleaner Beauty, Smarter You",
                desc: "Our AI identifies health risks, ingredient origins, and safer alternatives.",
                link: "Learn",
              },
              {
                title: "Food: Health Insights for Your Meals",
                desc: "Uncover hidden risks and make informed choices for your diet.",
                link: "Explore",
              },
              {
                title: "Skincare: Safe Choices for Your Skin",
                desc: "Analyze ingredients to find products that nourish without harmful additives.",
                link: "Discover",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="rounded-lg border border-transparent bg-blue-100 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-gray-100 hover:shadow-lg sm:p-6 dark:bg-gray-700 dark:hover:border-gray-700"
              >
                <h3 className="mb-2 text-lg font-bold text-gray-900 md:text-xl dark:text-white">
                  {item.title}
                </h3>
                <p className="mb-4 text-gray-700 dark:text-gray-300">{item.desc}</p>
                <a
                  href="#"
                  className="group inline-flex items-center font-medium text-blue-500 transition-all duration-200 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  {item.link}
                  <svg
                    className="ml-1 h-5 w-5 transform transition-transform group-hover:translate-x-1"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M8.59,16.59L13.17,12L8.59,7.41L10,6l6,6l-6,6L8.59,16.59z" />
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
