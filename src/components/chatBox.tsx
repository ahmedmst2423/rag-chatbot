import React, { useState } from 'react';
import {
  // Box,
  IconButton,
  TextField,
  Paper,
  Stack,
} from '@mui/material';
import { Send, AttachFile } from '@mui/icons-material';

const ChatBox = (props: any) => {
  const { query, onSend, onUpload } = props;
  const [inputValue, setInputValue] = useState(query || '');

  const handleSend = () => {
    if (inputValue.trim() !== '') {
      onSend(inputValue.trim());
      setInputValue('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const handleUploadClick = () => {
   onUpload?.();
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        borderRadius: 2,
        backgroundColor: 'background.paper',
      }}
    >
      <Stack direction="row" spacing={1} alignItems="center">
        <IconButton onClick={handleUploadClick} color="primary">
          <AttachFile />
        </IconButton>

        <TextField
          fullWidth
          placeholder="Type your message..."
          variant="outlined"
          size="small"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          sx={{
            border: 'none',
            outline: 'none',
            '&:focus': {
              border: 'none',
              outline: 'none',
            },
          }}
        />

        <IconButton onClick={handleSend} color="primary">
          <Send />
        </IconButton>
      </Stack>
    </Paper>
  );
};

export default ChatBox;
