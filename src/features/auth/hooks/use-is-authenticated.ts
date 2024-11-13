import { useQuery } from "@tanstack/react-query";
import { authCheck } from "../api/auth-check";

export const useIsAuthenticated = () => {
  const accessToken = localStorage.getItem('accessToken');
  const { data, ...rest } = useQuery({
    queryKey: ['isAuthenticated', accessToken],
    queryFn: () => authCheck(),
    retry: false,
  });

  const isAuthenticated = data?.isAuthenticated ?? false;
  return { isAuthenticated, ...rest };
};
