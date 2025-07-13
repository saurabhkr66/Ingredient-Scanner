import React from "react";

export default function Revolitizing() {
  return (
    <div className="flex flex-col items-center justify-center bg-blue-50 px-4 py-16 transition-colors duration-300 lg:min-w-[1024px] dark:bg-black">
      <h2 className="mb-4 text-center text-3xl font-bold text-gray-900 dark:text-white">
        Why You Should Care
      </h2>

      <p className="mb-16 max-w-2xl text-center text-gray-700 dark:text-gray-300">
        The products you use daily can contain ingredients that affect your health more than you
        think.
      </p>

      <div className="mx-auto mb-10 grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3">
        {/* Card 1 */}
        <div className="flex flex-col items-center rounded-2xl bg-white p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:bg-gray-800">
          <div className="mb-4 text-teal-500 dark:text-teal-400" aria-label="Hidden Risks Icon">
            <svg width="40" height="40" fill="none" viewBox="0 0 24 24">
              <path
                d="M12 9V13M12 17H12.01M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">Hidden Risks</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Ingredient labels are often packed with complex terms. Some are harmless — others,
            harmful.
          </p>
        </div>

        {/* Card 2 */}
        <div className="flex flex-col items-center rounded-2xl bg-white p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:bg-gray-800">
          <div
            className="mb-4 text-teal-500 dark:text-teal-400"
            aria-label="Misleading Marketing Icon"
          >
            <svg width="40" height="40" fill="none" viewBox="0 0 24 24">
              <path
                d="M18.6 19.5L12 13.5M5.4 19.5L12 13.5M12 13.5V4.5M12 4.5L7.5 8.25M12 4.5L16.5 8.25"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
            Misleading Marketing
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Words like 'Natural' and 'Safe' sound reassuring. We reveal what they really mean.
          </p>
        </div>

        {/* Card 3 */}
        <div className="flex flex-col items-center rounded-2xl bg-white p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:bg-gray-800">
          <div
            className="mb-4 text-teal-500 dark:text-teal-400"
            aria-label="Take Back Control Icon"
          >
            <svg width="40" height="40" fill="none" viewBox="0 0 24 24">
              <path
                d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
            Take Back Control
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            PurelyScan brings clarity — helping you make safer, smarter product choices.
          </p>
        </div>
      </div>

      {/* Bonus Card */}
      <div className="mx-auto flex max-w-md flex-col items-center rounded-2xl bg-white p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:bg-gray-800">
        <div
          className="mb-4 text-teal-500 dark:text-teal-400"
          aria-label="Scan in Just 10 Seconds Icon"
        >
          <svg width="40" height="40" fill="none" viewBox="0 0 24 24">
            <path
              d="M13 10V3L4 14H11V21L20 10H13Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
          Scan in Just 10 Seconds
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          No endless Googling. Snap, scan, and instantly know what you're using.
        </p>
      </div>
    </div>
  );
}
