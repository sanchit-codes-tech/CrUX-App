import React from "react";
import {
  Button as MuiButton,
  CircularProgress,
  type ButtonProps as MuiButtonProps,
} from "@mui/material";
import { ButtonVariants } from "../../constants/enums";

interface ButtonProps extends MuiButtonProps {
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  loading = false,
  disabled,
  children,
  variant = ButtonVariants.CONTAINED,
  startIcon,
  color,
  ...props
}) => {
  return (
    <MuiButton
      variant={variant}
      color={color}
      disabled={disabled || loading}
      startIcon={
        loading ? <CircularProgress size={20} color="inherit" /> : startIcon
      }
      {...props}
    >
      {children}
    </MuiButton>
  );
};

export default Button;
