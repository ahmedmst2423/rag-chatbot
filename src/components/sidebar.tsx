import React, { useEffect, useState } from 'react';
import {
  Drawer,
  Toolbar,
  Box,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  Stack,
  CardActions,
  Button,
  LinearProgress,
  Tabs,
  Tab,
  IconButton,
  Tooltip
} from '@mui/material';
import InsertDriveFile from '@mui/icons-material/InsertDriveFile';
import Chat from '@mui/icons-material/Chat';
import Add from '@mui/icons-material/Add';
import { Logout } from '@mui/icons-material';
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

  useEffect(() => {
    console.log(`Files in Chat Page: ${files}`);
    console.log(`Sessions in Chat Page: ${sessions}`);
  }, [files, sessions]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
            padding: 2,
            backgroundColor: '#f8f9fa',
            display: 'flex',
            flexDirection: 'column',
          },
        }}
      >
        {/* Header with Title and New Chat Button */}
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" noWrap>
            Dashboard
          </Typography>
          <Tooltip title="New Chat" arrow>
            <IconButton 
              onClick={() => onNewChat?.()}
              color="primary"
              sx={{ 
                backgroundColor: 'primary.main',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'primary.dark',
                },
                width: 36,
                height: 36
              }}
            >
              <Add />
            </IconButton>
          </Tooltip>
        </Toolbar>

        {/* Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mt: 1 }}>
          <Tabs 
            value={currentTab} 
            onChange={handleTabChange} 
            variant="fullWidth"
            sx={{ minHeight: 40 }}
          >
            <Tab 
              label="Chats" 
              icon={<Chat />} 
              iconPosition="start"
              sx={{ minHeight: 40, fontSize: '0.875rem' }}
            />
            <Tab 
              label="Files" 
              icon={<InsertDriveFile />} 
              iconPosition="start"
              sx={{ minHeight: 40, fontSize: '0.875rem' }}
            />
          </Tabs>
        </Box>

        {/* Tab Content with Scrolling */}
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
            {currentTab === 0 && (
              <ChatsTab
                sessions={sessions}
                onSessionClick={onSessionClick}
                onSessionDelete={onSessionDelete}
                isLoading={isLoading}
              />
            )}
            {currentTab === 1 && (
              <FilesTab
                files={files}
                onFileClick={onFileClick}
                onFileDelete={onFileDelete}
                isLoading={isLoading}
              />
            )}
          </Box>
        </Box>

        {/* Logout Button */}
        <Box sx={{ mt: 'auto', pt: 2 }}>
          <Card variant="outlined" sx={{ borderRadius: 2 }}>
            <CardActionArea onClick={() => onLogout?.()}>
              <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 1.5 }}>
                <Logout color="error" />
                <Typography variant="body1" fontWeight={500}>
                  Logout
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, width: '100% - 280px', ml: 2, mr: 2, mt: 2 }}>
        {children}
      </Box>
    </Box>
  );
});

export default Sidebar;