const TIME_ZONE = "America/Argentina/Buenos_Aires";

// Cuándo comenzó el período actual.
export function getCurrentPublicationPeriodStart(
  date = new Date()
): Date {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    hour12: false,
  });

  const parts = formatter.formatToParts(date);

  const values = Object.fromEntries(
    parts.map((part) => [part.type, part.value])
  );

  const year = Number(values.year);
  const month = Number(values.month);
  const day = Number(values.day);
  const hour = Number(values.hour);

  // Si todavía no son las 20:00,
  // el período comenzó ayer a las 20:00
  const periodDate = new Date(
    Date.UTC(year, month - 1, day)
  );

  if (hour < 20) {
    periodDate.setUTCDate(periodDate.getUTCDate() -1);
  }

  return new Date(
    Date.UTC(
      periodDate.getUTCFullYear(),
      periodDate.getUTCMonth(),
      periodDate.getUTCDate(),
      20,
      0,
      0
    )
  );
}

// Cuándo comienza el siguiente.
export function getNextPublicationPeriodStart(
  date = new Date()
): Date {
  const currentPeriod = getCurrentPublicationPeriodStart(date);

  const nextPeriod = new Date(currentPeriod);

  nextPeriod.setUTCDate(
    nextPeriod.getUTCDate() + 1
  );

  return nextPeriod;
}