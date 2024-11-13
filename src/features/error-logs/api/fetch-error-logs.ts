import { axiosClient } from "@/shared/api";
import { ErrorLog } from "../models/types";

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
  });
  return response.data;
};
