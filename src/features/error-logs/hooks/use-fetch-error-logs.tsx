import { useSearchFilter } from "@/widgets/filters";
import { useMutation } from "@tanstack/react-query";
import { useMemo } from "react";
import { fetchErrorLogsByDate } from "../api/fetch-error-logs";

const useFetchErrorLogs = () => {
  const { dateRange, excludedTags } = useSearchFilter();
  const { data, mutate, isPending } = useMutation({
    mutationFn: () => {
      const startDate = dateRange.from?.setHours(0, 0, 0);
      const endDate = dateRange.to?.setHours(23, 59, 59);
      return fetchErrorLogsByDate({
        startDate: startDate ? new Date(startDate).toISOString() : "",
        endDate: endDate ? new Date(endDate).toISOString() : "",
      });
    },
  });

  // 검색 제외 키워드 적용하여 새로운 데이터 생성
  const filteredData = useMemo(() => {
    return (
      data?.filter(
        (log) =>
          !excludedTags.some((tag) =>
            log.errorMessage.toLowerCase().includes(tag.toLowerCase()),
          ),
      ) ?? []
    );
  }, [data, excludedTags]);

  return { data: filteredData, mutate, isPending };
};

export default useFetchErrorLogs;
