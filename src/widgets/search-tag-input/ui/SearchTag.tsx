interface SearchTagProps {
  search: string;
  onRemove: () => void;
}

export const SearchTag = ({ search, onRemove }: SearchTagProps) => {
  return (
    <div className="flex items-center gap-2 rounded-full border border-solid whitespace-nowrap border-gray-200 bg-gray-50 px-3 py-1">
      <span>{search}</span>
      <button onClick={onRemove} className="text-gray-400 hover:text-gray-600">
        ×
      </button>
    </div>
  );
};
