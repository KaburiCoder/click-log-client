import { useCsNames } from "@/features/_common";
import { SearchFilter, useSearchFilter } from "@/widgets/filters";
import BodyWrapper from "@/widgets/wappers/BodyWrapper";
import { useSlowQueryColumns } from "../hooks/use-slow-query-columns";
import {
  CommonTable,
  tableFilterFn,
  TablePagination,
  useReactTableEx,
} from "@/widgets/table-pagination";
import useFetchSlowQueries from "../hooks/use-fetch-slow-queries";
import { Loading } from "@/widgets/loading";

const SlowQueriesBody = () => {
  const { csNameMap } = useCsNames();
  const { columns, sorting, setSorting } = useSlowQueryColumns(csNameMap);
  //   const { dateRange, excludedTags } = useSearchFilter();
  const { data, isPending, mutate } = useFetchSlowQueries();
  const table = useReactTableEx({
    data: data ?? [],
    columns,
    globalFilterFn: tableFilterFn.bind(null, csNameMap),
    sorting,
    onSortingChange: setSorting,
  });

  return (
    <BodyWrapper>
      {isPending && (
        <Loading>
          <div>슬로우 쿼리를 조회 중입니다.</div>
        </Loading>
      )}
      <SearchFilter onSearch={mutate} />
      <CommonTable table={table} onRowClick={() => {}} />
      <TablePagination table={table} />
    </BodyWrapper>
  );
};

export default SlowQueriesBody;
