import { useState } from 'react';
import { PageTitle, PageBody } from '@/widgets/page-layout';

interface ListItem {
  id: number;
  title: string;
  description: string;
  date: string;
}

export const ListPage = () => {
  const [items] = useState<ListItem[]>([
    { id: 1, title: '항목 1', description: '설명 1', date: '2024-03-20' },
    { id: 2, title: '항목 2', description: '설명 2', date: '2024-03-21' },
    { id: 3, title: '항목 3', description: '설명 3', date: '2024-03-22' },
  ]);

  return (
    <div className="p-8">
      <PageTitle>목록 조회</PageTitle>
      <PageBody>
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                제목
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                설명
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                날짜
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {items.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap">{item.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.title}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.description}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </PageBody>
    </div>
  );
};