// components/EventImageCard.tsx
import React, { useEffect, useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Chip,
  Box,
} from "@mui/material";
import { Event } from "@/types/Event";
import axios from "axios";

const EventCard: React.FC<Event> = ({
  name,
  detail,
  place,
  period,
  tags,
  url,
}) => {
  const [imageSrc, setImageSrc] = useState("https://placehold.jp/150x150.png");

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const response = await axios.get(
          `/api/metadata?url=${encodeURIComponent(url)}`
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
    };

    if (url) {
      fetchMetadata();
    }
  }, [url]);

  return (
    <Card sx={{ mt: 2 }}>
      {/* イベント画像の表示 */}
      <CardMedia
        component="img"
        sx={{ height: 200, objectFit: "cover" }}
        image={imageSrc}
        alt="Event Image"
      />
      <CardContent>
        {/* イベント名の表示 */}
        <Typography variant="h6" component="div">
          {name || "No title available"}
        </Typography>
        {/* 詳細の表示 */}
        <Typography variant="body2" color="text.secondary">
          {detail || "No description available"}
        </Typography>
        {/* 場所の表示 */}
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {place || "No place available"}
        </Typography>
        {/* 期間の表示 */}
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {period ? `${period.start} ～ ${period.end}` : "No period available"}
        </Typography>

        {/* タグの表示 */}
        <Box sx={{ mt: 1 }}>
          {tags.length > 0 ? (
            tags.map((tag, index) => (
              <Chip key={index} label={tag} sx={{ mr: 1 }} />
            ))
          ) : (
            <Typography variant="body2" color="text.secondary">
              No tags available
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default EventCard;
