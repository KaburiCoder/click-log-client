import { ErrorLogsBody } from "@/features/error-logs";
import { PageLayout } from "@/widgets/page-layout/ui/PageLayout";

export const ErrorLogsPage = () => {
  return (
    <PageLayout title="에러 로그">
      <ErrorLogsBody />
    </PageLayout>
  );
};
