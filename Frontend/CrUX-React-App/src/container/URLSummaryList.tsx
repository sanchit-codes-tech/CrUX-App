import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import { Assessment } from "@mui/icons-material";
import UrlSummaryCard from "../components/widgets/URLSummaryCard";
import type { CruxResult } from "../types/AppTypes";
import { GlassMorphicPaper } from "../constants/styles";

interface UrlSummaryListProps {
  results: CruxResult[];
}

const UrlSummaryList: React.FC<UrlSummaryListProps> = ({ results }) => {
  if (results.length === 0) return null;

  return (
    <GlassMorphicPaper sx={{ mb: 4 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
        <Assessment color="primary" />
        <Typography variant="h6">Individual URL Performance</Typography>
      </Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Performance summary for each analyzed URL
      </Typography>

      <Grid container spacing={3}>
        {results.map((result, index) => (
          <Grid key={index}>
            <UrlSummaryCard result={result} />
          </Grid>
        ))}
      </Grid>
    </GlassMorphicPaper>
  );
};

export default UrlSummaryList;
