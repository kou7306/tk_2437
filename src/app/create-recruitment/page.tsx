"use client";

import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import axios from "axios";
import { Recruitment } from "@/types/Recruitment";
import tagOptions from "@/components/tagOptions";
import createRecruitment from "@/utils/createRecruitment";
import { getUuidFromCookie } from "@/actions/users";

const RecruitmentForm: React.FC = () => {
  const [formData, setFormData] = useState<Recruitment>({
    title: "",
    detail: "",
    name: "",
    date: new Date(),
    sum: "",
    participants: [],
    tags: [],
    owner_id: "", // Initialize owner_id as empty
    event_url: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    // ユーザーデータを取得する関数
    const fetchProfile = async () => {
      const ownerId = await getUuidFromCookie();
      if (ownerId) {
        setFormData((prev) => ({
          ...prev,
          owner_id: ownerId,
        }));
      }
    };

    fetchProfile();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "date" ? new Date(value) : value,
    }));
  };

  const handleTagToggle = (tag: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!formData.title || !formData.name || !formData.date || !formData.sum) {
      setErrorMessage("すべての必須項目を入力してください。");
      setLoading(false);
      return;
    }

    try {
      await createRecruitment(formData);
      setSuccessMessage("募集が正常に作成されました！");
      setFormData({
        title: "",
        detail: "",
        name: "",
        date: new Date(),
        sum: "",
        participants: [],
        tags: [],
        owner_id: formData.owner_id, // Retain the owner_id after submission
        event_url: "",
      });
    } catch (error) {
      setErrorMessage("募集の作成に失敗しました。再試行してください。");
      console.error("Error creating recruitment:", error);
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
        募集作成
      </Typography>

      {errorMessage && <Typography color="error">{errorMessage}</Typography>}
      {successMessage && (
        <Typography color="primary">{successMessage}</Typography>
      )}

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          required
          name="title"
          label="タイトル"
          value={formData.title}
          onChange={handleInputChange}
          margin="normal"
        />

        <TextField
          fullWidth
          multiline
          minRows={4}
          name="detail"
          label="詳細"
          value={formData.detail}
          onChange={handleInputChange}
          margin="normal"
        />

        <TextField
          fullWidth
          required
          name="name"
          label="イベント名"
          value={formData.name}
          onChange={handleInputChange}
          margin="normal"
        />

        <TextField
          fullWidth
          required
          name="date"
          label="日付"
          type="date"
          value={formData.date?.toISOString().split("T")[0] ?? ""}
          onChange={handleInputChange}
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          fullWidth
          required
          name="sum"
          label="募集人数"
          value={formData.sum}
          onChange={handleInputChange}
          margin="normal"
        />

        <TextField
          fullWidth
          name="event_url"
          label="イベントURL"
          value={formData.event_url}
          onChange={handleInputChange}
          margin="normal"
        />

        <Typography sx={{ mt: 2, mb: 1 }}>タグを選択</Typography>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 1,
            mb: 2,
          }}
        >
          {tagOptions.map((tag) => (
            <Button
              key={tag}
              variant={formData.tags.includes(tag) ? "contained" : "outlined"}
              onClick={() => handleTagToggle(tag)}
              sx={{
                borderRadius: "20px",
                textTransform: "none",
                minWidth: "auto",
                px: 2,
                py: 0.5,
                backgroundColor: formData.tags.includes(tag)
                  ? "primary.main"
                  : "transparent",
                color: formData.tags.includes(tag) ? "white" : "primary.main",
                "&:hover": {
                  backgroundColor: formData.tags.includes(tag)
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
          {loading ? "送信中..." : "募集を作成"}
        </Button>
      </form>
    </Box>
  );
};

export default RecruitmentForm;
