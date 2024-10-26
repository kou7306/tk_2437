// app/page.tsx
"use client";

import React, { useState } from "react";
import { TextField, Box, CircularProgress, Button } from "@mui/material";
import ImageCard from "../components/ImageCard";
import axios from "axios";

interface Metadata {
  title: string;
  description: string;
  image: string;
}

export default function Home() {
  const [url, setUrl] = useState("");
  const [metadata, setMetadata] = useState<Metadata | null>(null);
  const [loading, setLoading] = useState(false);

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };

  const fetchMetadata = async () => {
    setLoading(true);
    setMetadata(null);

    try {
      const response = await axios.get("/api/metadata", { params: { url } });
      setMetadata(response.data);
    } catch (error) {
      console.error("Failed to fetch metadata", error);
      setMetadata(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 345, margin: "auto", textAlign: "center", mt: 5 }}>
      <TextField
        label="Enter URL"
        variant="outlined"
        fullWidth
        value={url}
        onChange={handleUrlChange}
        placeholder="Enter URL to fetch metadata"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={fetchMetadata}
        sx={{ mt: 2 }}
      >
        Load Metadata
      </Button>

      {loading ? (
        <CircularProgress sx={{ mt: 2 }} />
      ) : (
        metadata && <ImageCard {...metadata} />
      )}
    </Box>
  );
}
