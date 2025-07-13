import { Info, Leaf, AlertTriangle, TestTube } from "lucide-react";
import type { CosmeticReport } from "@/types";

export default function Summary({ report }: { report: Readonly<CosmeticReport> }) {
  return (
    <div id="webcrumbs">
      <div className="grid w-full max-w-[1728px] min-w-[680px] grid-cols-1 items-stretch gap-[20px] rounded-[20px] bg-gray-50 p-[20px_40px] lg:grid-cols-[5fr_2fr] dark:bg-black">
        {/* Left Column */}
        <div className="flex h-full flex-col">
          <div className="flex h-full flex-col gap-[20px]">
            {/* Key Benefits Card */}
            <div className="flex h-0 min-h-0 flex-1 flex-grow flex-col">
              <div className="flex h-full flex-col rounded-xl border border-green-400 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md dark:bg-gray-800">
                <div className="mb-4 flex flex-col items-center">
                  <Info className="h-5 w-5 text-green-600" />
                  <h2 className="text-center text-lg font-medium text-blue-400">Key Benefits</h2>
                </div>

                <div className="flex-grow space-y-4">
                  {report.positive_aspects.map((benefit, idx) => (
                    <div key={idx} className="ml-30 flex items-center gap-3">
                      <Leaf className="mt-1 h-5 w-5 flex-shrink-0 text-green-600" />
                      <p className="text-gray-700 dark:text-gray-200">{benefit}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Risk and Warnings Card */}
            <div className="flex h-0 min-h-0 flex-1 flex-grow flex-col">
              <div className="flex h-full flex-col rounded-xl border bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md dark:border-red-200 dark:bg-gray-800">
                <div className="mb-4 flex flex-col items-center">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  <h2 className="text-center text-lg font-medium text-blue-400">
                    Risk and Warnings
                  </h2>
                </div>

                <div className="flex-grow space-y-4">
                  {report.negative_aspects.map((benefit, idx) => (
                    <div key={idx} className="ml-30 flex items-center gap-3">
                      <AlertTriangle className="mt-1 h-5 w-5 flex-shrink-0 text-red-600" />
                      <p className="text-gray-700 dark:text-gray-200">{benefit}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Ingredient Functionality Card */}
            <div className="flex h-0 min-h-0 flex-1 flex-grow flex-col">
              <div className="flex h-full flex-col rounded-xl border border-yellow-400 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md dark:bg-gray-800">
                <div className="mb-4 flex flex-col items-center">
                  <TestTube className="h-5 w-5 text-yellow-600" />
                  <h2 className="text-center text-lg font-medium text-blue-400">
                    Ingredient Functionality
                  </h2>
                </div>

                <div className="flex-grow space-y-4">
                  {report.ingredients.slice(0, 3).map((benefit, idx) => (
                    <div key={idx} className="ml-30 flex items-start gap-3">
                      <p className="text-gray-700 dark:text-gray-200">
                        <b>{benefit.name}</b>-{benefit.reason}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex h-full flex-col">
          <div className="flex h-full flex-col">
            {/* How To Use Card */}
            <div className="flex h-full flex-col rounded-xl bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md dark:bg-gray-800">
              <div className="mb-4 flex flex-col items-center">
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-blue-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                  </svg>
                </div>
                <h2 className="text-center text-lg font-medium dark:text-blue-500">How To Use</h2>
              </div>

              <div className="mt-6 flex flex-grow flex-col justify-between space-y-6">
                {/* When to Use */}
                <div className="rounded-lg bg-blue-50 p-5 transition-transform duration-300 hover:scale-[1.02] dark:bg-gray-900">
                  <div className="mb-3 flex flex-col items-center">
                    <div className="mb-1 flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-blue-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <h3 className="text-base font-medium dark:text-blue-300">When to Use</h3>
                  </div>
                  <p className="text-center text-gray-700 dark:text-gray-300">
                    {report.usageInstructions.whenToUse}
                  </p>
                </div>

                {/* How Much to Use */}
                <div className="rounded-lg bg-blue-50 p-5 transition-transform duration-300 hover:scale-[1.02] dark:bg-gray-900">
                  <div className="mb-3 flex flex-col items-center">
                    <div className="mb-1 flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-blue-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <h3 className="text-base font-medium dark:text-blue-300">How Much to Use</h3>
                  </div>
                  <p className="text-center text-gray-700 dark:text-gray-300">
                    {report.usageInstructions.howMuchToUse}
                  </p>
                </div>

                {/* How to Apply/Consume */}
                <div className="rounded-lg bg-blue-50 p-5 transition-transform duration-300 hover:scale-[1.02] dark:bg-gray-900">
                  <div className="mb-3 flex flex-col items-center">
                    <div className="mb-1 flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-blue-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M9 3a1 1 0 012 0v5.5a.5.5 0 001 0V4a1 1 0 112 0v4.5a.5.5 0 001 0V6a1 1 0 112 0v5a7 7 0 11-14 0V9a1 1 0 012 0v2.5a.5.5 0 001 0V4a1 1 0 012 0v4.5a.5.5 0 001 0V3z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <h3 className="text-base font-medium dark:text-blue-300">
                      How to Apply / Consume
                    </h3>
                  </div>
                  <p className="text-center text-gray-700 dark:text-gray-300">
                    {report.usageInstructions.howToUse}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
