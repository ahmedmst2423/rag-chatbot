import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  CircularProgress
} from '@mui/material';

interface DeleteModalProps {
  onYes: () => void;
  onCancel: () => void;
  isLoading: boolean;
  text: string;
  title:string;
}

const ConfirmModal: React.FC<DeleteModalProps> = React.memo((props) => {
  const { onYes, onCancel, isLoading, text, title } = props;

  return (
    <Dialog open onClose={isLoading ? undefined : onCancel} disableEscapeKeyDown={isLoading}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{text}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onCancel}
          color="primary"
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button
          onClick={onYes}
          color="error"
          variant="contained"
          disabled={isLoading}
          startIcon={isLoading && <CircularProgress size={18} color="inherit" />}
        >
          {isLoading ? 'Deleting...' : 'Yes, Delete'}
        </Button>
      </DialogActions>
    </Dialog>
  );
});

export default ConfirmModal;
