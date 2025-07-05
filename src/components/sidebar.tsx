import React, { 
  // useEffect,
   useState } from 'react';
import {
  Drawer,
  Toolbar,
  Box,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  Tabs,
  Tab,
  IconButton,
  Tooltip,
  useTheme,
  useMediaQuery
} from '@mui/material';
import InsertDriveFile from '@mui/icons-material/InsertDriveFile';
import Chat from '@mui/icons-material/Chat';
import Add from '@mui/icons-material/Add';
import { Logout, Menu } from '@mui/icons-material';
import FilesTab from './filesTab';
import ChatsTab from './chatsTab';

const drawerWidth = 280;

const Sidebar = React.memo((props: any) => {
  const {
    files,
    onFileClick,
    onFileDelete,
    sessions,
    onSessionClick,
    onSessionDelete,
    children,
    isLoading,
    onLogout,
    onNewChat
  } = props;

  const [currentTab, setCurrentTab] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleTabChange = (
    _event: React.SyntheticEvent,
     newValue: number) => {
    setCurrentTab(newValue);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNewChat = () => {
    onNewChat?.();
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const handleLogout = () => {
    onLogout?.();
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const drawerContent = (
    <>
      <Toolbar
        disableGutters
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          px: 1,
        }}
      >
        <Box
          component="img"
          src="src/assets/chat_page_logo.png"
          alt="QueryKoala"
          sx={{
            width: '70%',
            height: 'auto',
            objectFit: 'contain'
          }}
        />

        <Tooltip title="New Chat" arrow>
          <IconButton
            onClick={handleNewChat}
            color="primary"
            sx={{
              backgroundColor: 'secondary.main',
              color: 'white',
              '&:hover': {
                backgroundColor: 'tertiary.dark',
              },
              width: 30,
              height: 30,
            }}
          >
            <Add />
          </IconButton>
        </Tooltip>
      </Toolbar>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mt: 1 }}>
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{ minHeight: 40 }}
        >
          <Tab label="Chats" icon={<Chat />} iconPosition="start" sx={{ fontSize: '0.875rem' }} />
          <Tab label="Files" icon={<InsertDriveFile />} iconPosition="start" sx={{ fontSize: '0.875rem' }} />
        </Tabs>
      </Box>

      <Box
        sx={{
          flex: 1,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Box
          sx={{
            flex: 1,
            overflowY: 'auto',
            overflowX: 'hidden',
            '&::-webkit-scrollbar': {
              width: '6px',
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: '#f1f1f1',
              borderRadius: '3px',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#c1c1c1',
              borderRadius: '3px',
              '&:hover': {
                backgroundColor: '#a8a8a8',
              },
            },
          }}
        >
          {currentTab === 0 ? (
            <ChatsTab
              sessions={sessions}
              onSessionClick={onSessionClick}
              onSessionDelete={onSessionDelete}
              isLoading={isLoading}
            />
          ) : (
            <FilesTab
              files={files}
              onFileClick={onFileClick}
              onFileDelete={onFileDelete}
              isLoading={isLoading}
            />
          )}
        </Box>
      </Box>

      <Box sx={{ mt: 'auto', pt: 2 }}>
        <Card variant="outlined" sx={{ borderRadius: 2 }}>
          <CardActionArea onClick={handleLogout}>
            <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 1.5 }}>
              <Logout color="error" />
              <Typography variant="body1" fontWeight={500}>
                Logout
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Box>
    </>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {isMobile && (
        <IconButton
          onClick={handleDrawerToggle}
          sx={{
            position: 'fixed',
            top: 16,
            left: 16,
            zIndex: 1300,
            backgroundColor: 'primary.main',
            color: 'white',
            '&:hover': {
              backgroundColor: 'primary.dark',
            }
          }}
        >
          <Menu />
        </IconButton>
      )}

      {!isMobile && (
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: 'border-box',
              paddingBottom: 2,
              backgroundColor: '#f8f9fa',
              display: 'flex',
              flexDirection: 'column',
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}

      {isMobile && (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: 'border-box',
              paddingBottom: 2,
              backgroundColor: '#f8f9fa',
              display: 'flex',
              flexDirection: 'column',
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { xs: '100%', md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          display: 'flex',
          flexDirection: 'column',
          position: 'relative'
        }}
      >
        {children}
      </Box>
    </Box>
  );
});

export default Sidebar;
