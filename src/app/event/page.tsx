"use client";
import React, { useState, useEffect } from "react";
import EventList from "@/components/event/EventList";
import { Box, Typography } from "@mui/material";
import { Event } from "@/types/Event";
import { getNewEvents } from "@/utils/getFilterEvent";

const HomePage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsLoading(true);
        const newEvents = await getNewEvents("9");
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
  }, []); // 空の依存配列で、マウント時のみ実行

  return (
    <Box sx={{ maxWidth: 1200, margin: "auto", mt: 5 }}>
      <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
        新規募集
      </Typography>

      {isLoading ? (
        <Typography>読み込み中...</Typography>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <EventList events={events} />
      )}
    </Box>
  );
};

export default HomePage;
