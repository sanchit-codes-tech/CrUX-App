import { Paper, styled } from "@mui/material";
import Button from "../components/common/Button";

export const GlassMorphicPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: Number(theme.shape.borderRadius) * 3,
  boxShadow: "0 4px 24px 0 rgba(60, 72, 88, 0.08)",
  background:
    "linear-gradient(135deg, #f3e7fe 0%, #d0f5ec 35%, #50f1fcff 60%, #b388ff 80%, #a8edea 95%, #a3c0f7ff 100%)",
  backgroundColor: "#f3e7fe",
  backdropFilter: "saturate(180%) blur(8px)",

  "@media (prefers-color-scheme: dark)": {
    background:
      "linear-gradient(135deg, #565da9ff 0%, #b388ff 40%, #32d4fdb3 70%, #53baffb5 100%)",
    backgroundColor: "#232946",
    color: "#ffd54f",
  },
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  minWidth: 140,
  height: 56,
  backgroundColor: "#0b26adff",
  color: theme.palette.primary.contrastText,
  textTransform: "none",
  boxShadow: theme.shadows[2],
  transition: "background-color 0.3s ease, transform 0.2s ease",

  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
    transform: "translateY(-2px)",
    boxShadow: theme.shadows[4],
  },

  "&:active": {
    transform: "translateY(0)",
    boxShadow: theme.shadows[2],
  },
}));
