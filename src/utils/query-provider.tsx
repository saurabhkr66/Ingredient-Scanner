"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import React, { ReactNode, useState } from "react";

export default function QueryProviders({ children }: { children: Readonly<ReactNode> }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 10 * 1000,
          },
        },
      }),
  );
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
