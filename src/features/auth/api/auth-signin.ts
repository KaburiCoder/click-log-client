import { axiosClient } from "@/shared/api";
import { apiPaths } from "@/shared/paths";

interface SigninParams {
  userId: string;
  password: string;
}

interface AuthSigninResponse {
  accessToken: string;
}

export const authSignin = async ({ userId, password }: SigninParams): Promise<AuthSigninResponse> => {
  const response = await axiosClient.post(apiPaths.auth.signin, { userId, password });
  return response.data;
};
