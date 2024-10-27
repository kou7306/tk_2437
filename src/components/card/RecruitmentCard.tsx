import React, { useEffect, useState } from "react";
import { Card, CardMedia, CardContent, Typography, Box } from "@mui/material";
import { Recruitment } from "@/types/Recruitment";
import axios from "axios";
import Link from "next/link"; // Link component import

const RecruitmentCard: React.FC<Recruitment> = ({
  id, // Receive ID
  title,
  name,
  date,
  sum,
  participants,
  event_url,
}) => {
  const [imageSrc, setImageSrc] = useState("https://placehold.jp/150x150.png");

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        if (event_url) {
          const response = await axios.get(
            `/api/metadata?url=${encodeURIComponent(event_url)}`
          );
          const { image } = response.data;
          if (image) {
            setImageSrc(image);
          }
        }
      } catch (error) {
        console.error("Error fetching metadata:", error);
        // Use default image if an error occurs
        setImageSrc("https://placehold.jp/150x150.png");
      }
    };

    if (event_url) {
      fetchMetadata();
    }
  }, [event_url]);

  return (
    <Link href={`/recruitment/${id}`} passHref>
      <Card sx={{ mt: 2, position: "relative", cursor: "pointer" }}>
        <CardMedia
          component="img"
          sx={{
            width: "100%", // Set width to 100%
            height: "auto", // Set height to auto for responsiveness
            aspectRatio: "16 / 9", // Set aspect ratio (adjust as needed)
            objectFit: "cover", // Maintain aspect ratio and cover the container
          }}
          image={imageSrc}
          alt="Recruitment Image"
        />
        <CardContent sx={{ paddingBottom: "60px" }}>
          {" "}
          {/* Padding to avoid overlap */}
          <Typography variant="h6" component="div">
            {title || "タイトルがありません"} {/* Recruitment title */}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {`イベント名: ${name || "不明"}`} {/* Event name */}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {`日付: ${
              date ? new Date(date).toLocaleDateString("ja-JP") : "不明"
            }`}{" "}
            {/* Date */}
          </Typography>
        </CardContent>
        <Box
          sx={{
            position: "absolute",
            bottom: 16,
            right: 16,
            borderRadius: 1,
            padding: "8px 12px",
            zIndex: 1,
          }}
        >
          <Typography variant="body2" fontSize="1.2rem">
            {`${participants.length} / ${sum || 0}`}{" "}
            {/* Number of participants and total */}
          </Typography>
        </Box>
      </Card>
    </Link>
  );
};

export default RecruitmentCard;
