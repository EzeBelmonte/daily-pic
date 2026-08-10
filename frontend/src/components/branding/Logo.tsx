import CameraIcon from "./CameraIcon";

type Props = {
  className?: string;
  iconClassName?: string;
  textClassName?: string;
};

export default function Logo({
  className,
  iconClassName,
  textClassName,
}: Props) {
  return (
    <div className={`flex items-center ${className ?? ""}`}>
      <CameraIcon className={iconClassName} />

      <span
        className={`font-[Outfit] font-bold ${textClassName ?? ""}`}
      >
        daily pic
      </span>
    </div>
  );
}