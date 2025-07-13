"use client";
import { useEffect, useMemo } from "react";
import { useReportQuery } from "@/hooks/react-query";
import Loading from "@/components/common/Loading";
import Link from "next/link";
import Menu from "./Menu";
import { toast } from "sonner";

export default function HiddenReportsOnly() {
  const { data, isError, isLoading, error } = useReportQuery();

  const hiddenReports = useMemo(() => {
    if (!data?.reports) return [];
    return data.reports.filter((r) => r.hidden);
  }, [data]);

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [isError, error]);

  if (isLoading) return <Loading />;

  return (
    <div className="flex max-w-full flex-col justify-center gap-4 p-2 sm:gap-6 sm:p-4 md:p-8">
      <h1 className="text-foreground text-2xl font-bold sm:text-3xl mb-4">Hidden Reports</h1>

      {hiddenReports.length === 0 && (
        <p className="text-muted-foreground text-center">No hidden reports to show.</p>
      )}

      {hiddenReports.map((report) => (
        <div
          key={report._id}
          className="container flex w-full items-center justify-between rounded-xl border border-dashed opacity-70 px-4 py-3 shadow-lg"
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
                <span className="text-xs text-red-500 font-medium">Hidden</span>
              </div>
            </div>
          </Link>

          <div className="flex gap-4 items-center">
            {report.creditsUsed && (
              <p className="text-sm text-muted-foreground">credits: {report.creditsUsed}</p>
            )}
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
