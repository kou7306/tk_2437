"use client";
import React, { useState } from "react";
import { Grid, Pagination } from "@mui/material";
import EventCard from "../card/EventCard"; // EventCardコンポーネントをインポート
import { Event } from "@/types/Event"; // Event型をインポート

interface EventListProps {
  events: Event[]; // イベントデータの配列
}

const EventList: React.FC<EventListProps> = ({ events }) => {
  const [page, setPage] = useState(1);
  const itemsPerPage = 5; // 1ページあたりのイベント数

  // ページのイベントを取得
  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  // 現在表示するイベントを取得
  const startIndex = (page - 1) * itemsPerPage;
  const currentEvents = events.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="mx-24">
      <Grid container spacing={8}>
        {" "}
        {/* spacingを8に設定して余白を広げる */}
        {currentEvents.map((event) => (
          <Grid item xs={12} sm={6} md={4} key={event.name}>
            <EventCard {...event} /> {/* イベントカードを表示 */}
          </Grid>
        ))}
      </Grid>
      <Pagination
        count={Math.ceil(events.length / itemsPerPage)} // ページ数を計算
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

export default EventList;
