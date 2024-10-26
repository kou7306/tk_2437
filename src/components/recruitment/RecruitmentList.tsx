"use client";
import React, { useState } from "react";
import { Grid, Pagination } from "@mui/material";
import RecruitmentCard from "../card/RecruitmentCard";
import { Recruitment } from "@/types/Recruitment";

interface RecruitmentListProps {
  recruitments: Recruitment[]; // イベントデータの配列
}

const RecruitmentList: React.FC<RecruitmentListProps> = ({ recruitments }) => {
  const [page, setPage] = useState(1);
  const itemsPerPage = 5; // 1ページあたりのイベント数

  // ページのイベントを取得
  const handleChangePage = (
    recruitment: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const startIndex = (page - 1) * itemsPerPage;
  const currentRecruitments = recruitments.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="mx-24">
      <Grid container spacing={8}>
        {" "}
        {/* spacingを4に増やして余白を広げる */}
        {currentRecruitments.map((recruitment) => (
          <Grid item xs={12} sm={6} md={4} key={recruitment.name}>
            <RecruitmentCard {...recruitment} />
          </Grid>
        ))}
      </Grid>
      <Pagination
        count={Math.ceil(recruitments.length / itemsPerPage)} // ページ数を計算
        page={page}
        onChange={handleChangePage}
        color="primary"
        sx={{
          mt: 2,
          display: "flex",
          justifyContent: "center",
          "& .MuiPaginationItem-root": {
            color: "black", // 通常のページ番号の文字色を黒に設定
          },
          "& .MuiPaginationItem-page.Mui-selected": {
            backgroundColor: "primary.main", // 現在のページの背景色を設定
            color: "white", // 現在のページの文字色を白に設定
          },
        }}
      />
    </div>
  );
};

export default RecruitmentList;
