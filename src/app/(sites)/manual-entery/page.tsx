"use client";
import React, { useState } from "react";
import { Plus, ChevronDown, X, Trash2 } from "lucide-react";

export default function Manual() {
  const [showModal, setShowModal] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [ingredients, setIngredients] = useState<string[]>([]);

  const handleAddIngredient = () => {
    if (inputValue.trim() !== "") {
      setIngredients((prev) => [...prev, inputValue.trim()]);
      setInputValue("");
      setShowModal(false);
    }
  };

  const handleRemove = (index: number) => {
    setIngredients((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div id="webcrumbs" className="pt-60">
      <div className="mx-auto max-w-5xl rounded-xl border border-gray-100 bg-white p-6 shadow-md lg:min-w-[800px]">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">Manually Entered Ingredients</h2>
        </div>

        <div className="py-6 text-center text-gray-600">
          {ingredients.length === 0 ? (
            <p>You haven't added any ingredients manually yet.</p>
          ) : (
            <ul className="space-y-2 text-left">
              {ingredients.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between rounded-lg bg-gray-100 px-4 py-2 text-gray-700 shadow-sm"
                >
                  {item}
                  <button
                    onClick={() => handleRemove(index)}
                    className="text-red-500 transition-colors hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mt-4">
          <button
            onClick={() => setShowModal(true)}
            className="group flex w-1/2 items-center justify-between rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 font-medium text-gray-700 transition duration-150 ease-in-out hover:bg-gray-100 hover:shadow-sm"
          >
            <div className="flex items-center">
              <Plus className="text-primary-500 mr-2 h-5 w-5" />
              Add Ingredients
            </div>
            <ChevronDown className="h-5 w-5 text-gray-400 group-hover:text-gray-600" />
          </button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-xl bg-black p-6 shadow-lg lg:min-w-[450px]">
            <h3 className="mb-5 text-center text-xl font-medium text-gray-800">Add Ingredient</h3>

            <div className="mb-5">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter ingredients you want to add."
                className="focus:ring-primary-300 w-full rounded-lg bg-gray-100 px-4 py-3 text-gray-600 transition-all duration-200 hover:bg-gray-200 focus:ring-2 focus:outline-none"
              />
            </div>

            <div className="mt-2 flex justify-between gap-3">
              <button
                onClick={handleAddIngredient}
                className="hover:bg-primary-600 flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-500 px-5 py-2.5 text-white shadow-md transition-all duration-200 hover:shadow-lg active:scale-95"
              >
                Add Ingredient
                <Plus className="h-4 w-4" />
              </button>

              <button
                onClick={() => setShowModal(false)}
                className="text-primary-500 border-primary-500 flex items-center justify-center gap-2 rounded-lg border px-5 py-2.5 transition-all duration-200 hover:bg-gray-50 active:scale-95"
              >
                Cancel
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
