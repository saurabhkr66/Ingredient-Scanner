"use client";
import { useEffect, useState, useMemo } from "react";
import { useReportQuery } from "@/hooks/react-query";
import Loading from "@/components/common/Loading";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import Menu from "./Menu";
import { toast } from "sonner";

function MySelect({ type, setType }: { type: string; setType: (type: string) => void }) {
  return (
    <Select defaultValue={type} onValueChange={(value) => setType(value)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select type" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Type</SelectLabel>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="hidden">Hidden</SelectItem>
          <SelectItem value="food">Food</SelectItem>
          <SelectItem value="cosmetic">Cosmetic</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default function History() {
  const [type, setType] = useState<string>("all");
  const { data, isError, isLoading, error } = useReportQuery();

  const reports = useMemo(() => {
    if (!data?.reports) return [];
    return data.reports.filter((r) => !r.hidden);
  }, [data]);

  const hiddenReports = useMemo(() => {
    if (!data?.reports) return [];
    return data.reports.filter((r) => r.hidden);
  }, [data]);

  const filteredReports = useMemo(() => {
    if (type === "food" || type === "cosmetic") {
      return reports.filter((r) => r.choice === type);
    }
    if (type === "hidden") return hiddenReports;
    return reports;
  }, [type, reports, hiddenReports]);

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [isError, error]);

  if (isLoading) return <Loading />;

  return (
    <div className="flex max-w-full flex-col justify-center gap-4 p-2 sm:gap-6 sm:p-4 md:p-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-foreground text-2xl font-bold sm:text-3xl">History</h1>
        <MySelect type={type} setType={setType} />
      </div>

      {filteredReports.length === 0 && (
        <p className="text-muted-foreground text-center">No reports to show.</p>
      )}

      {filteredReports.map((report) => (
        <div
          key={report._id}
          className={`container flex w-full items-center justify-between rounded-xl border px-4 py-3 shadow-lg ${
            report.hidden ? "opacity-70 border-dashed" : ""
          }`}
        >
          <Link href={`history/${report._id}?type=${report.choice}`}>
            <div className="flex gap-2 text-sm leading-none font-medium">
              {report.imageUrl && (
                <img
                  height={60}
                  width={60}
                  src={report.imageUrl}
                  alt="preview"
                  className="mr-2 rounded-lg object-fill"
                />
              )}
              <div className="flex flex-col gap-2 px-2 py-1">
                <span className="text-foreground">{report.historyTitle}</span>
                <p className="text-muted-foreground">
                  {report.createdAt && new Date(report.createdAt).toLocaleDateString()}
                </p>
                {report.hidden && (
                  <span className="text-xs text-red-500 font-medium">Hidden</span>
                )}
              </div>
            </div>
          </Link>

          <div className="flex gap-4 items-center">
            {report.creditsUsed && (
              <p className="text-sm text-muted-foreground">credits: {report.creditsUsed}</p>
            )}
            {/* ✅ Fix: Pass hidden prop here */}
            <Menu
              id={report._id as string}
              title={report.historyTitle}
              hidden={report.hidden}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
