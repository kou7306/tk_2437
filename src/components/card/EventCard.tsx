// components/EventImageCard.tsx
import React from "react";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";

interface EventCardProps {
  name: string; // イベント名
  detail: string; // 詳細
  image: string; // 画像のURL
}

const EventCard: React.FC<EventCardProps> = ({ name, detail, image }) => (
  <Card sx={{ mt: 2 }}>
    {image && (
      <CardMedia
        component="img"
        sx={{ height: 200, objectFit: "cover" }} // 高さを150pxに固定し、coverでリサイズ
        image={image}
        alt="Event Image"
      />
    )}
    <CardContent>
      <Typography variant="h6" component="div">
        {name || "No title available"} {/* イベント名 */}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {detail || "No description available"} {/* 詳細 */}
      </Typography>
    </CardContent>
  </Card>
);

export default EventCard;
