"use client";
import Loading from "@/components/common/Loading";
import { useGetSingleReportQuery } from "@/hooks/react-query";
import { useSearchParams } from "next/navigation";
import Food from "./Food";
import Cosmetic from "./Cosmetic";

interface Props {
  id: Readonly<string>;
}
export default function Report({ id }: Props) {
  const searchParams = useSearchParams();
  const { data, isError, isLoading } = useGetSingleReportQuery({ id });
  if (isError) {
    return <div>error occur while fetching query</div>;
  }
  if (isLoading) {
    return <Loading />;
  }
  if (data) {
    const type = searchParams.get("type");
    const [message] = data.data.messages.filter(
      (message) => message.role == "assistant" || message.role == "system",
    );
    const temp = message.content.replace(/^```json\n|```$/g, "").trim();
    const report = JSON.parse(temp) ?? null;

    return (
      <div className="flex max-w-full flex-col justify-center gap-4 space-y-4 bg-blue-100 p-2 pt-40 sm:p-4 md:p-8 dark:bg-black">
        {type == "food" && <Food report={report} imageUrl={data.data.imageUrl} />}
        {type == "cosmetic" && <Cosmetic report={report} imageUrl={data.data.imageUrl} />}
      </div>
    );
  }
}
