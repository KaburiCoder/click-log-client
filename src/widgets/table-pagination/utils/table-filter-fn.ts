import { Row } from "@tanstack/react-table";
import { format } from "date-fns";

export const tableFilterFn = <T>(
  csNameMap: Map<string, string>,
  row: Row<T>,
  columnId: string,
  filterValue: string,
) => {
  const value = row.getValue(columnId);
  if (value === null || value === undefined) return false;

  let newValue: string;
  // 병원명과 발생시간 검색을 위한 특수 처리
  if (columnId === "ykiho") {
    newValue = `${csNameMap?.get(String(value)) || ""} (${value})`;
  } else if (columnId === "createdAt") {
    const date = value as Date;
    newValue = format(date, "yy-MM-dd HH:mm:ss");
  } else {
    newValue = String(value);
  }

  return newValue.toLowerCase().includes(String(filterValue).toLowerCase());
};
