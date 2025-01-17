import { axiosClient } from "@/shared/api";
import { SlowQuery } from "../models/slow-query";
import { apiPaths } from "@/shared/paths";

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
