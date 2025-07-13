import { CosmeticReport, AnalysisResultType } from "@/types";
import Summary from "./summary";

import CircleScoreChart from "./circlechart";
import CountingIngredientChart from "./countingredient";

const statusStyles = {
  Healthy: {
    label: "Healthy",
    bg: "bg-green-200",
    text: "text-green-700",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="h-4 w-4"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
      </svg>
    ),
  },
  Neutral: {
    label: "Neutral",
    bg: "bg-yellow-200",
    text: "text-yellow-700",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="h-4 w-4"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v14m7-7H5" />
      </svg>
    ),
  },
  Unhealthy: {
    label: "Unhealthy",
    bg: "bg-red-200",
    text: "text-red-700",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="h-4 w-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    ),
  },
};

export default function Cosmetic({
  report,
  imageUrl,
}: {
  report: Readonly<CosmeticReport>;
  imageUrl: string;
}) {
  return (
    <>
      {report && (
        <div className="p-4 pt-20">
          <div className="w-full pb-4 text-center">
            <span className="pb-4 text-2xl font-bold dark:text-white">
              Summary of your ingredient review
              <br />
            </span>
            <span className="pt-4 text-gray-700 dark:text-gray-300">
              Here's the quick overview of your scanned and manually added ingredients
            </span>
          </div>

          <div className="rounded-xl bg-blue-50 p-6 shadow-sm lg:min-w-[800px] dark:bg-black">
            <h2 className="mb-6 text-2xl font-bold text-gray-800 dark:text-white">
              Product Overview
            </h2>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
              <div className="col-span-1 space-y-4 md:col-span-2 lg:col-span-3">
                {[
                  { label: "Name", value: report.title },
                  { label: "Type", value: "cosmetic" },

                  { label: "Description", value: report.description },
                  { label: "Allergen", value: report.allergenic_warning },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-x-3">
                    <span className="w-28 font-semibold text-gray-700 dark:text-gray-300">
                      {item.label}:
                    </span>
                    <span className="text-gray-600 dark:text-gray-400">{item.value}</span>
                  </div>
                ))}
              </div>

              <div className="p-4">
                {imageUrl && <img src={imageUrl} className="mx-auto h-[200px]" alt="preview" />}
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-xl bg-blue-50 p-4 shadow-sm lg:min-w-[800px] dark:bg-black">
            <div className="mx-40 mt-4 mb-6 flex items-center justify-between">
              <CircleScoreChart score={report.care_rating} />
              <CountingIngredientChart report={report} />
            </div>
          </div>

          <div className="pt-8 pb-8">
            <Summary report={report} />
          </div>

          <div className="rounded-xl bg-blue-50 p-4 shadow-sm lg:min-w-[800px] dark:bg-gray-800">
            <h3 className="mb-4 text-xl font-bold dark:text-white">Ingredients</h3>
            <div className="grid grid-cols-1 gap-[60px] md:grid-cols-2 lg:grid-cols-3">
              {report.ingredients.map((ingredient, idx) => {
                const style = statusStyles[ingredient.category];

                return (
                  <div
                    key={idx}
                    className="h-[200px] w-[360px] rounded-lg border bg-white p-4 shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-900"
                  >
                    <div className="flex flex-col items-center">
                      <h4 className="text-center font-semibold dark:text-white">
                        {ingredient.name}
                      </h4>

                      <div className="mt-4 mb-2 flex flex-col items-center">
                        {style ? (
                          <div
                            className={`${style.bg} ${style.text} flex items-center rounded-full px-3 py-1 text-sm`}
                          >
                            <svg className="mr-1 h-4 w-4" viewBox="0 0 24 24" fill="none">
                              {style.icon}
                            </svg>
                            {style.label}
                          </div>
                        ) : (
                          <div className="flex items-center rounded-full bg-gray-300 px-3 py-1 text-sm text-gray-700">
                            Unknown
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="text-md my-2 text-gray-600 dark:text-gray-200">
                      <p>
                        <b className="text-blue-400">Reason:</b>{" "}
                        {ingredient.reason ?? "Not Provided"}
                      </p>
                    </div>

                    <div className="mb-1 h-2 w-full rounded-full bg-gray-200 dark:bg-gray-600">
                      <div
                        className="h-2 rounded-full bg-gradient-to-r from-red-500 via-yellow-400 to-green-500"
                        style={{ width: `${ingredient.percentage ?? 0}%` }} // <-- make sure % is outside
                      ></div>
                    </div>

                    <div className="text-right text-xs text-gray-500 dark:text-gray-400">
                      {ingredient.percentage ?? 0}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
