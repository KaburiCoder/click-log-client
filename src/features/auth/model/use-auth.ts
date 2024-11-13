import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const navigate = useNavigate();
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: '',
  });

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    localStorage.setItem('isAuthenticated', 'true');
    navigate('/');
  };

  return {
    loginForm,
    setLoginForm,
    handleLogin,
  };
}; 