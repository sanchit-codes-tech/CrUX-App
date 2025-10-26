import React, { useState, type KeyboardEvent } from "react";
import {
  Box,
  Chip,
  Typography,
  InputAdornment,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Search, Clear } from "@mui/icons-material";
import Input from "../components/common/Input";
import { ButtonVariants, InputVariants } from "../constants/enums";
import { validateUrl } from "../components/utlility/Validator";
import { GlassMorphicPaper, StyledButton } from "../constants/styles";
import { InputTexts, ValidationMessage } from "../constants/constants";
import { InputTollTip } from "../components/widgets/InputToolTip";
import { MAX_URLS } from "../constants/config";

export interface UrlInputProps {
  urls: string[];
  onUrlsChange: (urls: string[]) => void;
  onSearch: () => void;
  loading?: boolean;
  maxUrls?: number;
}

const UrlInput: React.FC<UrlInputProps> = ({
  urls,
  onUrlsChange,
  onSearch,
  loading = false,
  maxUrls = MAX_URLS,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");

  const handleAddUrl = () => {
    const trimmedValue = inputValue.trim();

    if (!trimmedValue) {
      setError(ValidationMessage.URL_REQUIRED);
      return;
    }

    if (!validateUrl(trimmedValue)) {
      setError(ValidationMessage.INVALID_URL);
      return;
    }

    if (urls.includes(trimmedValue)) {
      setError(ValidationMessage.URL_ADDED);
      return;
    }

    if (urls.length >= maxUrls) {
      setError(ValidationMessage.MAX_URLS);
      return;
    }

    onUrlsChange([...urls, trimmedValue]);
    setInputValue("");
    setError("");
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleAddUrl();
    }
  };

  const handleClearAll = () => {
    onUrlsChange([]);
    setInputValue("");
    setError("");
  };

  const handleInputChange = (value: string) => {
    setInputValue(value);
    if (error) setError("");
  };

  return (
    <GlassMorphicPaper elevation={3}>
      <Typography variant="h6" gutterBottom>
        URL Input
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Enter URLs to analyze their Core Web Vitals (up to {maxUrls} URLs)
      </Typography>

      {/* Chips Display Area */}
      {urls.length > 0 && (
        <Box
          sx={{
            mb: 2,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            borderRadius: "16px",
            backdropFilter: "blur(8px)", // optional subtle blur
            color: "white",
            p: 4,
          }}
        >
          <Typography variant="caption" color="text.secondary" sx={{ mr: 1 }}>
            URLs to analyze ({urls.length}/{maxUrls}):
          </Typography>
          {urls.map((url, index) => (
            <Chip
              key={index}
              label={url}
              color="primary"
              variant="outlined"
              sx={{ maxWidth: 400, gap: 1, margin: "0px 12px 0px 0px" }}
            />
          ))}
          <Tooltip title="Clear all URLs">
            <IconButton size="small" onClick={handleClearAll} color="error">
              <Clear />
            </IconButton>
          </Tooltip>
        </Box>
      )}

      {/* Input Field */}
      <Box sx={{ display: "flex", gap: 2, mb: error ? 0 : 2 }}>
        <Input
          fullWidth
          value={inputValue}
          variant={InputVariants.OUTLINED}
          onChange={(e) => handleInputChange(e.target.value)}
          onKeyUp={handleKeyPress}
          placeholder={InputTexts.URL_PLACEHOLDER}
          disabled={loading || urls.length >= maxUrls}
          error={!!error}
          helperText={
            error || <strong>{ValidationMessage.URL_INPUT_VALIDATION}</strong>
          }
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start" sx={{ paddingTop: "6px" }}>
                  <Search color="action" />
                </InputAdornment>
              ),
              endAdornment: inputValue && (
                <InputAdornment position="end">
                  <InputTollTip
                    handleAddUrl={handleAddUrl}
                    loading={loading}
                    urls={urls}
                    maxUrls={maxUrls}
                  />
                </InputAdornment>
              ),
            },
          }}
          sx={{
            input: {
              paddingBottom: "14px",
              paddingTop: "18px",
            },
          }}
        />
        <StyledButton
          color={"secondary"}
          onClick={onSearch}
          variant={ButtonVariants.OUTLINED}
          loading={loading}
          disabled={loading || urls.length == 0}
        >
          {loading ? "Analyzing..." : "Analyze URLs"}
        </StyledButton>
      </Box>

      {urls.length === 0 && !error && (
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ display: "block", mt: 1 }}
        >
          <strong>
            💡 Tip: Enter a URL and press Enter or click the + icon to add it
          </strong>
        </Typography>
      )}
    </GlassMorphicPaper>
  );
};

export default UrlInput;
