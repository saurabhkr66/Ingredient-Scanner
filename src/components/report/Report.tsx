"use client";
import { useGetSingleReportQuery } from "@/hooks/react-query";
import { useMemo, useEffect } from "react";
import Loading from "../common/Loading";
import { toast } from "sonner";
export default function Report({ id }: { id: string }) {
  const { data, isError, error, isLoading } = useGetSingleReportQuery(id);
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
  return <div>reports</div>;
}
