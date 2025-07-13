import { CosmeticReport, FoodReport } from "@/types";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { ChevronDown, ChevronUp, CircleCheck, DnaOff, TriangleAlert } from "lucide-react";
interface Props {
  report: FoodReport | CosmeticReport;
}
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
function getCategoryIcon(category: "Healthy" | "Neutral" | "Unhealthy") {
  switch (category) {
    case "Healthy":
      return <CircleCheck className="text-foreground" />;
    case "Unhealthy":
      return <TriangleAlert className="text-foreground" />;
    default:
      return <DnaOff className="text-foreground" />;
  }
}
function getCategoryStyle(category: "Healthy" | "Neutral" | "Unhealthy") {
  switch (category) {
    case "Healthy":
      return "bg-green-500 ";
    case "Unhealthy":
      return "bg-red-500 ";
    default:
      return "bg-yellow-500  ";
  }
}
export default function ProductDetails({ report }: Props) {
  const [close, setClose] = useState<boolean>(false);
  return (
    <div className="sm:p-2 md:p-4">
      <Card className="flex flex-col items-center justify-center rounded-2xl shadow-2xl">
        <CardHeader className="w-full">
          <CardTitle className="flex items-center justify-between text-3xl">
            <div className="flex-1 self-end md:text-center">Ingredient Detected From Your Scan</div>
            {close ? (
              <ChevronDown onClick={() => setClose((p) => !p)} />
            ) : (
              <ChevronUp onClick={() => setClose((p) => !p)} />
            )}{" "}
          </CardTitle>
          <CardDescription className="text-center">
            we've listed the ingredient detected. Review them before proceeding
          </CardDescription>
        </CardHeader>
        {!close && (
          <>
            <CardContent className="w-full p-1 sm:p-2 md:p-4">
              <p className="text-muted-foreground mb-2 text-end">
                Scanned Ingredient:{" "}
                <span className="text-secondary-foreground font-bold">
                  {report.ingredients.length ?? 0}
                </span>
              </p>
              <div className="flex flex-wrap justify-around gap-6 sm:p-2 md:p-4">
                {report.ingredients.map((ingredient, idx) => (
                  <Select defaultValue={ingredient.category ?? ""} key={idx}>
                    <SelectTrigger className="bg-secondary w-[230px] min-w-fit justify-between">
                      <SelectValue>
                        <div className="flex items-center gap-3">
                          <p className="text-muted-foreground">ingredient {idx + 1}</p>{" "}
                          <span
                            className={`text-accent-foreground flex gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${getCategoryStyle(
                              ingredient.category,
                            )}`}
                          >
                            {getCategoryIcon(ingredient.category)}
                            {ingredient.category}
                          </span>
                        </div>
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="name">
                        {" "}
                        <p className="text-muted-foreground">name:</p> {ingredient.name}
                      </SelectItem>
                      <SelectItem value="category">
                        {" "}
                        <p className="text-muted-foreground">category:</p> {ingredient.category}
                      </SelectItem>
                      <SelectItem value="reason">
                        <p className="text-muted-foreground">reason:</p> {ingredient.reason}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                ))}
              </div>
            </CardContent>
          </>
        )}
      </Card>
    </div>
  );
}
