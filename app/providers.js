'use client';

import { Provider } from 'jotai';
import { useHydrateAtoms } from 'jotai/react/utils';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { queryClientAtom } from 'jotai-tanstack-query';

const queryClient = new QueryClient();

const HydrateAtoms = ({ children }) => {
  useHydrateAtoms([[queryClientAtom, queryClient]]);
  return children;
};

const Providers = ({ children }) => (
  <Provider>
    <QueryClientProvider client={queryClient}>
      <HydrateAtoms>{children}</HydrateAtoms>
    </QueryClientProvider>
  </Provider>
);

export default Providers;
