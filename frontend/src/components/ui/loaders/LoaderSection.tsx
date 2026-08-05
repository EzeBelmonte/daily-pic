interface Props {
  fullScreen?: boolean;
}

export default function LoaderSection({ fullScreen = false }: Props) {
  return (
    <div
      className={
        fullScreen
          ? "fixed inset-0 z-50 flex items-center justify-center bg-[rgba(34,34,34,0.3)] backdrop-blur-sm"
          : "flex items-center justify-center py-10"
      }
    >
      <div className="h-10 w-10 animate-spin rounded-full border-[6px] border-gray-300 border-t-blue-600" />
    </div>
  );
}