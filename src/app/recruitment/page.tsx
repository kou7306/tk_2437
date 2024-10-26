// pages/index.tsx
import React from "react";
import RecruitmentList from "@/components/recruitment/RecruitmentList";
import { Typography, Box } from "@mui/material";

// MockData.ts
export const recruitmentsData = [
  {
    name: "Company A",
    detail: "Looking for software engineers to join our team.",
    image: "https://placehold.jp/150x150.png", // プレースホルダー画像のURL
    title: "Software Engineer",
    date: "2024-01-01",
    sum: 5, // 募集人数
    participants: 2, // 参加者数
  },
  {
    name: "Company B",
    detail: "Seeking data scientists for exciting projects.",
    image: "https://via.placeholder.com/300.png/09f/fff",
    title: "Data Scientist",
    date: "2024-02-01",
    sum: 3,
    participants: 1,
  },
  {
    name: "Company C",
    detail: "Hiring UX/UI designers to improve our products.",
    image: "https://via.placeholder.com/300.png/09f/fff",
    title: "UX/UI Designer",
    date: "2024-03-01",
    sum: 4,
    participants: 3,
  },
  {
    name: "Company D",
    detail: "Join us as a product manager.",
    image: "https://via.placeholder.com/300.png/09f/fff",
    title: "Product Manager",
    date: "2024-04-01",
    sum: 2,
    participants: 0,
  },
  {
    name: "Company E",
    detail: "Looking for marketing specialists.",
    image: "https://via.placeholder.com/300.png/09f/fff",
    title: "Marketing Specialist",
    date: "2024-05-01",
    sum: 6,
    participants: 4,
  },
  {
    name: "Company F",
    detail: "Seeking system analysts to analyze our systems.",
    image: "https://via.placeholder.com/300.png/09f/fff",
    title: "System Analyst",
    date: "2024-06-01",
    sum: 3,
    participants: 1,
  },
];

const RecruitmentPage: React.FC = () => {
  return (
    <Box sx={{ maxWidth: 1200, margin: "auto", mt: 5 }}>
      {/* <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
        新規募集
      </Typography> */}

      <RecruitmentList recruitments={recruitmentsData} />
    </Box>
  );
};

export default RecruitmentPage;
