import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App.tsx'

import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/queryClient.ts'

import { AuthProvider } from './app/providers/AuthProvider.tsx'
import { SocketProvider } from './app/providers/SocketProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SocketProvider>
          <App />
        </SocketProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
)
