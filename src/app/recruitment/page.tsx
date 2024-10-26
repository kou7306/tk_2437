"use client";
import React from "react";
import { useState, useEffect } from "react";
import RecruitmentList from "@/components/recruitment/RecruitmentList";
import { Typography, Box } from "@mui/material";
import { getNewRecruitments } from "@/utils/getFilterRecruitment";
import { Recruitment } from "@/types/Recruitment";

const RecruitmentPage: React.FC = () => {
  const [recruitments, setRecruitments] = useState<Recruitment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecruitments = async () => {
      try {
        setIsLoading(true);
        const newRecruitments = await getNewRecruitments("9");
        setRecruitments(newRecruitments);
        setError(null);
      } catch (err) {
        setError("イベントの取得に失敗しました");
        console.error("Error fetching recruitments:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecruitments();
  }, []); // 空の依存配列で、マウント時のみ実行
  return (
    <Box sx={{ maxWidth: 1200, margin: "auto", mt: 5 }}>
      {/* <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
        新規募集
      </Typography> */}

      <RecruitmentList recruitments={recruitments} />
    </Box>
  );
};

export default RecruitmentPage;
