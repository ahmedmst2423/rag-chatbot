import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/login';
import PrivateRoute from './components/privateRoute';
import ChatPage from './pages/chat';
import { useAuth } from './context/authContext';
import RegisterPage from './pages/signup';
import ModalRenderer from './components/modalRenderer';

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <Routes>
        {/* Redirect root to appropriate page based on auth status */}
        <Route 
          path="/" 
          element={
            isAuthenticated ? <Navigate to="/chat" replace /> : <LoginPage />
          } 
        />

        {/* Register route - redirect to chat if already authenticated */}
        <Route
          path="/register"
          element={
            isAuthenticated ? <Navigate to="/chat" replace /> : <RegisterPage />
          }
        />

        {/* Protected chat route */}
        <Route
          path="/chat"
          element={
            <PrivateRoute>
              <ChatPage />
              <ModalRenderer />
            </PrivateRoute>
          }
        />

        {/* Catch all - redirect to root */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
