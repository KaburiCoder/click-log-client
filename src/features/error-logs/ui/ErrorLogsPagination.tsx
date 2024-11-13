import { Table } from "@tanstack/react-table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/widgets/ui/pagination";
import { cn } from "@/shared/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/widgets/ui/select";

interface ErrorLogsPaginationProps {
  table: Table<any>;
  pageSize: number;
  setPageSize: (size: number) => void;
  pageIndex: number;
  setPageIndex: (index: number) => void;
}

export const ErrorLogsPagination = ({
  table,
  pageSize,
  setPageSize,
  pageIndex,
  setPageIndex,
}: ErrorLogsPaginationProps) => {
  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex items-center gap-4">
        <div>
          <p className="whitespace-nowrap text-sm text-gray-700">
            총{" "}
            <span className="font-medium">
              {table.getFilteredRowModel().rows.length}
            </span>
            개 중{" "}
            <span className="font-medium">{pageIndex * pageSize + 1}</span>
            {" - "}
            <span className="font-medium">
              {Math.min(
                (pageIndex + 1) * pageSize,
                table.getFilteredRowModel().rows.length,
              )}
            </span>
            개 표시
          </p>
        </div>
        <div className="min-w-[5rem]">
          <Select
            value={pageSize.toString()}
            onValueChange={(value) => setPageSize(Number(value))}
          >
            <SelectTrigger>
              <SelectValue placeholder="페이지 크기" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="10">10개</SelectItem>
                <SelectItem value="20">20개</SelectItem>
                <SelectItem value="30">30개</SelectItem>
                <SelectItem value="50">50개</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() =>
                !table.getCanPreviousPage() ? undefined : table.previousPage()
              }
              className={cn(
                !table.getCanPreviousPage() && "pointer-events-none opacity-50",
              )}
            />
          </PaginationItem>
          {Array.from({ length: Math.min(5, table.getPageCount()) }, (_, i) => {
            const currentPage = table.getState().pagination.pageIndex;
            const totalPages = table.getPageCount();
            let pageIndex = i;

            if (totalPages <= 5) {
              pageIndex = i;
            } else if (currentPage < 3) {
              pageIndex = i;
            } else if (currentPage > totalPages - 3) {
              pageIndex = totalPages - 5 + i;
            } else {
              pageIndex = currentPage - 2 + i;
            }

            return (
              <PaginationItem key={pageIndex}>
                <PaginationLink
                  className={cn(
                    table.getState().pagination.pageIndex === pageIndex &&
                      "bg-blue-200 font-bold",
                  )}
                  onClick={() => setPageIndex(pageIndex)}
                >
                  {pageIndex + 1}
                </PaginationLink>
              </PaginationItem>
            );
          })}
          <PaginationItem>
            <PaginationNext
              onClick={() =>
                !table.getCanNextPage() ? undefined : table.nextPage()
              }
              className={cn(
                !table.getCanNextPage() && "pointer-events-none opacity-50",
              )}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};
