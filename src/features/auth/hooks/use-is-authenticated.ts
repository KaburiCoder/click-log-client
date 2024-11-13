import { useQuery } from "@tanstack/react-query";
import { authCheck } from "../api/auth-check";
import { STORAGE_KEYS } from "@/shared/constants/storage-keys";

export const useIsAuthenticated = () => {
  const accessToken = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  const { data, ...rest } = useQuery({
    queryKey: ["isAuthenticated", accessToken],
    queryFn: () => authCheck(),
    retry: false,
  });

  const isAuthenticated = data?.isAuthenticated ?? false;
  return { isAuthenticated, ...rest };
};
