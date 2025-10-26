import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  type SelectChangeEvent,
} from "@mui/material";

interface MetricFilterProps {
  value: string;
  onChange: (value: string) => void;
}

const MetricFilter: React.FC<MetricFilterProps> = ({ value, onChange }) => {
  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value);
  };

  return (
    <FormControl sx={{ minWidth: 200 }}>
      <InputLabel>Filter by Metric</InputLabel>
      <Select value={value} onChange={handleChange} label="Filter by Metric">
        <MenuItem value="all">All Metrics</MenuItem>
        <MenuItem value="lcp">LCP (Largest Contentful Paint)</MenuItem>
        <MenuItem value="fid">FID (First Input Delay)</MenuItem>
        <MenuItem value="cls">CLS (Cumulative Layout Shift)</MenuItem>
        <MenuItem value="fcp">FCP (First Contentful Paint)</MenuItem>
        <MenuItem value="ttfb">TTFB (Time to First Byte)</MenuItem>
        <MenuItem value="inp">INP (Interaction to Next Paint)</MenuItem>
      </Select>
    </FormControl>
  );
};

export default MetricFilter;
