"use client";
import React, { useState } from "react";
import FilterModal from "@/components/modal/FilterModal";
import { TagOption } from "@/components/tagOptions";
import { getFilterEvent } from "@/utils/getFileterEvent";

const Home = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedTags, setSelectedTags] = useState<TagOption[]>([]);
  const [events, setEvents] = useState([]); // フィルターされたイベントを管理

  const handleSearch = async (location: string, tags: TagOption[]) => {
    setSelectedLocation(location);
    setSelectedTags(tags);
    console.log("location:", location);
    console.log("tags:", tags);

    try {
      const fetchedEvents = await getFilterEvent(location, tags); // APIリクエストを送信
      setEvents(fetchedEvents); // 取得したイベントをセット
      console.log("取得したイベント:", fetchedEvents);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  return (
    <div>
      <h1>場所検索アプリ</h1>
      <button onClick={() => setModalOpen(true)}>場所を検索</button>
      <FilterModal
        isOpen={isModalOpen}
        onRequestClose={() => setModalOpen(false)}
        onSearch={handleSearch}
      />
      {selectedLocation && <p>選択された場所: {selectedLocation}</p>}
      {selectedTags.length > 0 && (
        <p>選択されたタグ: {selectedTags.join(", ")}</p>
      )}
      {events.length > 0 && (
        <div>
          <h2>取得したイベント:</h2>
          <ul>
            {events.map((event) => (
              <li key={event.id}>{event.name}</li> // イベントの名前を表示
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Home;
