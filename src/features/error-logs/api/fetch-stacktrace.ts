import { axiosClient } from "@/shared/api";
import { Env } from "@/shared/env";
import { apiPaths } from "@/shared/paths";

interface StacktraceResponse {
  stackTrace: string | undefined;
}

export const fetchStacktrace = async (id: string): Promise<StacktraceResponse> => {
  const response = await axiosClient.get(apiPaths.click.stacktrace(id), {
    headers: {
      [Env.HEADER_KEY]: Env.HEADER_VALUE,
    },
  });
  return response.data;
};
