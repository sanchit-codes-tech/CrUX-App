import React from "react";
import { Container as MuiContainer, type ContainerProps } from "@mui/material";

const Container: React.FC<ContainerProps> = ({ children, ...props }) => {
  return (
    <MuiContainer maxWidth={false} sx={{ py: 4, ...props.sx }} {...props}>
      {children}
    </MuiContainer>
  );
};

export default Container;
