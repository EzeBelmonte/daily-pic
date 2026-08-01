import { useId } from "react";

type Props = {
  width?: number;

  iconScale?: number;
  iconX?: number;
  iconY?: number;
  centered?: boolean;

  textScale?: number;
  textX?: number;
  textY?: number;
}

export default function Logo({
  width = 715,

  iconScale = 1,
  iconX = 0,
  iconY = 0,
  centered = false,

  textScale = 1,
  textX = 0,
  textY = 0,
}: Props) {
  const gradientId = useId();

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={undefined}
      viewBox="0 0 800 256"
      fill="none"
      style={{
        display: centered ? "block" : "inline-block",
        margin: centered ? "0 auto" : undefined,
      }}
    >
      <defs>
        <linearGradient
          id={gradientId}
          gradientTransform="rotate(45)"
        >
          <stop offset="40%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#06B6D4" />
        </linearGradient>
      </defs>

      <g transform={`translate(${iconX}, ${iconY}) scale(${iconScale})`}>
        {/* Rounded square */}
        <rect
          x="28"
          y="28"
          width="200"
          height="200"
          rx="48"
          stroke={`url(#${gradientId})`}
          strokeWidth="12"
          fill="none"
        />

        {/* Camera body */}
        <path
          d="M88 92
            H108
            C112 92 116 90 118 86
            L122 80
            C124 76 128 74 132 74
            H156
            C162 74 166 77 169 82
            L172 86
            C174 90 178 92 182 92
            H184
            C196 92 204 100 204 112
            V164
            C204 176 196 184 184 184
            H72
            C60 184 52 176 52 164
            V112
            C52 100 60 92 72 92
            H88"
          stroke={`url(#${gradientId})`}
          strokeWidth="10"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Lens */}
        <circle
          cx="128"
          cy="138"
          r="34"
          stroke={`url(#${gradientId})`}
          strokeWidth="10"
          fill="none"
        />

        {/* Small dot */}
        <circle
          cx="176"
          cy="112"
          r="6"
          fill="currentColor"
        />
      </g>

      <g transform={`translate(${textX}, ${textY}) scale(${textScale})`}>
        {/* Texto */}
        <text
          x="440"
          y="158"
          fontSize="100"
          fontWeight="700"
          letterSpacing="6"
          textAnchor="middle"
          fontFamily="Outfit, sans-serif"
          fill="#fdfdfd"
        >
          daily pic
        </text>
      </g>
    </svg>
  );
}