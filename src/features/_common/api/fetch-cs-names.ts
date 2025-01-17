import { axiosClient } from "@/shared/api";
import { Env } from "@/shared/env";
import { CsNamesDto } from "../models/cs-names";

export async function fetchCsNames(): Promise<CsNamesDto> {
  const response = await axiosClient.get("/cpm/cs/names", {
    headers: {
      [Env.HEADER_KEY]: Env.HEADER_VALUE,
    },
  });
  return response.data;
}
