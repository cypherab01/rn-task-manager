'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1, // fewer retries on mobile
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60, // 1 min
    },
  },
});

type Props = {
  children: React.ReactNode;
};

export const QueryProvider = ({ children }: Props) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
