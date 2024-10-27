"use client";
import React, { useState, useEffect } from "react";
import RecruitmentList from "@/components/recruitment/RecruitmentList";
import { Typography, Box, Button } from "@mui/material";
import { getNewRecruitments } from "@/utils/getFilterRecruitment";
import { Recruitment } from "@/types/Recruitment";
import Link from "next/link"; // Import Link for navigation

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
  }, []); // Empty dependency array means it runs on mount only

  return (
    <Box sx={{ maxWidth: 1200, margin: "auto", mt: 5 }}>
      {/* Flex container for the create recruitment button */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Link href="/create-recruitment" passHref>
          <Button variant="contained">募集作成</Button>
        </Link>
      </Box>

      {/* Uncomment this if you want to display a title */}
      {/* <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
        新規募集
      </Typography> */}

      <RecruitmentList recruitments={recruitments} />
    </Box>
  );
};

export default RecruitmentPage;
