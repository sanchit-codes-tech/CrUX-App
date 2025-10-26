import { CheckCircle, Error, Warning } from "@mui/icons-material";
import type { CruxResult } from "../../types/AppTypes";
import { Rating } from "../../constants/enums";

// Calculate overall score based on ratings
export const calculateOverallScore = (
  result: CruxResult
): {
  score: number;
  rating: string;
  color: string;
  icon: React.JSX.Element;
} => {
  const metrics = result.metrics;
  const ratings = Object.values(metrics).map((m) => m.rating);

  const goodCount = ratings.filter((r) => r === Rating.good).length;
  const needsImprovementCount = ratings.filter(
    (r) => r === Rating.imprv
  ).length;

  const score = (goodCount * 100 + needsImprovementCount * 50) / ratings.length;

  if (score >= 80) {
    return {
      score,
      rating: "Good",
      color: "success",
      icon: <CheckCircle color="success" />,
    };
  } else if (score >= 50) {
    return {
      score,
      rating: "Needs Improvement",
      color: "warning",
      icon: <Warning color="warning" />,
    };
  } else {
    return {
      score,
      rating: "Poor",
      color: "error",
      icon: <Error color="error" />,
    };
  }
};
