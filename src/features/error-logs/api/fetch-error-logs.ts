import { axiosClient } from "@/shared/api";
import { ErrorLog } from "../models/types";
import { Env } from "@/shared/env";

interface FetchErrorLogsParams {
  startDate: string;
  endDate: string;
}

export const fetchErrorLogs = async ({
  startDate,
  endDate,
}: FetchErrorLogsParams): Promise<ErrorLog[]> => {
  const response = await axiosClient.get("/click/error-log", {
    params: {
      startDate,
      endDate,
    },
    headers: {
      [Env.HEADER_KEY]: Env.HEADER_VALUE,
    },
  });
  return response.data;
};
