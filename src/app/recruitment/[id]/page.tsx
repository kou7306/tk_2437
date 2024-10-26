"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Recruitment } from "@/types/Recruitment"; // Recruitment型のインポート
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  Button,
  Divider,
} from "@mui/material";
import { getRecruitment } from "@/utils/getRecruitment";
import axios from "axios";

// リクルートメント詳細コンポーネント
const RecruitmentDetail: React.FC = () => {
  const params = useParams();
  const id = params.id;
  const [recruitment, setRecruitment] = useState<Recruitment | null>(null);
  const [imageSrc, setImageSrc] = useState("https://placehold.jp/150x150.png");
  const [loading, setLoading] = useState(true);

  // Fetch recruitment data on component mount
  useEffect(() => {
    const fetchRecruitment = async () => {
      if (id) {
        try {
          const recruitmentData = await getRecruitment(id as string);
          setRecruitment(recruitmentData);
        } catch (error) {
          console.error("リクルートメントデータの取得に失敗しました:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchRecruitment();
  }, [id]);

  // Fetch metadata for the image once the recruitment data is available
  useEffect(() => {
    const fetchMetadata = async () => {
      if (recruitment && recruitment.event_url) {
        try {
          const response = await axios.get(
            `/api/metadata?url=${encodeURIComponent(recruitment.event_url)}`
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
  }, [recruitment]); // Dependency on recruitment

  if (loading) {
    return <div>読み込み中...</div>; // ローディング状態の表示
  }

  if (!recruitment) {
    return <div>リクルートメントが見つかりません。</div>; // データがない場合の表示
  }

  // 日付をDateオブジェクトに変換
  const formattedDate = recruitment.date
    ? new Date(recruitment.date).toLocaleDateString("ja-JP")
    : "不明"; // dateが存在しない場合は"不明"を返す

  return (
    <Card sx={{ mt: 2, p: 2, maxWidth: 800, mx: "auto" }}>
      <CardContent>
        {/* 画像の表示 */}
        <Box sx={{ mb: 2, textAlign: "center" }}>
          <img
            src={imageSrc}
            alt="Recruitment"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </Box>

        <Typography variant="h5" component="div" gutterBottom>
          {recruitment.title || "タイトルがありません"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {`名前: ${recruitment.name || "不明"}`}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {`合計: ${recruitment.sum ? recruitment.sum.toString() : "不明"}`}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {`日付: ${formattedDate}`} {/* 日付を表示 */}
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant="body1" sx={{ mt: 2 }}>
          {recruitment.detail || "詳細がありません"}
        </Typography>

        {/* タグの表示 */}
        <Box sx={{ mt: 2 }}>
          {recruitment.tags && recruitment.tags.length > 0 ? (
            recruitment.tags.map((tag, index) => (
              <Chip key={index} label={tag} sx={{ mr: 1 }} />
            ))
          ) : (
            <Typography variant="body2" color="text.secondary">
              タグがありません
            </Typography>
          )}
        </Box>

        {/* ボタンの追加 */}
        <Box sx={{ mt: 3 }}>
          <Button variant="contained" color="primary">
            応募する
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default RecruitmentDetail;
