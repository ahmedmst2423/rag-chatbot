import {ChatOutlined as Chat} from "@mui/icons-material";
import { Box, Button, Card, CardActionArea, CardActions, CardContent, LinearProgress, Stack, Typography } from "@mui/material";
import React from "react";

const ChatsTab = React.memo(({ sessions, onSessionClick, onSessionDelete, isLoading }: any) => {
    const handleDelete = (session: any) => {
      onSessionDelete?.(session.id);
    };
  
    return (
      <Box sx={{ overflowY: 'auto', mt: 2 }}>
        {isLoading && <LinearProgress sx={{ width: "100%", mb: 2 }} />}
        <Stack spacing={2}>
          {sessions &&
            sessions.length > 0 &&
            sessions.map((session: any) => (
              <Card
                key={session.id}
                variant="outlined"
                sx={{ borderRadius: 2 }}
                onClick={() => onSessionClick?.(session.id)}
              >
                <CardActionArea>
                  <CardContent
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      overflow: 'hidden',
                    }}
                  >
                    <Chat color="primary" />
                    <Box sx={{ minWidth: 0 }}>
                      <Typography variant="subtitle1" noWrap sx={{ maxWidth: '100%' }}>
                        {session.title || session.name || `Session ${session.id}`}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {session.created_at ? new Date(session.created_at).toLocaleDateString() : 'Recent'}
                      </Typography>
                    </Box>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button
                    size="small"
                    color="primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(session);
                    }}
                  >
                    Delete
                  </Button>
                </CardActions>
              </Card>
            ))}
        </Stack>
      </Box>
    );
  });

export default ChatsTab;