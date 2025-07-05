import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './context/authContext.tsx'
import { NotificationProvider } from './context/notificationContext.tsx'
import { ThemeProvider } from '@mui/material'
import theme from '../theme.ts' 
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './utils/queryClient.ts'
import { ModalProvider } from './context/modalContext.tsx'
import { SessionProvider } from './context/sessionContext.tsx'
// import ModalRenderer from './components/modalRenderer.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <NotificationProvider>

        <QueryClientProvider client={queryClient}>
          <SessionProvider>
    <AuthProvider>
        <ModalProvider>
            <App />
        </ModalProvider>
    </AuthProvider>
          </SessionProvider>
        </QueryClientProvider>
      </NotificationProvider>
    </ThemeProvider>
  </StrictMode>,
)
