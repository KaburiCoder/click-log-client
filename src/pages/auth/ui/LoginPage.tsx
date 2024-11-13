import { LoginForm } from "@/features/auth/ui/login-form";
import { Env } from "@/shared/env";

export const LoginPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <LoginForm />
      {Env.HEADER_KEY}
      {Env.HEADER_VALUE}
    </div>
  );
};
