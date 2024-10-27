"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Navigation } from "swiper/modules";
import EventCard from "@/components/card/EventCard";
import RecruitmentCard from "@/components/card/RecruitmentCard";
import { Button, IconButton, Typography, Box } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { getRecruitmentWithEvent } from "@/utils/getRecruitWithEvent";

const EventSwiperPage = () => {
  interface Event {
    id: string;
    name: string;
    detail: string;
    place: string;
    period: {
      start: string;
      end: string;
    };
    tags: string[];
    url: string;
    company?: string;
    recruitments?: Recruitment[];
  }

  interface Recruitment {
    id: string;
    title: string;
    sum: number;
    participants: number;
    event_url: string;
    tags?: string[];
  }

  const [events, setEvents] = useState<Event[]>([]); // State for API data
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch data from API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Pass the array of event IDs as needed, replace `["1", "2"]` with actual IDs you need
        const eventIds = [
          "7aef6c32-bbcd-474b-88dd-ebca3cf17102",
          "d89c44fe-31ce-44b5-9ce4-095de30b42d1",
        ];
        const data = await getRecruitmentWithEvent(eventIds);
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events with recruitments:", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <Box sx={{ textAlign: "center", padding: "20px", position: "relative" }}>
      <Typography variant="h4" gutterBottom>
        Event Slider
      </Typography>

      {/* Swiper */}
      <Swiper
        modules={[Navigation]}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        spaceBetween={30}
        slidesPerView={1}
        onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
        style={{
          width: "80%",
          maxWidth: "800px",
        }}
      >
        {events.map((event) => (
          <SwiperSlide key={event.id}>
            <EventCard
              id={event.id}
              name={event.name}
              detail={event.detail}
              place={event.place}
              period={event.period}
              tags={event.tags}
              url={event.url}
              company={event.company || "Your Company Name"}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <IconButton
        className="swiper-button-prev"
        sx={{
          position: "fixed",
          left: "30%",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 10,
        }}
      >
        <ArrowBackIcon />
      </IconButton>
      <IconButton
        className="swiper-button-next"
        sx={{
          position: "fixed",
          right: "30%",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 10,
        }}
      >
        <ArrowForwardIcon />
      </IconButton>

      {/* Selected event's related recruitment information */}
      <Box sx={{ marginTop: "20px" }}>
        {events.length > 0 && (
          <>
            <Typography variant="h6">
              Recruitments for {events[currentIndex]?.name}
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: "15px",
                flexWrap: "wrap",
              }}
            >
              {events[currentIndex]?.recruitments?.map((recruitment) => (
                <RecruitmentCard
                  key={recruitment.id}
                  id={recruitment.id}
                  title={recruitment.title}
                  name={events[currentIndex].name}
                  date={new Date(events[currentIndex].period.start)}
                  sum={recruitment.sum.toString()}
                  participants={[recruitment.participants.toString()]}
                  event_url={recruitment.event_url}
                  tags={recruitment.tags || []}
                />
              ))}
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default EventSwiperPage;
