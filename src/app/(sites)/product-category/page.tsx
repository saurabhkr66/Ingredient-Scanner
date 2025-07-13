"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Package, Droplet } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCategory } from "@/context/CategoryContext";
import { Camera, Upload, Pencil } from "lucide-react";

export default function ProductCategory() {
  const router = useRouter();
  const { selectedCategory, setSelectedCategory } = useCategory();
  useEffect(() => {
    if (selectedCategory) {
      setSelectedCategory(null);
    }
  }, []);

  const categories = [
    { name: "food", icon: Package, description: "Snacks, beverages, packaged groceries" },
    { name: "cosmetic", icon: Droplet, description: "Moisturizers, serums, cleansers" },
  ];

  const [showModal, setShowModal] = useState(false);

  const handleStartScanning = () => {
    if (!selectedCategory) {
      alert("Please select a category first.");
      return;
    }
    setShowModal(true);
  };

  const handleSkip = () => {
    // setSelectedCategory(null); // reset the selected category

    router.push("/home/");
  };

  return (
    <div id="webcrumbs">
      <div className="min-h-screen bg-blue-50 lg:min-w-[1024px] dark:bg-black">
        <header className="flex items-center border-b border-gray-200 bg-white px-6 py-4 dark:border-gray-700 dark:bg-gray-800">
          <button className="hover:text-primary-600 transform text-gray-600 transition-colors duration-300 hover:scale-105 dark:text-gray-300">
            <ChevronLeft className="h-6 w-6" />
          </button>
          <h1 className="flex-grow text-center text-xl font-semibold text-gray-900 dark:text-white">
            Product Category
          </h1>
        </header>

        <main className="mx-auto max-w-4xl px-6 py-10">
          <div className="mb-8 text-center">
            <h2 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">
              Let's Get Started
            </h2>
            <p className="mx-auto max-w-lg text-gray-600 dark:text-gray-400">
              Select the type of product you're scanning today. This helps us tailor your results.
            </p>
          </div>

          <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-2">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isSelected = selectedCategory === cat.name;
              return (
                <div
                  key={cat.name}
                  onClick={() => setSelectedCategory(isSelected ? null : cat.name)}
                  className={cn(
                    "transform cursor-pointer rounded-xl border p-8 shadow-sm transition-all duration-300",
                    isSelected
                      ? "-translate-y-1 border-blue-500 bg-blue-100 shadow-md dark:border-blue-400 dark:bg-blue-900"
                      : "hover:border-primary-100 border-gray-100 bg-white hover:-translate-y-1 hover:shadow-md dark:border-gray-700 dark:bg-gray-800",
                  )}
                >
                  <div className="flex flex-col items-center">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center text-gray-400">
                      <Icon className="h-10 w-10" />
                    </div>
                    <h3 className="mb-2 text-lg font-medium text-gray-800 dark:text-white">
                      {cat.name}
                    </h3>
                    <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                      {cat.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 flex justify-center gap-4">
            <button
              onClick={handleStartScanning}
              disabled={!selectedCategory}
              className={`${
                selectedCategory
                  ? "cursor-pointer bg-blue-500 hover:bg-blue-600"
                  : "cursor-not-allowed bg-gray-300"
              } transform rounded-lg px-6 py-2.5 font-medium text-white transition-colors duration-300 hover:-translate-y-0.5 hover:shadow-md`}
            >
              Procced
            </button>

            {showModal && (
              <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black backdrop-blur-sm">
                <div className="relative w-full max-w-3xl rounded-xl bg-white p-10 shadow-lg transition-all duration-300 dark:bg-gray-900">
                  <button
                    onClick={() => setShowModal(false)}
                    className="absolute top-4 right-4 text-gray-500 transition hover:text-red-500"
                  >
                    ✕
                  </button>

                  <h2 className="mb-3 text-center text-3xl font-semibold text-gray-900 dark:text-white">
                    How would you like to scan your product?
                  </h2>
                  <p className="mb-10 text-center text-gray-600 dark:text-gray-400">
                    Choose the method that works best for your product label.
                  </p>

<div className="grid grid-cols-1 gap-6 sm:grid-cols-3 justify-items-center">
                    {/* Start Scanning */}
                    <div className="group flex cursor-pointer flex-col items-center">
                      <button
                        onClick={() => router.push("/product-scanner")}
                        className="flex flex-col items-center"
                      >
                        <div className="mb-3 flex h-20 w-20 cursor-pointer items-center justify-center rounded-full bg-gray-100 shadow-md transition group-hover:scale-105 dark:bg-gray-800">
                          <Camera className="group-hover:text-primary-500 h-10 w-10 text-gray-500" />
                        </div>
                        <span className="group-hover:text-primary-600 font-medium text-gray-800 dark:text-gray-200">
                          Start Scanning
                        </span>
                      </button>
                    </div>

                    {/* Upload Image */}
                    <div className="group flex cursor-pointer flex-col items-center">
                      <button
                        onClick={() => router.push("/workspace")}
                        className="flex flex-col items-center"
                      >
                        <div className="mb-3 flex h-20 w-20 cursor-pointer items-center justify-center rounded-full bg-gray-100 shadow-md transition group-hover:scale-105 dark:bg-gray-800">
                          <Upload className="group-hover:text-primary-500 h-10 w-10 text-gray-500" />
                        </div>
                        <span className="group-hover:text-primary-600 font-medium text-gray-800 dark:text-gray-200">
                          Upload Image
                        </span>
                      </button>
                    </div>

                    {/* Enter Manually */}
                    <div className="group flex cursor-pointer flex-col items-center">
                      <button
                        onClick={() => router.push("/manual-workspace")}
                        className="flex flex-col items-center"
                      >
                        <div className="mb-3 flex h-20 w-20 cursor-pointer items-center justify-center rounded-full bg-gray-100 shadow-md transition group-hover:scale-105 dark:bg-gray-800">
                          <Pencil className="group-hover:text-primary-500 h-10 w-10 text-gray-500" />
                        </div>
                        <span className="group-hover:text-primary-600 font-medium text-gray-800 dark:text-gray-200">
                          Enter Manually
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <span className="mt-2 flex justify-center">select one category to proceed.</span>
        </main>
      </div>
    </div>
  );
}
