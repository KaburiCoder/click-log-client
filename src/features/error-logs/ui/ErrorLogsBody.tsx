import { Loading } from "@/widgets/loading";
import { useMutation } from "@tanstack/react-query";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { format } from "date-fns";
import { useMemo, useState } from "react";
import { DateRange } from "react-day-picker";
import { fetchErrorLogsByDate } from "../api/fetch-error-logs";
import { useCsNames } from "../hooks/use-cs-names";
import { useErrorLogsColumns } from "../hooks/use-error-logs-columns";
import { ErrorLog } from "../models/types";
import { ErrorLogDetailModal } from "./ErrorLogDetailModal";
import { ErrorLogsFilter } from "./ErrorLogsFilter";
import { ErrorLogsPagination } from "./ErrorLogsPagination";
import { ErrorLogsTable } from "./ErrorLogsTable";

export const ErrorLogsBody = () => {
  const [selectedLog, setSelectedLog] = useState<ErrorLog | null>(null);
  const [searchText, setSearchText] = useState("");
  const [pageSize, setPageSize] = useState(20);
  const [pageIndex, setPageIndex] = useState(0);
  const [dateRange, setDateRange] = useState<DateRange>({
    from: new Date(),
    to: new Date(),
  });
  const { csNameMap } = useCsNames();
  const { columns } = useErrorLogsColumns(csNameMap);
  const [tags, setTags] = useState<string[]>([]);

  const { data, mutate, isPending } = useMutation({
    mutationFn: () => {
      const startDate = dateRange.from?.setHours(0, 0, 0);
      const endDate = dateRange.to?.setHours(23, 59, 59);
      return fetchErrorLogsByDate({
        startDate: startDate ? new Date(startDate).toISOString() : "",
        endDate: endDate ? new Date(endDate).toISOString() : "",
      });
    },
  });

  const filteredData = useMemo(() => {
    return (
      data?.filter(
        (log) =>
          !tags.some((tag) =>
            log.errorMessage.toLowerCase().includes(tag.toLowerCase()),
          ),
      ) ?? []
    );
  }, [data, tags]);

  const table = useReactTable({
    data: filteredData,
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
        tags={tags}
        onTagChange={setTags}
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
