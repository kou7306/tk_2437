// SearchButton.tsx
import React from "react";
import { Button } from "@mui/material";

type SearchButtonProps = {
  onClick: () => void;
};

const SearchButton: React.FC<SearchButtonProps> = ({ onClick }) => {
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={onClick}
      sx={{ marginTop: "16px" }}
    >
      検索
    </Button>
  );
};

export default SearchButton;
