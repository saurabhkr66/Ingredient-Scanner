import React from "react";

export default function SPotlight2() {
  return (
    <div id="spotlight">
      <div className="xs:h-[420px] relative h-[450px] w-full overflow-hidden bg-blue-50 px-10 sm:h-[400px] md:h-[380px] lg:h-[360px] lg:min-w-[900px] dark:bg-black">
        {/* Background elements */}
        <div className="absolute h-full w-full">
          <div className="absolute top-[20%] right-[15%] h-4 w-4 animate-pulse rounded-full bg-blue-300 opacity-60 dark:bg-blue-500"></div>
          <div className="absolute top-[10%] right-[30%] h-2 w-2 animate-pulse rounded-full bg-blue-300 opacity-60 delay-300 dark:bg-blue-500"></div>
          <div className="absolute top-[25%] right-[45%] h-3 w-3 animate-pulse rounded-full bg-blue-300 opacity-60 delay-100 dark:bg-blue-500"></div>
          <div className="absolute top-[15%] right-[50%] h-5 w-5 animate-pulse rounded-full bg-blue-300 opacity-30 delay-200 dark:bg-blue-500"></div>
          <div className="absolute top-[40%] right-[25%] h-6 w-6 animate-pulse rounded-full border-2 border-blue-300 bg-transparent opacity-60 dark:border-blue-500"></div>
          <div className="absolute top-[20%] right-[10%] h-8 w-8 rotate-12 transform animate-pulse text-blue-700 dark:text-blue-400">
            ✦
          </div>
          <div className="absolute top-[30%] right-[20%] h-6 w-6 -rotate-12 transform animate-pulse text-blue-700 delay-300 dark:text-blue-400">
            ✦
          </div>
          <div className="absolute top-[50%] right-[5%] h-10 w-10 rotate-45 transform animate-pulse text-blue-700 delay-150 dark:text-blue-400">
            ✦
          </div>
        </div>

        {/* Content */}
        <div className="xs:p-5 xs:gap-5 relative z-10 flex h-full flex-col items-center justify-between gap-4 p-4 sm:gap-6 sm:p-6 md:flex-row md:p-8 lg:p-10">
          {/* Left side - Text content */}
          <div className="xs:max-w-sm xs:mb-6 mb-4 w-full max-w-full sm:mb-8 sm:max-w-md md:mb-0 md:max-w-md">
            <h1 className="mb-3 text-3xl font-bold text-gray-900 sm:text-4xl md:mb-4 dark:text-white">
              Food Ingredient Spotlight
            </h1>
            <h2 className="mb-3 text-lg font-semibold text-gray-800 sm:text-xl md:mb-4 dark:text-gray-300">
              Decode what's really in your routine.
            </h2>
            <p className="xs:mb-4 xs:text-sm mb-3 text-xs text-gray-700 sm:text-base dark:text-gray-400">
              PurelyScan helps you uncover what's hiding in your skincare products. From
              preservatives to hidden fragrance chemicals, get quick, science-backed insights and
              safer alternatives — all in seconds.
            </p>
            <button className="group flex transform items-center gap-2 rounded-md bg-blue-500 px-6 py-3 text-white transition hover:translate-y-[-2px] hover:bg-blue-600 hover:shadow-lg dark:bg-blue-600 dark:hover:bg-blue-700">
              Try a Food Product
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 transform transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </button>
          </div>

          {/* Right side - Product illustration */}
          <div className="relative z-20 mt-0 flex w-full items-center justify-center md:mt-0 md:w-auto">
            <img
              src="/Skincare 1.png"
              alt="Skincare Product Illustration"
              className="w-full object-contain md:w-80 lg:w-96"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
