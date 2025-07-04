import { Box } from '@mui/material';
import { useNotification } from '../context/notificationContext';
import RegisterBox from '../components/signupBox';
import authService  from '../services/authService';

const RegisterPage = () => {
  const {showError,showSuccess} = useNotification();
  const {signup} = authService();

  const handleSignup = async (data: { email: string; password: string }) => {
    signup(data.email, data.password)
      .then((response:any)=>{
        showSuccess('Signup successful');
        // isAuthenticated ? navigate('/chat') : navigate('/'); // 👈 redirect to chat page after login
      })
      .catch((error:any)=>{
        showError(error.detail);
      })
    
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <RegisterBox
        onSubmit={(data: { email: string; password: string }) => {
          handleSignup(data);
        }}
      />
    </Box>
  );
};

export default RegisterPage;

