"use client";

//tanstack query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

//query client
const queryClient = new QueryClient();

//types
import { ReactNode } from "react";

export const ReactQueryProvider = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
