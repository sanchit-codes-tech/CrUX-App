import { Box, Chip, Typography, Tooltip } from "@mui/material";
import type { Metric } from "../../types/AppTypes";
import {
  formatMetricValue,
  getMetricDescription,
  getRatingColor,
} from "../utlility/TextFormatter";

interface MetricCellProps {
  metric: Metric;
  metricName: string;
}

const MetricCell = ({ metric, metricName }: MetricCellProps) => {
  return (
    <Tooltip title={getMetricDescription(metricName)} arrow>
      <Box>
        <Typography variant="body2" sx={{ fontWeight: 500 }}>
          {metric ? formatMetricValue(metricName, metric.value) : "N/A"}
        </Typography>
        <Chip
          label={metric?.rating?.replace("-", " ") ?? ""}
          color={metric && getRatingColor(metric.rating)}
          size="small"
          sx={{ mt: 0.5, textTransform: "capitalize" }}
        />
      </Box>
    </Tooltip>
  );
};

export default MetricCell;
