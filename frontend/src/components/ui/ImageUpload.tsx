import { useRef } from "react";
import { Camera } from "lucide-react";

import { cn } from "@/utils/cn";
import { Button, Input } from "@/components";

type ImageUploadProps = {
  onSelect: (file: File) => void;
  className?: string;
}

export default function ImageUpload({
  onSelect,
  className = "",
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleOpenExplorer = () => {
    inputRef.current?.click();
  }

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Debes seleccionar una imagen.");
      return;
    }

    onSelect(file);

    // Permite volver a seleccionar el mismo archivo
    e.target.value = "";
  }

  return (
    <div className={cn(
      "flex justify-center",
      className
    )}>
      <Input 
        ref={inputRef}
        type="file"
        accept="image/"
        hidden
        onChange={handleFileChange}
      />

      <Button
        type="button"
        onClick={handleOpenExplorer}
        className="
          flex items-center 
          gap-2 px-2 py-1
          bg-[rgba(0,0,0,0.4)] rounded
          text-white cursor-pointer
        ">
        <Camera size={18} />
      </Button>
    </div>
  );
}