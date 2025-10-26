import { Tooltip, IconButton } from "@mui/material";
import { Add } from "@mui/icons-material";

interface InputTollTipProps {
  handleAddUrl: () => void;
  loading: boolean;
  urls: string[];
  maxUrls: number;
}

export function InputTollTip({
  handleAddUrl,
  loading,
  urls,
  maxUrls,
}: InputTollTipProps) {
  return (
    <Tooltip title="Add URL">
      <IconButton
        onClick={handleAddUrl}
        disabled={loading || urls.length >= maxUrls}
        color="primary"
        size="small"
      >
        <Add />
      </IconButton>
    </Tooltip>
  );
}
