import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import RegisterBox from '../components/signupBox';
import { useNotification } from '../context/notificationContext';
import authService from '../services/authService';
import { useState } from 'react';

const RegisterPage = () => {
  const { showError, showSuccess } = useNotification();
  const { signup } = authService();
  const navigate = useNavigate();
  const [isLoading,setIsLoading] = useState<Boolean>(false);

  const handleSignup = async (data: { email: string; password: string }) => {
    setIsLoading(true);
    signup(data.email, data.password)
      .then(() => {
        showSuccess('Signup successful');
        // navigate('/chat'); // 👈 redirect if needed
      })
      .catch((error: any) => {
        showError(error?.detail || 'Signup failed');
      })
      .finally(()=>{
        setIsLoading(false);
      })
  };

  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      justifyContent={'center'}
      alignItems={'center'}
      height={'100%'}
      width={'100%'}
    >
      <Box>
        <Box component={'img'} src='logo.png' sx={{ width: 250 }} />
      </Box>
      <Box sx={{ mb: 22, mx: 3 }}>
        <RegisterBox onSubmit={handleSignup} isLoading={isLoading} />
        <Button variant='outlined' color='primary' sx={{ mt: 2 }} onClick={() => navigate('/login')}>
          Already have an account? Login here!
        </Button>
      </Box>
    </Box>
  );
};

export default RegisterPage;
