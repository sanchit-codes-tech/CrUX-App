import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  type SelectChangeEvent,
} from "@mui/material";

interface SortControlsProps {
  value: string;
  onChange: (value: string) => void;
}

const SortControls: React.FC<SortControlsProps> = ({ value, onChange }) => {
  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value);
  };

  return (
    <FormControl sx={{ minWidth: 200 }}>
      <InputLabel>Sort By</InputLabel>
      <Select value={value} onChange={handleChange} label="Sort By">
        <MenuItem value="url">URL</MenuItem>
        <MenuItem value="lcp">LCP</MenuItem>
        <MenuItem value="fid">FID</MenuItem>
        <MenuItem value="cls">CLS</MenuItem>
        <MenuItem value="fcp">FCP</MenuItem>
        <MenuItem value="ttfb">TTFB</MenuItem>
        <MenuItem value="inp">INP</MenuItem>
      </Select>
    </FormControl>
  );
};

export default SortControls;
