"use client";

import React, { useState } from "react";
import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import EventCard from "@/components/card/EventCard";
import RecruitmentCard from "@/components/card/RecruitmentCard";

interface Eventdata {
  name: string;
  detail: string;
  place: string;
  period: string;
  tags: string[];
  url: string;
}

interface Recruitmentdata {
  title: string;
  name: string;
  detail: string;
  place: string;
  date: string;
  sum: number;
  participants: number;
}

// モックデータ
const eventMockData: Eventdata[] = [
  {
    name: "Event 1",
    detail: "This is the first event.",
    place: "Tokyo",
    period: "2024-10-01 to 2024-10-10",
    tags: ["conference", "networking"],
    url: "",
  },
  {
    name: "Event 2",
    detail: "This is the second event.",
    place: "Osaka",
    period: "2024-11-01 to 2024-11-05",
    tags: ["workshop", "learning"],
    url: "",
  },
];

const recruitmentMockData: Recruitmentdata[] = [
  {
    title: "Recruitment 1",
    name: "Company A",
    detail: "Join our dynamic team.",
    place: "Remote",
    date: "2024-12-01",
    sum: 5,
    participants: 10,
  },
  {
    title: "Recruitment 2",
    name: "Company B",
    detail: "We are looking for talented individuals.",
    place: "Tokyo",
    date: "2024-12-15",
    sum: 3,
    participants: 5,
  },

  {
    title: "Recruitment 1",
    name: "Company A",
    detail: "Join our dynamic team.",
    place: "Remote",
    date: "2024-12-01",
    sum: 5,
    participants: 10,
  },
  {
    title: "Recruitment 2",
    name: "Company B",
    detail: "We are looking for talented individuals.",
    place: "Tokyo",
    date: "2024-12-15",
    sum: 3,
    participants: 5,
  },
];

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [eventdataList, setEventList] = useState<Eventdata[]>(eventMockData);
  const [recruitmentList, setRecruitmentList] =
    useState<Recruitmentdata[]>(recruitmentMockData);

  const fetchEventdata = async () => {
    setLoading(true);
    setEventList([]); // Clear previous Event

    try {
      // 本来はAPIからデータを取得する処理
      // const response = await axios.get("/api/Event", { params: { url } });
      // setEventList(response.data);

      // モックデータをそのまま使用
      setEventList(eventMockData);
      setRecruitmentList(recruitmentMockData);
    } catch (error) {
      console.error("Failed to fetch Event", error);
      setEventList([]);
      setRecruitmentList([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 1200, margin: "auto", mt: 5 }}>
      {loading ? (
        <CircularProgress sx={{ mt: 2 }} />
      ) : (
        <>
          {/* 新規募集セクション */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
              新規募集
            </Typography>
            <Grid container spacing={3}>
              {recruitmentList.map((recruitment, index) => (
                <Grid item xs={15} sm={8} md={4} lg={3} key={index}>
                  <RecruitmentCard
                    image={"https://placehold.jp/150x150.png"}
                    {...recruitment}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* おすすめイベントセクション */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
              おすすめイベント
            </Typography>
            <Grid container spacing={2}>
              {eventdataList.map((eventdata, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                  {" "}
                  {/* lg={3}に変更 */}
                  <EventCard
                    image={"https://placehold.jp/150x150.png"}
                    {...eventdata}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </>
      )}
    </Box>
  );
}
