import { useCallback, useState } from "react";
import { ToastAlertColor } from "../constants/enums";

export const useToast = () => {
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: ToastAlertColor.INFO,
  });

  const showToast = useCallback(
    (message: string, severity: ToastAlertColor) => {
      setToast({ open: true, message, severity });
    },
    []
  );

  const hideToast = useCallback(() => {
    setToast((prev) => ({ ...prev, open: false }));
  }, []);

  return { toast, showToast, hideToast };
};
