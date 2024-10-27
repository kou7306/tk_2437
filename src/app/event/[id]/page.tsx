"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Event } from "@/types/Event"; // Event型のインポート
import { getEvent } from "@/utils/getEvent"; // getEvent関数のインポート
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  CircularProgress,
} from "@mui/material";
import axios from "axios"; // axiosのインポート

const EventDetail: React.FC = () => {
  const params = useParams();
  const id = params.id;
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imageSrc, setImageSrc] = useState("https://placehold.jp/150x150.png");

  useEffect(() => {
    const fetchEvent = async () => {
      if (id) {
        try {
          const eventData = await getEvent(id as string);
          setEvent(eventData);
        } catch (error) {
          console.error("イベントデータの取得に失敗しました:", error);
          setError("イベントデータの取得に失敗しました");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchEvent();
  }, [id]);

  useEffect(() => {
    const fetchMetadata = async () => {
      if (event?.url) {
        try {
          const response = await axios.get(
            `/api/metadata?url=${encodeURIComponent(event.url)}`
          );
          const { image } = response.data;
          if (image) {
            setImageSrc(image);
          }
        } catch (error) {
          console.error("Error fetching metadata:", error);
          setImageSrc("https://placehold.jp/150x150.png");
        }
      }
    };

    fetchMetadata();
  }, [event]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!event) {
    return <Typography>イベントが見つかりませんでした。</Typography>;
  }

  return (
    <Card sx={{ mt: 2, boxShadow: "none" }}>
      {" "}
      {/* Set boxShadow to none */}
      <CardContent>
        {/* 画像の表示 */}
        <Box sx={{ mb: 2, display: "flex", justifyContent: "center" }}>
          <img
            src={imageSrc}
            alt={event.name || "イベント画像"}
            style={{
              width: "90%", // Set the width to a percentage of the container
              maxWidth: "600px", // Limit the maximum width to 600px
              height: "auto",
              aspectRatio: "16 / 9", // Maintain 16:9 aspect ratio
              borderRadius: "8px", // Optional: Add some rounding to the corners
            }}
          />
        </Box>

        {/* Center-aligning and enlarging text */}
        <Typography variant="h4" component="div" align="center">
          {event.name || "タイトルがありません"}
        </Typography>
        <Typography variant="h6" color="text.secondary" align="center">
          {`会社名: ${event.company || "不明"}`}
        </Typography>
        <Typography variant="h6" color="text.secondary" align="center">
          {`開催地: ${event.place || "不明"}`}
        </Typography>
        <Typography variant="h6" color="text.secondary" align="center">
          {event.period
            ? `${event.period.start} ～ ${event.period.end}`
            : "期間がありません"}
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }} align="center">
          {event.detail || "詳細がありません"}
        </Typography>

        {/* タグの表示 */}
        <Box
          sx={{
            mt: 2,
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {event.tags && event.tags.length > 0 ? (
            event.tags.map((tag, index) => (
              <Chip key={index} label={tag} sx={{ mr: 1, mb: 1 }} /> // Add margin-bottom for spacing
            ))
          ) : (
            <Typography variant="body2" color="text.secondary">
              タグがありません
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default EventDetail;
