"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  CircularProgress,
  Grid,
  Typography,
  IconButton,
} from "@mui/material";
import EventCard from "@/components/card/EventCard";
import RecruitmentCard from "@/components/card/RecruitmentCard";
import { getNewEvents } from "@/utils/getFilterEvent";
import { getNewRecruitments } from "@/utils/getFilterRecruitment";
import { Event } from "@/types/Event";
import { Recruitment } from "@/types/Recruitment";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"; // Import the right arrow icon
import { useRouter } from "next/navigation"; // Import useRouter for navigation

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [eventdataList, setEventList] = useState<Event[]>([]);
  const [recruitmentList, setRecruitmentList] = useState<Recruitment[]>([]);
  const router = useRouter(); // Initialize router

  // 新規イベントデータを取得する関数
  const fetchEventdata = async () => {
    setLoading(true);
    setEventList([]); // Clear previous events

    try {
      const events = await getNewEvents("4"); // 例えば、10件のイベントを取得
      setEventList(events);
    } catch (error) {
      console.error("Failed to fetch Event", error);
      setEventList([]);
    } finally {
      setLoading(false);
    }
  };

  // 新規募集データを取得する関数
  const fetchRecruitmentData = async () => {
    setLoading(true);
    setRecruitmentList([]); // Clear previous recruitments

    try {
      const recruitments = await getNewRecruitments("4"); // 4件の募集を取得
      setRecruitmentList(recruitments);
    } catch (error) {
      console.error("Failed to fetch Recruitment", error);
      setRecruitmentList([]);
    } finally {
      setLoading(false);
    }
  };

  // コンポーネントがマウントされたときにイベントデータを取得
  useEffect(() => {
    fetchEventdata();
    fetchRecruitmentData();
  }, []);

  return (
    <Box sx={{ maxWidth: 1200, margin: "auto", mt: 5 }}>
      {loading ? (
        <CircularProgress sx={{ mt: 2 }} />
      ) : (
        <>
          {/* 新規募集セクション */}
          <Box sx={{ mb: 4 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
                新規募集
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography
                  variant="body2"
                  sx={{ display: "inline", mr: 1, cursor: "pointer" }}
                  onClick={() => router.push("/recruitment")}
                >
                  詳細はこちら
                </Typography>
                <IconButton
                  size="small"
                  onClick={() => router.push("/recruitment")}
                >
                  <ArrowForwardIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>
            <Grid container spacing={3}>
              {recruitmentList.map((recruitment, index) => (
                <Grid item xs={15} sm={8} md={4} lg={3} key={index}>
                  <RecruitmentCard {...recruitment} />
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* おすすめイベントセクション */}
          <Box sx={{ mb: 4 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
                おすすめイベント
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography
                  variant="body2"
                  sx={{ display: "inline", mr: 1, cursor: "pointer" }}
                  onClick={() => router.push("/event")}
                >
                  詳細はこちら
                </Typography>
                <IconButton size="small" onClick={() => router.push("/event")}>
                  <ArrowForwardIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>
            <Grid container spacing={2}>
              {eventdataList.map((eventdata, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                  <EventCard {...eventdata} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </>
      )}
    </Box>
  );
}
