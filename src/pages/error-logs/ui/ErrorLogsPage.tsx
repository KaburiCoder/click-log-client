import { ErrorLogsBody } from "@/features/error-logs";
import { SearchFilterProvider } from "@/widgets/filters";
import { PageLayout } from "@/widgets/page-layout";

export const ErrorLogsPage = () => {
  return (
    <PageLayout title="에러 로그">
      <SearchFilterProvider>
        <ErrorLogsBody />
      </SearchFilterProvider>
    </PageLayout>
  );
};
