import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

export const QUERY_CLIENT = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60,
    },
  },
});

type Props = {
  children: React.ReactNode;
};

export const QueryProvider = ({ children }: Props) => {
  return <QueryClientProvider client={QUERY_CLIENT}>{children}</QueryClientProvider>;
};
