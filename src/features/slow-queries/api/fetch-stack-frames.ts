import { axiosClient } from "@/shared/api";
import { apiPaths } from "@/shared/paths";
import { SlowQueryStackFrame } from "../models/slow-query-stack-frame";

export const fetchStackFrames = async ({
  id,
}: {
  id: number;
}): Promise<SlowQueryStackFrame[]> => {
  const response = await axiosClient.get<SlowQueryStackFrame[]>(
    apiPaths.click.slowQueryStackFrames(id),
  );

  return response.data;
};
