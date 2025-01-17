import { useCsNames } from "@/features/_common";
import { SearchFilter } from "@/widgets/filters";
import { Loading } from "@/widgets/loading";
import {
    CommonTable,
    tableFilterFn,
    TablePagination,
    useReactTableEx,
} from "@/widgets/table-pagination";
import BodyWrapper from "@/widgets/wappers/BodyWrapper";
import useFetchSlowQueries from "../hooks/use-fetch-slow-queries";
import { useSlowQueryColumns } from "../hooks/use-slow-query-columns";

const SlowQueriesBody = () => {
  const { csNameMap } = useCsNames();
  const { columns, sorting, setSorting } = useSlowQueryColumns(csNameMap);
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
