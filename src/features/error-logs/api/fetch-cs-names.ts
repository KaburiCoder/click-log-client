import { axiosClient } from "@/shared/api";
import { CsNamesDto } from "../models/types";
import { Env } from "@/shared/env";

export async function fetchCsNames(): Promise<CsNamesDto> {
  const response = await axiosClient.get("/cpm/cs/names", {
    headers: {
      [Env.HEADER_KEY]: Env.HEADER_VALUE,
    },
  });
  return response.data;
}
