import { DatePickerRange } from "@/widgets/date-range-picker";
import { SearchTagInput } from "@/widgets/search-tag-input";
import { Button } from "@/widgets/ui/button";
import { Input } from "@/widgets/ui/input";
import { DateRange } from "react-day-picker";

interface ErrorLogsFilterProps {
  searchText: string;
  onSearchChange: (value: string) => void;
  onDateChange: (value: DateRange) => void;
  onSearch: () => void;
  isPending: boolean;
  tags: string[];
  onTagChange: (value: string[]) => void;
}

export const ErrorLogsFilter = ({
  searchText,
  onSearchChange,
  onDateChange,
  onSearch,
  isPending,
  tags,
  onTagChange,
}: ErrorLogsFilterProps) => {
  return (
    <div className="flex items-center gap-4">
      <DatePickerRange
        className="flex-shrink-0"
        onChange={(value) => onDateChange(value!)}
      />
      <Input
        placeholder="검색어를 입력하세요"
        value={searchText}
        onChange={(e) => onSearchChange(e.target.value)}
        className="max-w-sm"
      />
      <Button onClick={onSearch} disabled={isPending}>
        조회
      </Button>
      <SearchTagInput
        tags={tags}
        onTagChange={onTagChange}
        placeholder="제외 키워드를 입력하세요."
      />
    </div>
  );
};
