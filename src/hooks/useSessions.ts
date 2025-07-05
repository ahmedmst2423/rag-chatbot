import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import useChatService from '../services/chatService'
import { useSession } from '../context/sessionContext'

export const useSessions = () => {
  const queryClient = useQueryClient()
  const {setSession} = useSession()
    const { getSessions, newSession, deleteSession } = useChatService()
  const { data: sessions = [], isLoading } = useQuery({
    queryKey: ['sessions'],
    queryFn: getSessions,
  })

  const create = useMutation({
    mutationFn: newSession,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['sessions'] })
      setSession(data ? data.id : null)
      
    }
  })

  const remove = useMutation({
    mutationFn: deleteSession,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sessions'] })
      setSession(null)
    }
  })

  return { sessions, isLoading, create, remove }
}
