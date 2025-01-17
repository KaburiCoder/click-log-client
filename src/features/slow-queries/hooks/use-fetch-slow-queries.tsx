import { useSearchFilter } from "@/widgets/filters";
import { useMutation } from "@tanstack/react-query";
import { useMemo } from "react";
import { fetchSlowQueriesByDate } from "../api/fetch-slow-queries";

const useFetchSlowQueries = () => {
  const { dateRange, excludedTags } = useSearchFilter();
  const { data, mutate, isPending } = useMutation({
    mutationFn: () => {
      return fetchSlowQueriesByDate({ dateRange });
    },
  });

  // 검색 제외 키워드 적용하여 새로운 데이터 생성
  const filteredData = useMemo(() => {
    return (
      data?.filter(
        (log) =>
          !excludedTags.some((tag) =>
            log.queryString.toLowerCase().includes(tag.toLowerCase()),
          ),
      ) ?? []
    );
  }, [data, excludedTags]);

  return { data: filteredData, mutate, isPending };
};

export default useFetchSlowQueries;
