import { useMutation, useQuery } from '@tanstack/react-query'
import useChatService from '../services/chatService';
import { queryClient } from '../utils/queryClient';
// import { useNotification } from '../context/notificationContext';

export const useChat = (sessionId: number | null) => {
const { chat, getChatHistory } = useChatService();
// const { showInfo,showError } = useNotification();
  const chatMutation = useMutation({
    mutationFn: ({ query }: { query: string }) => {
      
      return sessionId ? chat(query, sessionId) : chat(query,null); 
    },
    
    onSuccess: ()=>{
      sessionId===null && queryClient.invalidateQueries({ queryKey: ['sessions'] });
      queryClient.invalidateQueries({ queryKey: ['chatHistory', sessionId] });
    }
    
  });

  const { data: chatHistory = [] } = useQuery({
    queryKey: ['chatHistory', sessionId],
    queryFn: async () => {
      if (!sessionId) throw new Error("No session ID");
      return getChatHistory(sessionId);
    },
    enabled: !!sessionId,
  });

  return {
    chatHistory,
    chat: chatMutation.mutate,
    isChatLoading: chatMutation.isPending,
  }
}
