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
  id,
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
        {/* Event image display with responsive height */}
        <CardMedia
          component="img"
          sx={{
            width: "100%",
            height: "auto", // Use auto height for responsiveness
            aspectRatio: "16 / 9", // Adjust the aspect ratio as needed
            objectFit: "cover",
          }}
          image={imageSrc}
          alt="Event Image"
        />
        <CardContent>
          <Typography variant="h6" component="div">
            {name || "タイトルがありません"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {`会社名: ${company || "不明"}`}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {`開催地: ${place || "不明"}`}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {period ? `${period.start} ～ ${period.end}` : "期間がありません"}
          </Typography>

          <Box sx={{ mt: 1 }}>
            {tags && tags.length > 0 ? (
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
