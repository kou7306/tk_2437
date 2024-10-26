// components/ActivityList.tsx

import React from "react";

// ActivityItem 型の定義
interface ActivityItem {
  id: number;
  date: string;
  description: string;
}

// モックデータの作成
const activityData: ActivityItem[] = [
  {
    id: 1,
    date: "2024-10-10",
    description: "ユーザーがプロフィールを更新しました",
  },
  { id: 2, date: "2024-10-12", description: "新しい投稿を作成しました" },
  { id: 3, date: "2024-10-14", description: "コメントを追加しました" },
  { id: 4, date: "2024-10-15", description: "別の投稿にいいねしました" },
];

// ActivityList コンポーネント
const ActivityList: React.FC = () => {
  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">アクティビティー</h2>
      <ul>
        {activityData.map((activity) => (
          <li
            key={activity.id}
            className="mb-4 p-4 border border-gray-200 rounded-lg"
          >
            <p className="text-gray-600 text-sm">{activity.date}</p>
            <p className="text-lg">{activity.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityList;
