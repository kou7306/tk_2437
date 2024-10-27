"use client";
import React, { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import createEvent from "@/utils/createEvent";
import tagOptions from "@/components/tagOptions";

const EventRegistrationPage: React.FC = () => {
  const [eventData, setEventData] = useState({
    name: "",
    company: "",
    place: "",
    period: {
      start: "",
      end: "",
    },
    detail: "",
    tags: [] as string[],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "period.start" || name === "period.end") {
      const key = name.split(".")[1];
      setEventData((prev) => ({
        ...prev,
        period: {
          ...prev.period,
          [key]: value,
        },
      }));
    } else {
      setEventData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleTagToggle = (tag: string) => {
    setEventData((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    console.log("Submitting event data:", eventData); // 追加: デバッグ用ログ

    try {
      const response = await createEvent(eventData); // ここでエラーが出るか確認
      console.log("Response from createEvent:", response); // 追加: 成功時のレスポンスログ
      setSuccessMessage("イベントが正常に登録されました！");
      setEventData({
        name: "",
        company: "",
        place: "",
        period: {
          start: "",
          end: "",
        },
        detail: "",
        tags: [],
      });
    } catch (error) {
      console.error("Error in handleSubmit:", error); // 追加: エラー時のログ
      setError("イベントの登録に失敗しました。再試行してください。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 600,
        mx: "auto",
        mt: 4,
        p: 3,
        border: "1px solid #ccc",
        borderRadius: 2,
      }}
    >
      <Typography variant="h4" gutterBottom>
        イベント情報登録
      </Typography>

      {error && <Typography color="error">{error}</Typography>}
      {successMessage && (
        <Typography color="primary">{successMessage}</Typography>
      )}

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          name="name"
          label="イベント名"
          value={eventData.name}
          onChange={handleInputChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          name="company"
          label="会社名"
          value={eventData.company}
          onChange={handleInputChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          name="place"
          label="開催地"
          value={eventData.place}
          onChange={handleInputChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          name="period.start"
          label="開始日"
          type="date"
          value={eventData.period?.start ?? ""}
          onChange={handleInputChange}
          margin="normal"
          required
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          fullWidth
          name="period.end"
          label="終了日"
          type="date"
          value={eventData.period?.end ?? ""}
          onChange={handleInputChange}
          margin="normal"
          required
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          fullWidth
          name="detail"
          label="詳細"
          multiline
          rows={4}
          value={eventData.detail}
          onChange={handleInputChange}
          margin="normal"
          required
        />

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 1,
            mt: 2,
            mb: 2,
          }}
        >
          {tagOptions.map((tag) => (
            <Button
              key={tag}
              variant={eventData.tags.includes(tag) ? "contained" : "outlined"}
              onClick={() => handleTagToggle(tag)}
              sx={{
                borderRadius: "20px",
                textTransform: "none",
                minWidth: "auto",
                px: 2,
                py: 0.5,
                backgroundColor: eventData.tags.includes(tag)
                  ? "primary.main"
                  : "transparent",
                color: eventData.tags.includes(tag) ? "white" : "primary.main",
                "&:hover": {
                  backgroundColor: eventData.tags.includes(tag)
                    ? "primary.dark"
                    : "rgba(25, 118, 210, 0.04)",
                },
              }}
            >
              {tag}
            </Button>
          ))}
        </Box>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading}
          sx={{ mt: 2 }}
        >
          {loading ? "登録中..." : "イベントを登録"}
        </Button>
      </form>
    </Box>
  );
};

export default EventRegistrationPage;
