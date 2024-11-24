import { axiosClient } from "@/shared/api";
import { ErrorLog } from "../models/types";
import { apiPaths } from "@/shared/paths";
import { compareDesc, format } from "date-fns";

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


export const fetchErrorLogsByDate = async ({
  startDate,
  endDate,
}: FetchErrorLogsParams): Promise<ErrorLog[]> => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const logs: ErrorLog[] = [];
  const currentDate = new Date(start);

  while (format(currentDate, 'yyyy-MM-dd') <= format(end, 'yyyy-MM-dd')) {
    const nextDate = new Date(currentDate);
    currentDate.setHours(0, 0, 0);
    nextDate.setHours(23, 59, 59);

    const dailyLogs = await fetchErrorLogs({
      startDate: currentDate.toISOString(),
      endDate: nextDate > end ? endDate : nextDate.toISOString()
    });

    logs.push(...dailyLogs);
    currentDate.setDate(currentDate.getDate() + 1);
  }
  logs.sort((a, b) => compareDesc(a.createdAt, b.createdAt));
  return logs;
};
