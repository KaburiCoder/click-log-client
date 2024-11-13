import { useAuth } from '../model/use-auth';

export const LoginForm = () => {
  const { loginForm, setLoginForm, handleLogin } = useAuth();

  return (
    <form className="mt-8 space-y-6" onSubmit={handleLogin}>
      <div className="rounded-md shadow-sm space-y-4">
        <div>
          <input
            type="text"
            required
            className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="아이디"
            value={loginForm.username}
            onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
          />
        </div>
        <div>
          <input
            type="password"
            required
            className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="비밀번호"
            value={loginForm.password}
            onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
          />
        </div>
      </div>
      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        로그인
      </button>
    </form>
  );
}; 