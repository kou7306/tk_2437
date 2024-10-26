import React, { useState } from "react";
import { User } from "@/types/User";
import { updateUser } from "@/utils/updateUser";

// ActivityList コンポーネント
interface ActivityListProps {
  user: User;
}

const ActivityList: React.FC<ActivityListProps> = ({ user }) => {
  const [events, setEvents] = useState(user.events || []);
  const [newEvent, setNewEvent] = useState({ date: "", description: "" });

  // イベントを日付でソート
  const sortedEvents = events.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  // 新しいイベントを追加
  const handleAddEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newEvent.date && newEvent.description) {
      const updatedEvents = [...events, newEvent];
      setEvents(updatedEvents);
      setNewEvent({ date: "", description: "" }); // フォームをリセット

      // ユーザーデータを更新
      try {
        const response = await updateUser({ ...user, events: updatedEvents });
        console.log(response);
        console.log("ユーザーが更新されました");
      } catch (error) {
        console.error("ユーザーの更新に失敗しました:", error);
      }
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">アクティビティー</h2>

      <form onSubmit={handleAddEvent} className="mb-4">
        <input
          type="date"
          value={newEvent.date}
          onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
          className="border border-gray-300 p-2 rounded mr-2"
          required
        />
        <input
          type="text"
          value={newEvent.description}
          onChange={(e) =>
            setNewEvent({ ...newEvent, description: e.target.value })
          }
          placeholder="イベントの説明"
          className="border border-gray-300 p-2 rounded mr-2"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          イベントを追加
        </button>
      </form>

      <p className="text-gray-600 mb-4">
        合計イベント数: {sortedEvents.length}
      </p>

      <ul>
        {sortedEvents.map((event, index) => (
          <li
            key={index}
            className="mb-4 p-4 border border-gray-200 rounded-lg"
          >
            <p className="text-gray-600 text-sm">{event.date}</p>
            <p className="text-lg">{event.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityList;
