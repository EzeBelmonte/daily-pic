import { Toaster } from "react-hot-toast";

export default function AlertToaster() {
  return (
    <Toaster
      position="top-center"
      gutter={12}
      toastOptions={{
        duration: 2500,
        style: {
          background: "#18181b",
          color: "#fff",
          borderRadius: "12px",
          border: "1px solid #3f3f46",
          padding: "14px 18px",
        },
      }}
    />
  );
}