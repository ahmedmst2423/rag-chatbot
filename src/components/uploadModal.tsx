import { useCallback, useState } from 'react';
import {
  Box,
  Modal,
  Typography,
  Button,
  Paper,
  IconButton,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
} from '@mui/material';
import { CloudUpload, Close } from '@mui/icons-material';
import { useDropzone } from 'react-dropzone';
import { useFiles } from '../hooks/useFiles';

// 🔧 Responsive Modal Box style
const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: {
    xs: '90vw',   // mobile
    sm: 400,      // small screen/tablets
    md: 500       // desktop
  },
  p: 3,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 2,
  maxHeight: '90vh',
  overflowY: 'auto',
};

const dropzoneStyle = {
  border: '2px dashed #90caf9',
  padding: '20px',
  borderRadius: '8px',
  textAlign: 'center' as const,
  cursor: 'pointer',
  bgcolor: '#f5f5f5',
  minHeight: '120px',
};

const UploadModal = (props: any) => {
  const { onSubmit, onClose } = props;
  const { upload } = useFiles();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setSelectedFiles((prev) => [...prev, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
  });

  const handleUpload = () => {
    if (selectedFiles.length > 0) {
      onSubmit(selectedFiles);
    }
  };

  const handleRemoveFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <Modal open onClose={onClose}>
      <Box sx={style}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6" fontSize={{ xs: '1rem', sm: '1.25rem' }}>
            Upload Files
          </Typography>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Box>

        <Paper elevation={0} sx={dropzoneStyle} {...getRootProps()}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <Typography>Drop the files here...</Typography>
          ) : selectedFiles.length > 0 ? (
            <Typography>{selectedFiles.length} file(s) selected</Typography>
          ) : (
            <Box>
              <CloudUpload sx={{ fontSize: 48, color: 'primary.main' }} />
              <Typography>Drag & drop files here, or click to select</Typography>
            </Box>
          )}
        </Paper>

        {selectedFiles.length > 0 && (
          <List dense sx={{ mt: 2, maxHeight: 150, overflowY: 'auto' }}>
            {selectedFiles.map((file, index) => (
              <ListItem
                key={index}
                secondaryAction={
                  <IconButton edge="end" onClick={() => handleRemoveFile(index)}>
                    <Close fontSize="small" />
                  </IconButton>
                }
              >
                <ListItemText
                  primary={file.name}
                  secondary={`${(file.size / 1024).toFixed(2)} KB`}
                />
              </ListItem>
            ))}
          </List>
        )}

        <Box mt={3} display="flex" justifyContent="flex-end" gap={2} flexWrap="wrap">
          <Button variant="text" disabled={upload.isPending} onClick={onClose}>
            Cancel
          </Button>
          <Button
            color={selectedFiles.length === 0 ? 'primary' : 'secondary'}
            variant="contained"
            onClick={handleUpload}
            disabled={selectedFiles.length === 0 || upload.isPending}
          >
            {upload.isPending ? <CircularProgress size={20} color="inherit" /> : 'Upload'}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default UploadModal;
