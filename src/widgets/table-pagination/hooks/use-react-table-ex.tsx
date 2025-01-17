import {
  ColumnDef,
  FilterFnOption,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  OnChangeFn,
  PaginationState,
  useReactTable,
} from "@tanstack/react-table";
import { useTablePagination } from "../context/TablePaginationContext";
import { useSearchFilter } from "@/widgets/filters";

interface Props<T> {
  data: T[];
  columns: ColumnDef<T, any>[];
  globalFilterFn?: FilterFnOption<T> | undefined;
  onPaginationChange?: OnChangeFn<PaginationState> | undefined;
}

export function useReactTableEx<T>({
  data,
  columns,
  globalFilterFn,
  onPaginationChange,
}: Props<T>) {
  const { searchText } = useSearchFilter();
  const { pageSize, pageIndex } = useTablePagination();
  const table = useReactTable({
    data,
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
    globalFilterFn,
    onPaginationChange,
  });

  return table;
}
