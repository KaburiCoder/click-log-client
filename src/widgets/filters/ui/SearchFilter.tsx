import { DatePickerRange } from "@/widgets/date-range-picker";
import { SearchTagInput } from "@/widgets/search-tag-input";
import { Button } from "@/widgets/ui/button";
import { Input } from "@/widgets/ui/input";
import { useSearchFilter } from "../context/SearchFilterContext";

interface SearchFilterProps {
  onSearch: () => void;
}

export const SearchFilter = ({ onSearch }: SearchFilterProps) => {
  const { searchText, isPending, tags, setDateRange, setSearchText, setTags } =
    useSearchFilter();

  return (
    <div className="flex items-center gap-4">
      <DatePickerRange
        className="flex-shrink-0"
        onChange={(value) => setDateRange(value!)}
      />
      <Input
        placeholder="검색어를 입력하세요"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="max-w-sm"
      />
      <Button onClick={onSearch} disabled={isPending}>
        조회
      </Button>
      <SearchTagInput
        tags={tags}
        onTagChange={setTags}
        placeholder="제외 키워드를 입력하세요."
      />
    </div>
  );
};
