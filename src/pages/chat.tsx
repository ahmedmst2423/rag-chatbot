import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/authContext';
import { useSession } from '../context/sessionContext';
import { useFiles } from '../hooks/useFiles';
import { useSessions } from '../hooks/useSessions';
import { useChat } from '../hooks/useChat';
import Sidebar from '../components/sidebar';
import ChatBox from '../components/chatBox';
import ChatWindow from '../components/chatWindow';
import { useModal } from '../context/modalContext';

const ChatPage = () => {
  const { logout } = useAuth();
  const { session, setSession } = useSession();

  const [query] = useState('');

  const {
    files,
    upload,
    remove: removeFile,
  } = useFiles();

  const {
    sessions,
    isLoading: loadingSessions,
    create,
    remove: removeSession
  } = useSessions();

  const { chatHistory, chat, isChatLoading } = useChat(session);
  const { openModal, closeModal, modalType, setProps } = useModal();

  useEffect(() => {
    if (modalType === 'confirm') {
      setProps({ isLoading: removeFile.isPending });
    }
  }, [removeFile.isPending, modalType, setProps]);

  useEffect(() => {
    if (modalType === 'upload') {
      setProps({ isLoading: upload.isPending });
    }
  }, [upload.isPending, modalType, setProps]);

  const handleSend = (query: string) => {
    const userMessage = { role: 'user', message: query };
    chatHistory.push(userMessage);
    chat({ query });
  };

  return (
    <>
      <Sidebar
        onLogout={logout}
        files={files}
        sessions={sessions}
        isLoading={loadingSessions}
        onFileDelete={(file: any) => {
          openModal('confirm', {
            title: 'Delete File',
            text: `Are you sure you want to delete the file ${file.filename}`,
            onYes: () => {
              removeFile.mutate(file.id,  { onSuccess: closeModal, onError: closeModal });
            },
            onCancel: closeModal,
            isLoading: removeFile.isPending
          });
        }}
        onSessionClick={setSession}
        onSessionDelete={removeSession.mutate}
        onNewChat={() => create.mutate()}
      >
        {/* Main Content */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            overflow: 'hidden',
            position: 'relative'
          }}
        >
          <Box sx={{ overflowY: 'auto', flex: 1, mb: 12, px: { xs: 1, md: 3 } }}>
            <ChatWindow chatHistory={chatHistory} isLoading={isChatLoading} />
          </Box>

          <Box
            sx={{
              position: 'fixed',
              bottom: 16,
              left: { xs: 16, md: 280 },
              right: 16,
              bgcolor: 'background.paper',
              zIndex: 1200,
            }}
          >
            <ChatBox
              onSend={(query: string) => handleSend(query)}
              onUpload={() =>
                openModal('upload', {
                  onSubmit: (files: any) => upload.mutate(files, { onSuccess: closeModal }),
                  isLoading: upload.isPending
                })
              }
              query={query}
            />
          </Box>
        </Box>
      </Sidebar>
    </>
  );
};

export default ChatPage;
