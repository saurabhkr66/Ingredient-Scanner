"use client";
import Loading from "@/components/common/Loading";
import { useGetSingleReportQuery } from "@/hooks/react-query";
import ProductOverview from "@/components/history/product-overview";
import ProductDetails from "@/components/history/detected-ingredient";
import { CosmeticReport, FoodReport } from "@/types";
import { useEffect, useMemo } from "react";
import { toast } from "sonner";
export default function Overview({ id }: { id: string }) {
  const { data, isSuccess, isError, error, isLoading } = useGetSingleReportQuery(id as string);
  const report = useMemo(() => {
    if (!data) {
      return null;
    }
    const [message] = data.data.messages.filter(
      (message) => message.role == "assistant" || message.role == "system",
    );
    const temp = message.content.replace(/^```json\n|```$/g, "").trim();
    const parsed = JSON.parse(temp) ?? null;
    return {
      ...parsed,
      imageUrl: data.data.imageUrl,
      type: data.data.type,
    };
  }, [data]);
  useEffect(() => {
    if (error) {
      toast.error(error.message ?? "internal server error");
    }
  }, [isError, error]);
  if (isLoading) return <Loading />;
  if (!report) return <Loading />;
  return (
    <div className="flex max-w-full flex-col justify-center gap-4 space-y-4 p-2 sm:p-4 md:p-8">
      <ProductOverview report={report} id={id} />
      <ProductDetails report={report} />
      
    </div>
  );
}
