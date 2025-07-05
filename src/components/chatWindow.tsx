import 
// React,
 { useEffect }
  from 'react'
import { Box } from '@mui/material'
import ChatBubble from './chatBubble'
const ChatWindow = (props:any) => {
    const {chatHistory,isLoading} = props;
    useEffect(() => {
        console.log(`Chat Window Rendered`);
    },[]);
  return (
    <Box>
  {chatHistory.map((message: any, index: number) => (
    <ChatBubble
      key={index}
      isLoading={false}
      role={message.role}
      message={message.message}
    />
  ))}

  {isLoading && (
    <ChatBubble
      isLoading={true}
      role="bot"
      message="..."
    />
  )}
</Box>
  )
}

export default ChatWindow