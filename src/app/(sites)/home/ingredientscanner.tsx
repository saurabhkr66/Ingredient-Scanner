export default function IngredientScanner() {
  return (
    <div className="w-full bg-blue-50 px-4 py-16 lg:min-w-[800px] lg:px-0 dark:bg-black">
      <div className="mx-auto max-w-6xl text-center">
        <h2 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
          Your Scan Journey in 3 Simple Steps
        </h2>
        <p className="mb-12 text-gray-600 dark:text-gray-300">
          From label to decision — all in under 10 seconds.
        </p>

        <div className="grid grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Upload a Label",
              description: "Take a picture or upload a product label or enter it manually.",
              svg: (
                <path
                  d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM14 17H7V15H14V17ZM17 13H7V11H17V13ZM17 9H7V7H17V9Z"
                  fill="#0DC2CB"
                />
              ),
            },
            {
              title: "AI Scans Ingredients",
              description: "Our AI analyses ingredients and finds insights.",
              svg: (
                <path
                  d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z"
                  fill="#0DC2CB"
                />
              ),
            },
            {
              title: "Get Your Score",
              description: "See how the product ranks and choose better.",
              svg: (
                <path
                  d="M16.59 7.58L10 14.17L7.41 11.59L6 13L10 17L18 9L16.59 7.58ZM12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20Z"
                  fill="#0DC2CB"
                />
              ),
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="transform rounded-lg bg-white px-10 py-8 shadow-md transition-shadow duration-300 hover:-translate-y-1 hover:shadow-lg dark:bg-slate-800"
            >
              <div className="mb-6 flex justify-center">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {item.svg}
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-semibold text-gray-800 dark:text-white">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
