import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import App from './App.tsx';

const queryCache = new QueryCache({
  onError: (error, query) => {
    console.error(`Query with key: "${query.queryKey}" failed:`, error);
  },
});

const queryClient = new QueryClient({ queryCache });

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>
);
