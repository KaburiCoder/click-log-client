import { ErrorLogsBody } from "@/features/error-logs";
import { SearchFilterProvider } from "@/widgets/filters";
import { PageLayout } from "@/widgets/page-layout";
import { TablePaginationProvider } from "@/widgets/table-pagination";

export const ErrorLogsPage = () => {
  return (
    <PageLayout title="에러 로그">
      <SearchFilterProvider>
        <TablePaginationProvider>
          <ErrorLogsBody />
        </TablePaginationProvider>
      </SearchFilterProvider>
    </PageLayout>
  );
};
