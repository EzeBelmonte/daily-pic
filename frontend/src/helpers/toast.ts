import toast from "react-hot-toast";

export default function showToast(
  message: string,
  type: "success" | "error" | "loading" | "default" = "default"
) {
  switch (type) {
    case "success":
      toast.success(message);
      break;

    case "error":
      toast.error(message, {
        duration: 2500,

        style: {
          border: "1px solid #ef4444",
          padding: "16px",
          color: "#fff",
          background: "#7f1d1d",
        },

        iconTheme: {
          primary: "#ef4444",
          secondary: "#fff",
        },
      });
      break;

    case "loading":
      toast.loading(message);
      break;

    default:
      toast(message);
  }
};