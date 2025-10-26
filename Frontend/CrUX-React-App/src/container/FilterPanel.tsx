import React from "react";
import { Paper, Box, Typography } from "@mui/material";
import { FilterList } from "@mui/icons-material";
import MetricFilter from "../components/widgets/MetricFilter";
import SortControls from "../components/widgets/SortControl";
import Input from "../components/common/Input";
import { InputTexts } from "../constants/constants";

interface FilterPanelProps {
  filterMetric: string;
  onFilterMetricChange: (value: string) => void;
  filterThreshold: string;
  onFilterThresholdChange: (value: string) => void;
  sortBy: string;
  onSortByChange: (value: string) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  filterMetric,
  onFilterMetricChange,
  filterThreshold,
  onFilterThresholdChange,
  sortBy,
  onSortByChange,
}) => {
  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
        <FilterList />
        <Typography variant="h6">Filters & Sorting</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexWrap: "wrap",
          alignItems: "flex-start",
        }}
      >
        <MetricFilter value={filterMetric} onChange={onFilterMetricChange} />

        <Input
          label={InputTexts.FILTER_INPUT_TITLE}
          type="number"
          value={filterThreshold}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onFilterThresholdChange(e.target.value)
          }
          sx={{ width: 180 }}
          placeholder={InputTexts.FILTER_INPUT_PLACEHOLDER}
          helperText="Filter results above this value"
        />

        <SortControls value={sortBy} onChange={onSortByChange} />
      </Box>
    </Paper>
  );
};

export default FilterPanel;
