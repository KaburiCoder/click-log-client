import { useMutation } from "@tanstack/react-query";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { fetchErrorLogs } from "../api/fetch-error-logs";
import { useCsNames } from "../hooks/use-cs-names";
import { useErrorLogsColumns } from "../hooks/use-error-logs-columns";
import { ErrorLog } from "../models/types";
import { ErrorLogDetailModal } from "./ErrorLogDetailModal";
import { ErrorLogsFilter } from "./ErrorLogsFilter";
import { ErrorLogsPagination } from "./ErrorLogsPagination";
import { ErrorLogsTable } from "./ErrorLogsTable";
import { format } from "date-fns";
import { Loading } from "@/widgets/loading";

export const ErrorLogsBody = () => {
  const [selectedLog, setSelectedLog] = useState<ErrorLog | null>(null);
  const [searchText, setSearchText] = useState("");
  const [pageSize, setPageSize] = useState(20);
  const [pageIndex, setPageIndex] = useState(0);
  const [dateRange, setDateRange] = useState<DateRange>({
    from: new Date(new Date().setHours(0, 0, 0)),
    to: new Date(new Date().setHours(23, 59, 59)),
  });
  const { csNameMap } = useCsNames();
  const { columns } = useErrorLogsColumns(csNameMap);

  const { data, mutate, isPending } = useMutation({
    mutationFn: () =>
      fetchErrorLogs({
        startDate: dateRange.from?.toISOString() || "",
        endDate: dateRange.to?.toISOString() || "",
      }),
  });

  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      globalFilter: searchText,
      pagination: {
        pageSize,
        pageIndex,
      },
    },
    globalFilterFn: (row, columnId, filterValue) => {
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
    },
    onPaginationChange: (updater) => {
      if (typeof updater === "function") {
        const newState = updater({ pageIndex, pageSize });
        setPageIndex(newState.pageIndex);
        setPageSize(newState.pageSize);
      }
    },
  });

  return (
    <div className="flex flex-col gap-2">
      {isPending && <Loading />}
      <ErrorLogsFilter
        searchText={searchText}
        onSearchChange={setSearchText}
        onDateChange={setDateRange}
        isPending={isPending}
        onSearch={() => {
          mutate();
        }}
      />
      <ErrorLogsTable table={table} onRowClick={setSelectedLog} />

      {selectedLog && (
        <ErrorLogDetailModal
          csNameMap={csNameMap}
          log={selectedLog}
          onClose={() => setSelectedLog(null)}
        />
      )}

      <ErrorLogsPagination
        table={table}
        pageSize={pageSize}
        setPageSize={setPageSize}
        pageIndex={pageIndex}
        setPageIndex={setPageIndex}
      />
    </div>
  );
};
