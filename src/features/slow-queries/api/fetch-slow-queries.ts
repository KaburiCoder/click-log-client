import { axiosClient } from "@/shared/api";
import { SlowQuery } from "../models/slow-query";
import { apiPaths } from "@/shared/paths";
import { DateRange } from "react-day-picker";
import { compareDesc, format } from "date-fns";
import { loopDays } from "@/shared/utilities";

interface FetchSlowQueriesParams {
  ymd: string;
}

export const fetchSlowQueries = async ({
  ymd,
}: FetchSlowQueriesParams): Promise<SlowQuery[]> => {
  const response = await axiosClient.get(apiPaths.click.slowQuery, {
    params: { ymd },
  });

  return response.data;
};

export const fetchSlowQueriesByDate = async ({
  dateRange,
}: {
  dateRange: DateRange;
}): Promise<SlowQuery[]> => {
  const slowQueries: SlowQuery[] = [];
  for (const date of loopDays(dateRange.from!, dateRange.to!)) {
    const response = await axiosClient.get<SlowQuery[]>(
      apiPaths.click.slowQuery,
      {
        params: { ymd: format(date, "yyyyMMdd") },
      },
    );
    slowQueries.push(...response.data);
  }
  slowQueries.sort((a, b) => compareDesc(a.createdAt, b.createdAt));
  return slowQueries;
};
