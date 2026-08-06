export function formatCompactNumber(value: number): string {
  if (value < 1000) {
    return value.toString();
  }

  if (value < 1_000_000) {
    return `${(value / 1_000).toFixed(1).replace(".0","")}K`;
  }

  if (value < 1_000_000_000) {
    return `${(value / 1_000_000).toFixed(1).replace(".0", "")}M`;
  }

  if (value < 1_000_000_000_000) {
    return `${(value / 1_000_000_000).toFixed(1).replace(".0", "")}B`;
  }

  return `${(value / 1_000_000_000_000).toFixed(1).replace(".0", "")}T`;
}