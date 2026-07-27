import { useEffect, useState } from "react";
import { X } from "lucide-react";

import { cn } from "@/utils/cn";
import { Image, Button } from "@/components";

type ImagePreviewProps = {
  file: File | null;
  setImage: React.Dispatch<React.SetStateAction<File | null>>;
  className?: string;
  imageClassName?: string;
  buttonClassName?: string;
};

export default function ImagePreview({
  file,
  setImage,
  className,
  imageClassName,
  buttonClassName,
}: ImagePreviewProps) {
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (!file) {
      setPreview("");
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  const handleCancel = () => {
    setPreview("");
    setImage(null);
  };

  if (!preview) return null;

  return (
    <div className={cn("relative", className)}>
      <Button
        className={cn(
          "absolute z-10 bg-black/40 rounded-full p-0.5",
          buttonClassName
        )}
        onClick={handleCancel}
      >
        <X className="w-4 h-4 text-white/70" />
      </Button>

      <Image
        src={preview}
        alt="Preview"
        className={cn("rounded", imageClassName)}
      />
    </div>
  );
}