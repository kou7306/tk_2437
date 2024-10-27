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
        // Ensure event.url is defined
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
          // エラーが発生した場合、デフォルト画像を使用
          setImageSrc("https://placehold.jp/150x150.png");
        }
      }
    };

    fetchMetadata();
  }, [event]); // Changed dependency to event

  if (loading) {
    return <CircularProgress />; // ローディング中のスピナー
  }

  if (error) {
    return <Typography color="error">{error}</Typography>; // エラーメッセージ
  }

  if (!event) {
    return <Typography>イベントが見つかりませんでした。</Typography>; // イベントが存在しない場合のメッセージ
  }

  return (
    <Card sx={{ mt: 2 }}>
      <CardContent>
        {/* 画像の表示 */}
        <Box sx={{ mb: 2, textAlign: "center" }}>
          <img
            src={imageSrc}
            alt={event.name || "イベント画像"}
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </Box>

        <Typography variant="h5" component="div">
          {event.name || "タイトルがありません"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {`会社名: ${event.company || "不明"}`}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {`開催地: ${event.place || "不明"}`}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {event.period
            ? `${event.period.start} ～ ${event.period.end}`
            : "期間がありません"}
        </Typography>
        <Typography variant="body2" sx={{ mt: 2 }}>
          {event.detail || "詳細がありません"}
        </Typography>

        {/* タグの表示 */}
        <Box sx={{ mt: 2 }}>
          {event.tags && event.tags.length > 0 ? (
            event.tags.map((tag, index) => (
              <Chip key={index} label={tag} sx={{ mr: 1 }} />
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
