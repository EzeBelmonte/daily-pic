export function formatCountdown(
  milliseconds: number
) {
  const totalSeconds = Math.floor(
    milliseconds / 1000
  );

  const hours = Math.floor(
    totalSeconds / 3600
  );

  const minutes = Math.floor(
    (totalSeconds % 3600) / 60
  );

  const seconds = totalSeconds % 60;

  return [
    hours,
    minutes,
    seconds,
  ]
    .map((value) =>
      value.toString().padStart(2, "0")
    )
    .join(":");
}