import { Box } from '@mui/material'
import { useState } from 'react'
import { useAuth } from '../context/authContext'
import { useNotification } from '../context/notificationContext'
import { useSession } from '../context/sessionContext'
import { useFiles } from '../hooks/useFiles'
import { useSessions } from '../hooks/useSessions'
import { useChat } from '../hooks/useChat'
import Sidebar from '../components/sidebar'
import ChatBox from '../components/chatBox'
import ChatWindow from '../components/chatWindow'
import UploadModal from '../components/uploadModal'
import ConfirmModal from '../components/confirmModal'
import { useModal } from '../context/modalContext'

const ChatPage = () => {
  const { logout } = useAuth()
  const { session, setSession } = useSession()

  const [query, setQuery] = useState('')
  const [selectedFile, setSelectedFile] = useState<any>(null)

  const { 
    files, 
    isLoading: loadingFiles, 
    upload, isUploadLoading,  
    remove: removeFile, 
    isRemoveFileLoading 
  } = useFiles()
  const { sessions, isLoading: loadingSessions, create, remove: removeSession } = useSessions()
  const { chatHistory, chat, isChatLoading} = useChat(session)
  const { openModal, closeModal,modalType, modalProps } = useModal();

  const handleSend = (query:string) => {
    const userMessage = { role: 'user', message: query }
    chatHistory.push(userMessage)
    const response =  chat({ query });
    
  }
  

  return (
    <>
      <Sidebar
        onLogout={logout}
        files={files}
        sessions={sessions}
        isLoading={loadingSessions}
        onFileDelete= {(file:any) => {
          openModal("confirm",{
            title: "Delete File",
            text: `Are you sure you want to delete the file ${file.filename} is pending ${removeFile.isPending}`,
            onYes :
              () => {
                removeFile.mutate(file.id, {onSuccess:closeModal})
              },
            onCancel: closeModal,
            isLoading:isRemoveFileLoading
          })
        }}
        onSessionClick={setSession}
        onSessionDelete={removeSession.mutate}
        onNewChat={() => create.mutate()}
      >
        <Box sx={{ overflowY: 'auto', height: '100%', mb: 10 }}>
          <ChatWindow chatHistory={chatHistory} isLoading={isChatLoading} />
        </Box>

        <Box sx={{ position: 'fixed', bottom: 16, left: 280, right: 16, bgcolor: 'background.paper', mt: 10 }}>
          <ChatBox
            onSend={(query:string)=>handleSend(query)}
            onUpload={() => 
              openModal("upload", {
                onSubmit: (files:any) => upload.mutate(files, { onSuccess: closeModal }),
                upload:upload,
              })}
            query={query}
          />
        </Box>
      </Sidebar>
    </>
  )
}

export default ChatPage
