import { axiosClient } from "@/shared/api";
import { apiPaths } from "@/shared/paths";
import { loopDays } from "@/shared/utilities";
import { compareDesc } from "date-fns";
import { ErrorLog } from "../models/types";

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

  for (const currentDate of loopDays(start, end)) {
    const nextDate = new Date(currentDate);
    currentDate.setHours(0, 0, 0);
    nextDate.setHours(23, 59, 59);

    const dailyLogs = await fetchErrorLogs({
      startDate: currentDate.toISOString(),
      endDate: nextDate > end ? endDate : nextDate.toISOString(),
    });

    logs.push(...dailyLogs);
  }
  logs.sort((a, b) => compareDesc(a.createdAt, b.createdAt));
  return logs;
};
