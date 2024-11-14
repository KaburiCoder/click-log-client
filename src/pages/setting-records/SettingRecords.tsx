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

        <SearchTagInput tags={tags} onTagChange={setTags} placeholder="제외 키워드를 입력하세요." />
      </div>
    </div>
  );
};
