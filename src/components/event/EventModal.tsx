// components/EventFilterModal.tsx
import React, { useState } from "react";
import {
  Modal,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  TextField,
} from "@mui/material";

interface EventFilterModalProps {
  open: boolean;
  onClose: () => void;
  onFilter: (filters: {
    region: string[];
    date: string;
    minParticipants: number;
    maxParticipants: number;
  }) => void; // フィルタを送信するためのコールバック
}

const EventFilterModal: React.FC<EventFilterModalProps> = ({
  open,
  onClose,
  onFilter,
}) => {
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [date, setDate] = useState<string>("");
  const [minParticipants, setMinParticipants] = useState<number>(0);
  const [maxParticipants, setMaxParticipants] = useState<number>(100);

  const handleToggleRegion = (region: string) => {
    setSelectedRegions((prev) =>
      prev.includes(region)
        ? prev.filter((r) => r !== region)
        : [...prev, region]
    );
  };

  const handleSubmit = () => {
    onFilter({
      region: selectedRegions,
      date,
      minParticipants,
      maxParticipants,
    });
    onClose(); // モーダルを閉じる
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          bgcolor: "background.paper",
          borderRadius: 1,
          boxShadow: 24,
          p: 4,
          maxWidth: 400,
          mx: "auto",
          mt: "20vh",
        }}
      >
        <Typography variant="h6" component="h2">
          イベントフィルタ
        </Typography>
        <Typography variant="subtitle1">地域</Typography>
        <FormControlLabel
          control={
            <Checkbox
              checked={selectedRegions.includes("Tokyo")}
              onChange={() => handleToggleRegion("Tokyo")}
            />
          }
          label="Tokyo"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={selectedRegions.includes("Osaka")}
              onChange={() => handleToggleRegion("Osaka")}
            />
          }
          label="Osaka"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={selectedRegions.includes("Nagoya")}
              onChange={() => handleToggleRegion("Nagoya")}
            />
          }
          label="Nagoya"
        />

        <Typography variant="subtitle1" sx={{ mt: 2 }}>
          日付
        </Typography>
        <TextField
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />

        <Typography variant="subtitle1">参加人数</Typography>
        <TextField
          type="number"
          label="最小人数"
          value={minParticipants}
          onChange={(e) => setMinParticipants(Number(e.target.value))}
          fullWidth
          sx={{ mb: 1 }}
        />
        <TextField
          type="number"
          label="最大人数"
          value={maxParticipants}
          onChange={(e) => setMaxParticipants(Number(e.target.value))}
          fullWidth
        />

        <Button variant="contained" onClick={handleSubmit} sx={{ mt: 2 }}>
          フィルタを適用
        </Button>
      </Box>
    </Modal>
  );
};

export default EventFilterModal;
