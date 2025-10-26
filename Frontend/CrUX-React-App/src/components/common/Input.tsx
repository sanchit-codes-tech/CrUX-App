import { TextField, type TextFieldProps } from "@mui/material";
import { InputVariants } from "../../constants/enums";

const Input = ({
  variant = InputVariants.FILLED,
  fullWidth = true,
  ...props
}: TextFieldProps) => {
  return <TextField variant={variant} fullWidth={fullWidth} {...props} />;
};

export default Input;
