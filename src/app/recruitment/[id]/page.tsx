"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Recruitment } from "@/types/Recruitment";
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  Button,
  CircularProgress,
} from "@mui/material";
import { getRecruitment } from "@/utils/getRecruitment";
import axios from "axios";
import { joinRecruitment } from "@/utils/joinRecruitment";
import { getUuidFromCookie } from "@/actions/users";
import Link from "next/link";

const RecruitmentDetail: React.FC = () => {
  const params = useParams();
  const id = params.id;
  const [recruitment, setRecruitment] = useState<Recruitment | null>(null);
  const [imageSrc, setImageSrc] = useState("https://placehold.jp/150x150.png");
  const [loading, setLoading] = useState(true);
  const [uuid, setUuid] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const userId = await getUuidFromCookie();
      if (userId) {
        setUuid(userId);
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    const fetchRecruitment = async () => {
      if (id) {
        try {
          const recruitmentData = await getRecruitment(id as string);
          setRecruitment(recruitmentData);
        } catch (error) {
          console.error("リクルートメントデータの取得に失敗しました:", error);
          setError("リクルートメントデータの取得に失敗しました");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchRecruitment();
  }, [id]);

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
  }, [recruitment]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!recruitment) {
    return <Typography>リクルートメントが見つかりません。</Typography>;
  }

  const formattedDate = recruitment.date
    ? new Date(recruitment.date).toLocaleDateString("ja-JP")
    : "不明";

  const handleJoinClick = () => {
    if (uuid && recruitment?.id) {
      joinRecruitment(uuid, recruitment.id);
    } else {
      console.error(
        "UUIDまたはリクルートメントIDが存在しないため、応募できません"
      );
    }
  };

  return (
    <Card sx={{ mt: 2 }}>
      <CardContent>
        <Box sx={{ mb: 2, display: "flex", justifyContent: "center" }}>
          <img
            src={imageSrc}
            alt="Recruitment"
            style={{
              width: "90%",
              maxWidth: "600px",
              height: "auto",
              aspectRatio: "16 / 9",
              borderRadius: "8px",
            }}
          />
        </Box>

        <Typography variant="h4" component="div" align="center">
          {recruitment.title || "タイトルがありません"}
        </Typography>

        <Typography variant="h6" color="text.secondary" align="center">
          <Link
            href={`/my-page/${recruitment.owner_id}`}
            sx={{ textDecoration: "none", color: "inherit" }} // Using sx prop
          >
            {`募集者: ${recruitment.owner_name || "不明"}`}
          </Link>
        </Typography>

        <Typography variant="h6" color="text.secondary" align="center">
          {`名前: ${recruitment.name || "不明"}`}
        </Typography>

        <Typography variant="h6" color="text.secondary" align="center">
          {`合計: ${recruitment.sum ? recruitment.sum.toString() : "不明"}`}
        </Typography>

        <Typography variant="h6" color="text.secondary" align="center">
          {`日付: ${formattedDate}`}
        </Typography>

        <Typography variant="body1" sx={{ mt: 2 }} align="center">
          {recruitment.detail || "詳細がありません"}
        </Typography>

        <Box
          sx={{
            mt: 2,
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {recruitment.tags && recruitment.tags.length > 0 ? (
            recruitment.tags.map((tag, index) => (
              <Chip key={index} label={tag} sx={{ mr: 1, mb: 1 }} />
            ))
          ) : (
            <Typography variant="body2" color="text.secondary">
              タグがありません
            </Typography>
          )}
        </Box>

        <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
          <Button variant="contained" color="primary" onClick={handleJoinClick}>
            応募する
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default RecruitmentDetail;
