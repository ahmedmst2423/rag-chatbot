import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LoginBox from '../components/loginBox';
import { useAuth } from '../context/authContext';
import { useNotification } from '../context/notificationContext';

const LoginPage = () => {
  const {login, } = useAuth();
  const {showError,showSuccess} = useNotification();
  const navigate = useNavigate();


  const handleLogin = async (data: { email: string; password: string }) => {
    login(data.email, data.password)
      .then(()=>{
        showSuccess('Login successful');
        // isAuthenticated ? navigate('/chat') : navigate('/'); // 👈 redirect to chat page after login
      })
      .catch((error:any)=>{
        showError(error);
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
        <Box component={'img'} src='logo.png' sx={{width:250}} />
      </Box>
      <Box 
        sx={{mb:22, mx:3}}
      >
        <LoginBox
          onSubmit={handleLogin}
          />
          <Button variant='outlined'
           color='primary'
           sx={{mt:2}
           }
           onClick={()=>navigate('/register')}
           >
             Signup Here !!</Button>
      </Box>
    </Box>
    
  );
};

export default LoginPage;
