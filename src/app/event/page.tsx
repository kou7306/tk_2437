"use client";
import React, { useState, useEffect } from "react";
import EventList from "@/components/event/EventList";
import FilterModal from "@/components/modal/FilterModal"; // Import filter modal
import { Box, Typography, Button } from "@mui/material";
import { Event } from "@/types/Event";
import { getNewEvents, getFilterEvent } from "@/utils/getFilterEvent";
import Link from "next/link"; // Import Link for navigation

const HomePage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setModalOpen] = useState(false); // Modal state
  const [selectedLocation, setSelectedLocation] = useState(""); // Selected location
  const [selectedTags, setSelectedTags] = useState<string[]>([]); // Selected tags

  // Fetch initial events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsLoading(true);
        const newEvents = await getNewEvents("9"); // Adjust ID as needed
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

  // Execute search
  const handleSearch = async (location: string, tags: string[]) => {
    setSelectedLocation(location);
    setSelectedTags(tags);

    try {
      const fetchedEvents = await getFilterEvent(location, tags);
      setEvents(fetchedEvents); // Set filtered events
      console.log("取得したイベント:", fetchedEvents);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  return (
    <Box sx={{ maxWidth: 1200, margin: "auto", mt: 5 }}>
      {/* Flex container for header and buttons */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end", // Align to the right
          mb: 2,
          gap: 2, // Add some space between buttons
        }}
      >
        <Button variant="contained" onClick={() => setModalOpen(true)}>
          絞り込み
        </Button>
        <Link href="/create-event" passHref>
          <Button variant="contained">イベント作成</Button>
        </Link>
      </Box>

      {/* Filter modal */}
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
        <EventList events={events} /> // Display fetched events
      )}
    </Box>
  );
};

export default HomePage;
