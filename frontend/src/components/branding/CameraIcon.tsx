import { useId } from "react";

type Props = {
  className?: string;
};

export default function CameraIcon({ className }: Props) {
  const gradientId = useId();

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 200"
      fill="none"
      className={className}
    >
      <defs>
        <linearGradient
          id={gradientId}
          x1="52"
          y1="74"
          x2="204"
          y2="184"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#590dd4" />
          <stop offset="1" stopColor="#410e58" />
        </linearGradient>
      </defs>

      {/* Botón cámara */}
      <path
        d="
          M 30 70
          L 30 50
          C 30 50 30 30 50 30
          L 70 30

          M 130 30
          L 150 30
          C 150 30 170 30 170 50
          L 170 70

          M 170 130
          L 170 150
          C 170 150 170 170 150 170
          L 130 170

          M 70 170
          L 50 170
          C 50 170 30 170 30 150
          L 30 130
        "
        fill="none"
        stroke={`url(#${gradientId})`}
        stroke-width="20"
      />

      <circle
        cx="100"
        cy="100"
        r="30"
        fill="none"
        stroke={`url(#${gradientId})`}
        stroke-width="20"
      />
    </svg>
  );
}