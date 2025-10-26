import React from "react";
import { Grid, Card, CardContent, Typography, Box } from "@mui/material";
import { TrendingUp, TrendingDown, Remove } from "@mui/icons-material";
import type { CruxSummary } from "../../types/AppTypes";
import { formatMetricValue } from "../utlility/TextFormatter";

interface SummaryCardsProps {
  summary: CruxSummary;
  metrics?: string[];
}

const SummaryCards: React.FC<SummaryCardsProps> = ({
  summary,
  metrics = ["lcp", "fid", "cls", "fcp", "ttfb", "inp"],
}) => {
  const getMetricLabel = (metric: string): string => {
    const labels: Record<string, string> = {
      lcp: "Largest Contentful Paint",
      fid: "First Input Delay",
      cls: "Cumulative Layout Shift",
      fcp: "First Contentful Paint",
      ttfb: "Time to First Byte",
      inp: "Interaction to Next Paint",
    };
    return labels[metric] || metric.toUpperCase();
  };

  const getTrendIcon = (avg: number, max: number, min: number) => {
    const range = max - min;
    const midpoint = min + range / 2;

    if (avg < midpoint) return <TrendingDown color="success" />;
    if (avg > midpoint) return <TrendingUp color="error" />;
    return <Remove color="action" />;
  };

  return (
    <Grid container spacing={2} sx={{ mb: 3 }}>
      {metrics.map((metric) => {
        const data = summary[metric];
        if (!data) return null;
        return (
          <Grid key={metric}>
            <Card elevation={2}>
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    mb: 1,
                  }}
                >
                  <Typography
                    variant="overline"
                    color="text.secondary"
                    sx={{ lineHeight: 1.2 }}
                  >
                    {metric.toUpperCase()}
                  </Typography>
                  {getTrendIcon(data.average, data.max, data.min)}
                </Box>

                <Typography variant="h5" sx={{ mb: 0.5 }}>
                  {formatMetricValue(metric, data.average)}
                </Typography>

                <Typography
                  variant="caption"
                  color="text.secondary"
                  display="block"
                >
                  {getMetricLabel(metric)}
                </Typography>

                <Box
                  sx={{ mt: 1, pt: 1, borderTop: 1, borderColor: "divider" }}
                >
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    display="block"
                  >
                    Range: {formatMetricValue(metric, data.min)} -{" "}
                    {formatMetricValue(metric, data.max)}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    display="block"
                  >
                    Median: {formatMetricValue(metric, data.median)}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default SummaryCards;
