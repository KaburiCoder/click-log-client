import { useMutation } from '@tanstack/react-query';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authSignin } from '../api/auth-signin';
import { AxiosError } from 'axios';
import { STORAGE_KEYS } from '@/shared/constants/storage-keys';

export const useAuth = () => {
  const navigate = useNavigate();
  const { mutate: signin, isPending } = useMutation({
    mutationFn: authSignin,
    onSuccess: (data) => {
      localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, data.accessToken);
      navigate('/');
    },
    onError: (error: AxiosError) => {
      if (error.response?.status === 401) {
        alert('아이디 또는 비밀번호가 일치하지 않습니다.');
      } else {
        alert('알 수 없는 오류가 발생했습니다.');
      }
    },
  });


  const [loginForm, setLoginForm] = useState({
    userId: '',
    password: '',
  });

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    signin(loginForm);
  };

  return {
    loginForm,
    isPending,
    setLoginForm,
    handleLogin,
  };
}; 