"use client";

import { useMemo } from "react";
import IngredientChart from "./ingredientchart";
import IngredientLabel from "./ingredientlabel";
import { CosmeticReport, FoodReport } from "@/types";

export default function CountingfoodIngredientChart({
  report,
}: {
  report: Readonly<CosmeticReport>;
}) {
  const count = useMemo(() => {
    const counts = {
      Concerns: 0,
      Allergens: 0,
      Safe: 0,
    };

    if (report?.ingredients?.length) {
      for (const ingredient of report.ingredients) {
        if (ingredient.category === "Unhealthy") {
          counts.Concerns++;
        } else if (ingredient.category === "Neutral") {
          counts.Allergens++;
        } else if (ingredient.category === "Healthy") {
          counts.Safe++;
        }
      }
    }

    return counts;
  }, [report]);

  return (
    <main className="flex flex-col items-center justify-center bg-blue-50 p-4 dark:bg-black">
      <div className="flex w-full max-w-md flex-col items-center">
        <div className="relative mb-8 h-72 w-72">
          <IngredientChart
            Concerns={count.Concerns}
            Allergens={count.Allergens}
            Safe={count.Safe}
          />
        </div>

        <h2 className="mb-6 text-center text-2xl font-bold">Ingredients Break-Down</h2>

        <div className="flex w-full flex-col items-center space-y-4">
          {/* Top Row: Two items side-by-side */}
          <div className="flex justify-center gap-4">
            <IngredientLabel
              label="Allergen"
              count={count.Allergens}
              color="bg-yellow-400"
              textColor="text-yellow-800"
              borderColor="border-yellow-400"
              icon="allergen"
            />
            <IngredientLabel
              label="Concern"
              count={count.Concerns}
              color="bg-red-500"
              textColor="text-red-800"
              borderColor="border-red-500"
              icon="warning"
            />
          </div>

          {/* Centered below */}
          <div>
            <IngredientLabel
              label="Safe"
              count={count.Safe}
              color="bg-green-500"
              textColor="text-green-800"
              borderColor="border-green-500"
              icon="check"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
