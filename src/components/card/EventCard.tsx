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
import Link from "next/link"; // Import Link from Next.js

const EventCard: React.FC<Event> = ({
  id, // Make sure to include 'id' in the props
  name,
  detail,
  place,
  period,
  tags,
  url,
  company,
}) => {
  const [imageSrc, setImageSrc] = useState("https://placehold.jp/150x150.png");

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const response = await axios.get(
          `/api/metadata?url=${encodeURIComponent(url ?? "")}`
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
    <Link href={`/event/${id}`} passHref>
      <Card sx={{ mt: 2, cursor: "pointer" }}>
        {" "}
        {/* Add cursor pointer to indicate it's clickable */}
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
            {name || "タイトルがありません"}
          </Typography>
          {/* 会社名の表示 */}
          <Typography variant="body2" color="text.secondary">
            {`会社名: ${company || "不明"}`} {/* 会社名 */}
          </Typography>
          {/* 場所の表示 */}
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {`開催地: ${place || "不明"}`} {/* 場所 */}
          </Typography>
          {/* 期間の表示 */}
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {period ? `${period.start} ～ ${period.end}` : "期間がありません"}
          </Typography>

          {/* タグの表示 */}
          <Box sx={{ mt: 1 }}>
            {tags && tags.length > 0 ? ( // tagsが存在し、かつその長さが0より大きい場合
              tags.map((tag, index) => (
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
    </Link>
  );
};

export default EventCard;
