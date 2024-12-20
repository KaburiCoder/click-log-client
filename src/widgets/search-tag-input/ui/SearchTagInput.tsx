import { InputHTMLAttributes, useState } from "react";
import { SearchInput } from "./SearchInput";
import { SearchTag } from "./SearchTag";

interface SearchTagInputProps extends InputHTMLAttributes<HTMLInputElement> {
  tags: string[];
  onTagChange: (value: string[]) => void;
}

export const SearchTagInput = ({ tags, onTagChange, ...props }: SearchTagInputProps) => {
  const [searchs, setSearchs] = useState<string[]>(tags);

  const handleAddSearch = (value: string) => {
    const trimmedValue = value.trim();
    if (!trimmedValue) return;

    setSearchs((prev) => {
      if (prev.includes(trimmedValue)) return prev;
      const newSearchs = [...prev, trimmedValue];
      onTagChange(newSearchs);
      return newSearchs;
    });
  };

  const handleRemoveSearch = (index: number) => {
    const newSearchs = [...searchs];
    newSearchs.splice(index, 1);
    setSearchs(newSearchs);
    onTagChange(newSearchs);
  };

  return (
    <div className="flex min-h-[2.7rem] gap-2 overflow-x-auto rounded-lg border border-solid border-gray-200 bg-white p-2 py-1">
      {searchs.map((search, index) => (
        <SearchTag
          key={index}
          search={search}
          onRemove={() => handleRemoveSearch(index)}
        />
      ))}
      <SearchInput onAdd={handleAddSearch} className="placeholder:text-sm placeholder:text-muted-foreground" {...props} />
    </div>
  );
};
