import { axiosClient } from "@/shared/api";
import { ErrorLog } from "../models/types";
import { apiPaths } from "@/shared/paths";

interface FetchErrorLogsParams {
  startDate: string;
  endDate: string;
}

export const fetchErrorLogs = async ({
  startDate,
  endDate,
}: FetchErrorLogsParams): Promise<ErrorLog[]> => {
  const response = await axiosClient.get(apiPaths.click.errorLog, {
    params: {
      startDate,
      endDate,
    },
  });
  return response.data;
};
