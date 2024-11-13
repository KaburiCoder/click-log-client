import { useAuth } from "../model/use-auth";

export const LoginForm = () => {
  const { loginForm, isPending, setLoginForm, handleLogin } = useAuth();

  return (
    <form
      className="mx-auto mt-8 max-w-md rounded-xl bg-white p-8 shadow-lg"
      onSubmit={handleLogin}
    >
      <h2 className="mb-8 text-center text-2xl font-bold text-gray-900">
        로그인
      </h2>
      <div className="space-y-6">
        <div>
          <label
            htmlFor="userId"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            아이디
          </label>
          <input
            id="userId"
            type="text"
            required
            className="block w-full rounded-lg border border-gray-300 px-4 py-3 placeholder-gray-400 shadow-sm transition duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
            placeholder="아이디를 입력하세요"
            value={loginForm.userId}
            onChange={(e) =>
              setLoginForm({ ...loginForm, userId: e.target.value })
            }
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            비밀번호
          </label>
          <input
            id="password"
            type="password"
            required
            className="block w-full rounded-lg border border-gray-300 px-4 py-3 placeholder-gray-400 shadow-sm transition duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
            placeholder="비밀번호를 입력하세요"
            value={loginForm.password}
            onChange={(e) =>
              setLoginForm({ ...loginForm, password: e.target.value })
            }
          />
        </div>
      </div>
      <button
        type="submit"
        disabled={isPending}
        className="mt-8 w-full transform rounded-lg bg-indigo-600 px-6 py-3 text-base font-medium text-white transition duration-200 hover:scale-[1.02] hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:scale-[0.98]"
      >
        로그인
      </button>
    </form>
  );
};
