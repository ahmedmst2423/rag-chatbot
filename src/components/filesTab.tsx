import { InsertDriveFile } from "@mui/icons-material";
import { Box, Button, Card, CardActionArea, CardActions, CardContent, LinearProgress, Stack, Typography } from "@mui/material";
import React from "react";

const FilesTab = React.memo(({ files, onFileClick, onFileDelete, isLoading }: any) => {
  const handleDelete = (file: any) => {
    onFileDelete?.(file);
  };

  return (
    <Box sx={{ overflowY: 'auto', mt: 2 }}>
      {isLoading && <LinearProgress sx={{ width: "100%", mb: 2 }} />}
      <Stack spacing={2}>
        {files &&
          files.length > 0 &&
          files.map((file: any) => (
            <Card
              key={file.id}
              variant="outlined"
              sx={{ borderRadius: 2 }}
              onClick={() => onFileClick?.(file)}
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
                  <InsertDriveFile color="primary" />
                  <Box sx={{ minWidth: 0 }}>
                    <Typography variant="subtitle1" noWrap sx={{ maxWidth: '100%' }}>
                      {file.filename}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {(file.file_size / 1024).toFixed(1)} KB • {file.file_type.toUpperCase()}
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
                    handleDelete(file);
                  }}
                >
                  <Typography color="error">

                  Delete
                  </Typography>
                </Button>
              </CardActions>
            </Card>
          ))}
      </Stack>
    </Box>
  );
});

export default FilesTab;