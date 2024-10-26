// components/RecruitmentCard.tsx
import React from "react";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";

interface RecruitmentCardProps {
  name: string; // イベント名
  detail: string; // 募集内容
  title: string; // タイトル
  date: string; // 募集日
  sum: number; // 募集人数
  participants: number; // 参加者数
}

const RecruitmentCard: React.FC<RecruitmentCardProps> = ({
  title,
  name,
  detail,
  date,
  sum,
  participants,
}) => (
  <Card sx={{ mt: 2 }}>
    <CardMedia
      component="img"
      sx={{ height: 200, objectFit: "cover" }} // 高さを300pxに固定し、coverでリサイズ
      image="https://placehold.jp/150x150.png"
      alt="Recruitment Image"
    />
    <CardContent>
      <Typography variant="h6" component="div">
        {title || "No title available"} {/* 募集タイトル */}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {detail || "No description available"} {/* 募集内容 */}
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

export default RecruitmentCard;
