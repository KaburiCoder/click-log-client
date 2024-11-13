import { axiosClient } from "@/shared/api";
import { apiPaths } from "@/shared/paths";

interface AuthCheckResponse {
  isAuthenticated: boolean;
}

export const authCheck = async (): Promise<AuthCheckResponse> => {
  const response = await axiosClient.post(apiPaths.auth.check);
  return response.data;
};
