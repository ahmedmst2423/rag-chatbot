import React, { createContext, useContext, useState, type ReactNode } from 'react';
import { Snackbar, Alert, type AlertColor, Typography } from '@mui/material';

type NotificationContextType = {
  showSuccess: (message: string) => void;
  showError: (message: string) => void;
  showInfo: (message: string) => void;
};

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) throw new Error('useNotification must be used within NotificationProvider');
  return context;
};

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState<AlertColor>('info');

  const triggerNotification = (msg: string, type: AlertColor) => {
    setMessage(msg);
    setSeverity(type);
    setOpen(true);
  };

  const showSuccess = (msg: string) => triggerNotification(msg, 'success');
  const showError = (msg: string) => triggerNotification(msg, 'error');
  const showInfo = (msg: string) => triggerNotification(msg, 'info');

  const handleClose = () => setOpen(false);

  return (
    <NotificationContext.Provider value={{ showSuccess, showError, showInfo }}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleClose}
          severity={severity}
          variant="filled"
          sx={{ width: '100%' }}
          color={severity}
        >
        <Typography color='white' fontWeight={500}>
          {message}
        </Typography>
        </Alert>
      </Snackbar>
    </NotificationContext.Provider>
  );
};
