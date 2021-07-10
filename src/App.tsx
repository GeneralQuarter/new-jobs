import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { JobsPage } from './components/JobsPage';

import './App.css';


const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <JobsPage />
      </QueryClientProvider>
    </>
  );
}

export default App;
