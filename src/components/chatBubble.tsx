import React,{useEffect} from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';

const ChatBubble = React.memo((props: any) => {
  const { isLoading, role, message } = props;

  const isUser = role === 'user';
  useEffect(()=>{
    console.log(`Chat Bubble Rendered: ${message}`);
  },[])

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: !isUser ? 'flex-end' : 'flex-start',
        my: 1,
      }}
    >
      <Box
        sx={{
          maxWidth: '70%',
          p: 2,
          borderRadius: 3,
          backgroundColor: !isUser ? '#1976d2' : '#2e7d32',
          color: 'white',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
          position: 'relative',
        }}
      >
        
        <Typography variant="body1" color='white' >{message}</Typography>
        
      </Box>
    </Box>
  );
});

export default ChatBubble;
