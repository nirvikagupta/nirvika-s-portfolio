import { useState } from "react";

type ToastOptions = {
  title: string;
  description: string;
  variant: string;
};

export function useToast() {
  const [toast, setToast] = useState<ToastOptions | null>(null);

  const showToast = (options: ToastOptions) => {
    setToast(options);
    setTimeout(() => setToast(null), 3000); // Hide toast after 3 seconds
  };

  return {
    toast,
    showToast,
  };
}