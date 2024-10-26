import React, { useEffect, useState } from "react";
import { Card, CardMedia, CardContent, Typography, Box } from "@mui/material";
import { Recruitment } from "@/types/Recruitment";
import axios from "axios";
import Link from "next/link"; // Linkコンポーネントをインポート

const RecruitmentCard: React.FC<Recruitment> = ({
  id, // IDを受け取る
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
    <Link href={`/recruitment/${id}`} passHref>
      {" "}
      {/* リンクを追加 */}
      <Card sx={{ mt: 2, position: "relative", cursor: "pointer" }}>
        <CardMedia
          component="img"
          sx={{ height: 200, objectFit: "cover" }} // 高さを200pxに固定し、coverでリサイズ
          image={imageSrc}
          alt="Recruitment Image"
        />
        <CardContent>
          <Typography variant="h6" component="div">
            {title || "タイトルがありません"} {/* 募集タイトル */}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {`イベント名: ${name || "不明"}`} {/* イベント名 */}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {`日付: ${
              date ? new Date(date).toLocaleDateString("ja-JP") : "不明"
            }`}{" "}
            {/* 日付 */}
          </Typography>
          <Box
            sx={{
              position: "absolute",
              bottom: 16,
              right: 16,
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              borderRadius: 1,
              padding: "8px 12px",
              boxShadow: 1,
              zIndex: 1,
            }}
          >
            <Typography variant="body2" fontSize="1.2rem">
              {`${participants.length} / ${sum || 0}`}{" "}
              {/* 参加者数と募集人数 */}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Link>
  );
};

export default RecruitmentCard;
