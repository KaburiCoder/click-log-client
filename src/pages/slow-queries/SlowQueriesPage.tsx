import SlowQueriesBody from "@/features/slow-queries/ui/SlowQueriesBody";
import { SearchFilterProvider } from "@/widgets/filters";
import { PageLayout } from "@/widgets/page-layout";
import { TablePaginationProvider } from "@/widgets/table-pagination";

export const SlowQueriesPage = () => {
  return (
    <PageLayout title="Slow Queries">
      <SearchFilterProvider>
        <TablePaginationProvider>
          <SlowQueriesBody />
        </TablePaginationProvider>
      </SearchFilterProvider>
    </PageLayout>
  );
};
