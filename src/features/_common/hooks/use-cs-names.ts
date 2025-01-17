import { useQuery } from "@tanstack/react-query";
import { apiPaths } from "@/shared/paths/paths";
import { fetchCsNames } from "..";

export const useCsNames = () => {
  const { data, ...props } = useQuery({
    queryKey: [apiPaths.cpm.csNames],
    queryFn: fetchCsNames,
  });
  const csNames = data?.data || [];
  const csNameMap = new Map(
    csNames.map((csName) => [csName.code, csName.myung]),
  );

  return { data, csNameMap, ...props };
};
