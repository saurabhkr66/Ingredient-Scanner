import React from "react";

export default function AddIngredient() {
  return (
    <div id="webcrumbs">
      <div className="flex h-screen w-full items-center justify-center bg-gray-50">
        <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg lg:min-w-[450px]">
          <h3 className="mb-5 text-center text-xl font-medium text-gray-800">Ingredient 1</h3>

          <div className="mb-5">
            <input
              type="text"
              placeholder="Enter ingredients you want to add."
              className="focus:ring-primary-300 w-full rounded-lg bg-gray-100 px-4 py-3 text-gray-600 transition-all duration-200 hover:bg-gray-200 focus:ring-2 focus:outline-none"
            />
            {/* Next: "Add validation for ingredient input" */}
          </div>

          <div className="mt-2 flex justify-between gap-3">
            <button className="bg-primary-500 hover:bg-primary-600 flex flex-1 items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-white shadow-md transition-all duration-200 hover:shadow-lg active:scale-95">
              Add Ingredient
              <span className="material-symbols-outlined text-lg font-bold">add</span>
              {/* Next: "Add loading state for add button" */}
            </button>

            <button className="text-primary-500 border-primary-500 flex items-center justify-center gap-2 rounded-lg border px-5 py-2.5 transition-all duration-200 hover:bg-gray-50 active:scale-95">
              Cancel
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
              {/* Next: "Add confirmation dialog before cancelling" */}
            </button>
          </div>
          {/* Next: "Add ingredient list display below form" */}
        </div>
      </div>
    </div>
  );
}
