import { LoginForm } from '@/features/auth/ui/login-form';

export const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
        <div>
          <h2 className="text-center text-3xl font-bold text-gray-900">로그인</h2>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}; 