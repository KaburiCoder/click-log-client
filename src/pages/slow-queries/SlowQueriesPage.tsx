import SlowQueriesBody from "@/features/slow-queries/ui/SlowQueriesBody";
import { PageLayout } from "@/widgets/page-layout";

export const SlowQueriesPage = () => {
  return (
    <PageLayout title="Slow Queries">
      <SlowQueriesBody />
    </PageLayout>
  );
};
