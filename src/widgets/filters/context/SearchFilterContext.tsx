import { ChildrenProps } from "@/shared/types/props";
import { createContext, useContext, useState } from "react";
import { DateRange } from "react-day-picker";

type States = {
  searchText: string;
  dateRange: DateRange;
  isPending: boolean;
  excludedTags: string[];
  setExcludedTags: (value: string[]) => void;
  setDateRange: (value: DateRange) => void;
  setSearchText: (value: string) => void;
  setIsPending: (value: boolean) => void;
};

const SearchFilterContext = createContext<States>({
  searchText: "",
  dateRange: {
    from: new Date(),
    to: new Date(),
  },
  isPending: false,
  excludedTags: [],
  setExcludedTags: () => {},
  setDateRange: () => {},
  setSearchText: () => {},
  setIsPending: () => {},
});

export function SearchFilterProvider({ children }: ChildrenProps) {
  const [searchText, setSearchText] = useState("");
  const [dateRange, setDateRange] = useState<DateRange>({
    from: new Date(),
    to: new Date(),
  });
  const [isPending, setIsPending] = useState(false);
  const [tags, setTags] = useState<string[]>([]);

  return (
    <SearchFilterContext.Provider
      value={{
        searchText,
        dateRange,
        excludedTags: tags,
        isPending,
        setSearchText,
        setIsPending,
        setExcludedTags: setTags,
        setDateRange,
      }}
    >
      {children}
    </SearchFilterContext.Provider>
  );
}

export function useSearchFilter() {
  const context = useContext(SearchFilterContext);

  return context;
}
