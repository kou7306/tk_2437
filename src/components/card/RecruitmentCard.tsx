import React, { useEffect, useState } from "react";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import { Recruitment } from "@/types/Recruitment";
import axios from "axios";

const RecruitmentCard: React.FC<Recruitment> = ({
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
        // エラーが発生した場合、デフォルト画像を使用
        setImageSrc("https://placehold.jp/150x150.png");
      }
    };

    if (event_url) {
      fetchMetadata();
    }
  }, [event_url]);

  return (
    <Card sx={{ mt: 2 }}>
      <CardMedia
        component="img"
        sx={{ height: 200, objectFit: "cover" }} // 高さを300pxに固定し、coverでリサイズ
        image={imageSrc}
        alt="Recruitment Image"
      />
      <CardContent>
        <Typography variant="h6" component="div">
          {title || "No title available"} {/* 募集タイトル */}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {`Company: ${name}`} {/* 会社名 */}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {`Date: ${date}`} {/* 募集日 */}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {`Participants: ${participants} / ${sum}`} {/* 参加者数と募集人数 */}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default RecruitmentCard;
