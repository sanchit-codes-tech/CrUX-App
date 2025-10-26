import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Divider,
} from "@mui/material";
import type { CruxResult } from "../../types/AppTypes";
import { Rating, ToastAlertColor } from "../../constants/enums";
import { calculateOverallScore } from "../utlility/SummaryUtils";

interface UrlSummaryCardProps {
  result: CruxResult;
}

const UrlSummaryCard: React.FC<UrlSummaryCardProps> = ({ result }) => {
  const overallScore = calculateOverallScore(result);

  return (
    <Card
      elevation={3}
      sx={{ height: "100%", position: "relative", overflow: "visible" }}
    >
      <CardContent>
        {/* URL Header */}
        <Box sx={{ mb: 2 }}>
          <Typography
            variant="subtitle2"
            color="text.secondary"
            sx={{ fontSize: "0.75rem" }}
          >
            URL
          </Typography>
          <Typography
            variant="h6"
            sx={{
              wordBreak: "break-all",
              fontSize: "0.95rem",
              fontWeight: 600,
              color: "primary.main",
            }}
          >
            {result.url}
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Overall Score */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {overallScore.icon}
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              {Math.round(overallScore.score)}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              / 100
            </Typography>
          </Box>
          <Chip
            label={overallScore.rating}
            color={overallScore.color as ToastAlertColor}
            size="small"
          />
        </Box>

        {/* Summary Stats */}
        <Box
          sx={{
            backgroundColor: "primary.light",
            p: 1.5,
            borderRadius: 1,
            mt: 2,
            minWidth: "300px",
          }}
        >
          <Typography
            variant="caption"
            color="primary.contrastText"
            sx={{ display: "block", mb: 0.5 }}
          >
            Performance Summary
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 1,
            }}
          >
            <Box>
              <Typography
                variant="caption"
                color="primary.contrastText"
                sx={{ opacity: 0.8 }}
              >
                Good Metrics
              </Typography>
              <Typography
                variant="body2"
                color="primary.contrastText"
                sx={{ fontWeight: 600 }}
              >
                {
                  Object.values(result.metrics).filter(
                    (m) => m.rating === Rating.good
                  ).length
                }{" "}
                / 6
              </Typography>
            </Box>
            <Box>
              <Typography
                variant="caption"
                color="primary.contrastText"
                sx={{ opacity: 0.8 }}
              >
                Needs Work
              </Typography>
              <Typography
                variant="body2"
                color="primary.contrastText"
                sx={{ fontWeight: 600 }}
              >
                {
                  Object.values(result.metrics).filter(
                    (m) => m.rating === Rating.imprv
                  ).length
                }
              </Typography>
            </Box>
            <Box>
              <Typography
                variant="caption"
                color="primary.contrastText"
                sx={{ opacity: 0.8 }}
              >
                Poor
              </Typography>
              <Typography
                variant="body2"
                color="primary.contrastText"
                sx={{ fontWeight: 600 }}
              >
                {
                  Object.values(result.metrics).filter(
                    (m) => m.rating === "poor"
                  ).length
                }
              </Typography>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default UrlSummaryCard;
