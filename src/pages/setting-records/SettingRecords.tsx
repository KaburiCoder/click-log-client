import { SearchTagInput } from "@/widgets/search-tag-input";
import { useState } from "react";

export const SettingRecords = () => {
  const [tags, setTags] = useState<string[]>([]);
  console.log(tags);
  return (
    <div>
      <div className="rounded-lg border border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">설정 이력</h1>
        </div>

        <div className="rounded-lg border border-solid border-gray-200 bg-white p-2 flex gap-2">
          {tags.map((tag) => {
            return (
              <div key={tag} className="border-solid flex items-center gap-2 rounded-full border border-gray-200 px-3 py-1">
                <span>{tag}</span>
                <button
                  onClick={() => {
                    setTags((prev) => prev.filter((t) => t !== tag));
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
            );
          })}
          <input
            type="text"
            className="w-full"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const value = (e.target as HTMLInputElement).value;
                setTags((prev) => [...prev, value]);
                (e.target as HTMLInputElement).value = "";
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};
