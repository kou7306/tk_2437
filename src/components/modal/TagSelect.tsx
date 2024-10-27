// TagSelect.tsx
import React from "react";
import { Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { TagOption } from "../utils/tagOptions"; // タグオプションの型

type TagSelectProps = {
  selectedTags: TagOption[];
  handleTagChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
};

const tags = [
  { label: "仕事", value: "work" },
  { label: "趣味", value: "hobby" },
  { label: "旅行", value: "travel" },
  { label: "学習", value: "study" },
]; // 適宜変更してください

const TagSelect: React.FC<TagSelectProps> = ({
  selectedTags,
  handleTagChange,
}) => {
  return (
    <Box>
      <FormControl fullWidth>
        <InputLabel id="tag-select-label">タグを選択</InputLabel>
        <Select
          labelId="tag-select-label"
          multiple
          value={selectedTags}
          onChange={handleTagChange}
          renderValue={(selected) => selected.join(", ")} // 選択したタグをカンマで区切って表示
        >
          {tags.map((tag) => (
            <MenuItem key={tag.value} value={tag.label}>
              {tag.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default TagSelect;
