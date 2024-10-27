"use client";
import React, { useState, useEffect } from "react";
import EventList from "@/components/event/EventList";
import FilterModal from "@/components/modal/FilterModal"; // フィルターモーダルをインポート
import { Box, Typography, Button } from "@mui/material";
import { Event } from "@/types/Event";
import { getNewEvents, getFilterEvent } from "@/utils/getFilterEvent";

const HomePage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setModalOpen] = useState(false); // モーダルの状態
  const [selectedLocation, setSelectedLocation] = useState(""); // 選択した場所
  const [selectedTags, setSelectedTags] = useState<string[]>([]); // 選択したタグ

  // 初期イベントの取得
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsLoading(true);
        const newEvents = await getNewEvents("9"); // 必要に応じてIDを変更
        setEvents(newEvents);
        setError(null);
      } catch (err) {
        setError("イベントの取得に失敗しました");
        console.error("Error fetching events:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // 検索を実行する関数
  const handleSearch = async (location: string, tags: string[]) => {
    setSelectedLocation(location);
    setSelectedTags(tags);

    try {
      const fetchedEvents = await getFilterEvent(location, tags);
      setEvents(fetchedEvents); // フィルタリングされたイベントをセット
      console.log("取得したイベント:", fetchedEvents);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  return (
    <Box sx={{ maxWidth: 1200, margin: "auto", mt: 5 }}>
      <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
        新規募集
      </Typography>

      {/* フィルターボタン */}
      <Button variant="contained" onClick={() => setModalOpen(true)}>
        絞り込み
      </Button>

      {/* フィルターモーダル */}
      <FilterModal
        isOpen={isModalOpen}
        onRequestClose={() => setModalOpen(false)}
        onSearch={handleSearch}
      />

      {isLoading ? (
        <Typography>読み込み中...</Typography>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <EventList events={events} /> // 取得したイベントを表示
      )}
    </Box>
  );
};

export default HomePage;
