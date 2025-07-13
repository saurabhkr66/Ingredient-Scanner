import React from "react";
import { ArrowRight } from "lucide-react";

export default function ScanUpload() {
  return (
    <div className="flex items-center justify-center bg-blue-50 p-4 pt-10 pb-10 dark:bg-black">
      <div className="relative flex w-full max-w-5xl items-center justify-start gap-8 overflow-hidden rounded-xl bg-[#1e2937] p-8 shadow-xl lg:min-w-[900px] dark:bg-gray-800">
        {/* Left image section */}
        <div className="flex w-1/2 items-center justify-center">
          <img src="/Male-1 1.png" alt="Purelyscan logo" className="h-auto w-180" />
        </div>

        {/* Right text section */}
        <div className="w-1/2 space-y-4 text-white">
          <h2 className="text-2xl font-bold">
            Ready to Know What’s
            <br />
            Really Inside?
          </h2>
          <p className="text-sm text-gray-300">
            Scan any product label and get instant, AI-powered
            <br />
            insights – no guesswork, no confusion.
          </p>
          <div className="mt-4 flex items-center space-x-3">
            <button className="flex transform items-center justify-center rounded-md bg-blue-500 px-5 py-2 text-white transition-all duration-300 hover:scale-105 hover:bg-blue-600">
              Scan Now
            </button>
            <button className="flex transform items-center rounded-md bg-white px-4 py-2 text-gray-800 transition-all duration-300 hover:scale-105 hover:bg-gray-100 dark:bg-gray-100 dark:hover:bg-gray-200">
              See it in action
              <ArrowRight className="ml-1 h-4 w-4" />
            </button>
          </div>
          <p className="mt-2 cursor-pointer text-sm text-gray-400 transition-colors duration-300 hover:text-gray-300">
            Enter ingredients manually
          </p>
        </div>

        {/* Decorative blurred shapes */}
        <div className="absolute -right-24 -bottom-24 h-48 w-48 rounded-full bg-green-500/10 blur-3xl dark:bg-green-400/10"></div>
        <div className="absolute -top-24 -left-24 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl dark:bg-blue-400/10"></div>
      </div>
    </div>
  );
}
