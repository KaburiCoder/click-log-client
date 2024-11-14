interface SearchInputProps {
  onAdd: (value: string) => void;
}

export const SearchInput = ({ onAdd, ...props }: SearchInputProps) => {
  return (
    <input
      type="text"
      className="bg-transparent w-full min-w-20"
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          const value = e.currentTarget.value;
          onAdd(value);
          e.currentTarget.value = "";
        }
      }}
      {...props}
    />
  );
};
