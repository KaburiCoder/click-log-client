import { axiosClient } from "@/shared/api";
import { apiPaths } from "@/shared/paths";

interface StacktraceResponse {
  stackTrace: string | undefined;
}

export const fetchStacktrace = async (id: string): Promise<StacktraceResponse> => {
  const response = await axiosClient.get(apiPaths.click.stacktrace(id));
  return response.data;
};
