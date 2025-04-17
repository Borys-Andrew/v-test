'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';

import { ToasterProvider } from './toasterProvider';
import { queryClient } from '../libs';

type AppProviderProps = {
  children: ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ToasterProvider />
    </QueryClientProvider>
  );
};
