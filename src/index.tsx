// import * as React from 'react';
import ReactDOM from 'react-dom/client';

// fonts
import '@fontsource/plus-jakarta-sans/latin.css';
import '@/lib/styles/globals.css';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


import { App } from './app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
const queryClient = new QueryClient();

root.render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>,
);
