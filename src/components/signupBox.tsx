import { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
} from '@mui/material';
const RegisterBox = ({ onSubmit }:any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = (e:any) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit({ email, password });
      // setEmail('');
      // setPassword('');
    }
  };

  return (
    
      <Card sx={{maxHeight: 400 ,p: 2, display: 'flex', flexDirection: 'column', maxWidth: 400, margin: 'auto' }}>
        <CardContent>
          <Typography variant="h5" gutterBottom align="center">
            Register
          </Typography>
          <form onSubmit={handleRegister}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e:any) => setEmail(e.target.value)}
              type="email"
              required
            />
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e:any) => setPassword(e.target.value)}
              type="password"
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              Sign Up
            </Button>
          </form>
        </CardContent>
      </Card>
      );
};

export default RegisterBox;
