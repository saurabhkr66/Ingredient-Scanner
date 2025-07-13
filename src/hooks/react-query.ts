import { Report, SReport } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
// import { useRouter } from "next/navigation";
//todo if axios error throw new error Error(error.response.data.error) else throw error
export function useIp() {
  return useQuery({
    queryKey: ["pricing"],
    queryFn: async () => {
      try {
        const { data } = await axios.get("http://ip-api.com/json");
        return data as {
          query: string;
          status: string;
          country: string;
          countryCode: string;
          region: string;
          regionName: string;
          city: string;
        };
      } catch (err) {
        throw err instanceof AxiosError ? err.response : err;
      }
    },
    staleTime: Infinity,
    retry: 2,
    refetchOnWindowFocus: false,
  });
}
export async function getSingleReport(id: string) {
  try {
    const { data } = await axios.post("/api/report", { id });
    if (!data.success) throw new Error(data?.error ?? "internal error");
    return data as SReport;
  } catch (err) {
    throw err instanceof AxiosError ? err.response?.data : err;
  }
}
export async function updateReport({
  id,
  hidden = false,
  tittle = undefined,
}: {
  id: Readonly<string>;
  hidden?: boolean;
  tittle?: string;
}): Promise<{ success: boolean; message: string; error?: string }> {
  try {
    if (!id) {
      throw Error("history id is required!");
    }
    const { data } = await axios.put("/api/report", { id, hidden, tittle });
    if (!data.success) {
      throw new Error(data?.error ?? "internal server error");
    }
    return data;
  } catch (error) {
    throw error instanceof AxiosError ? error.response?.data : error;
  }
}
export async function getReportId({ formData }: { formData: Readonly<FormData> }): Promise<{
  success: boolean;
  id: string;
  choice: string;
  error?: string;
}> {
  try {
    const { data } = await axios.post(`/api/generate-report`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (!data.success) {
      throw new Error(data?.error ?? "internal server error");
    }
    return data;
  } catch (error) {
    throw error instanceof AxiosError ? error.response : error;
  }
}
export async function getReport(): Promise<{
  success: boolean;
  reports: Report[];
  error?: string;
}> {
  try {
    const { data } = await axios.get("/api/report");
    if (!data.success) {
      throw new Error(data?.error ?? "internal server error");
    }
    return data;
  } catch (error) {
    throw error instanceof AxiosError ? error.response?.data : error;
  }
}
export function useGenerateReportMutation() {
  return useMutation({
    mutationFn: getReportId,
  });
}
export function useReportQuery() {
  return useQuery({
    queryKey: ["reports"],
    queryFn: getReport,

    staleTime: 10 * 1000,
  });
}
export function useGetSingleReportQuery(id: string) {
  return useQuery({
    queryKey: ["report", id],
    queryFn: () => getSingleReport(id),
    enabled: !!id,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 10 * 1000,
  });
}
export function useUpdateReportMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateReport,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["reports"] });
    },
  });
}
export async function getTextReportId({
  ingredients,
  type,
}: {
  ingredients: string[];
  type: "food" | "cosmetic";
}): Promise<{
  success: boolean;
  id: string;
  choice: string;
  error?: string;
}> {
  try {
    const formData = new FormData();
    formData.append("ingredients", JSON.stringify(ingredients));
    formData.append("type", type);

    const { data } = await axios.post(`/api/generate-manualreport`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (!data.success) {
      throw new Error(data?.error ?? "internal server error");
    }

    return data;
  } catch (error) {
    throw error instanceof AxiosError ? error.response?.data : error;
  }
}
export function useGenerateTextReportMutation() {
  return useMutation({
    mutationFn: getTextReportId,
  });
}

