// ─── IST Date Formatter ───────────────────────────────────────────────────────
//
// Single source of truth for all date/time formatting across the platform.
//
// Assumptions:
//   - All timestamps from the DB are UTC (Railway PostgreSQL session TZ = UTC).
//   - PostgreSQL returns timestamps as "2026-05-10 08:05:04.595478" (space,
//     no TZ, microseconds). The normalizer below handles this variant
//     alongside standard ISO-8601 strings and JS Date objects.
//   - Display timezone: Asia/Kolkata (IST, UTC+5:30).
//
// ─────────────────────────────────────────────────────────────────────────────

const IST = "Asia/Kolkata";

export type DateInput = string | Date | null | undefined;

// ─── Input normalizer ─────────────────────────────────────────────────────────

/**
 * Converts any supported date input into a JS Date (UTC).
 *
 * Handled variants:
 *   "2026-05-10 08:05:04.595478"   PostgreSQL TIMESTAMP (space, microseconds)
 *   "2026-05-10T08:05:04.595Z"     ISO-8601 with Z
 *   "2026-05-10T08:05:04+05:30"    ISO-8601 with offset
 *   "2026-05-10"                   Date-only (treated as noon UTC — see formatDateOnly)
 *   Date                           JS Date object
 */
function toDate(input: DateInput): Date | null {
  if (input == null) return null;
  if (input instanceof Date) return isNaN(input.getTime()) ? null : input;

  let s = (input as string).trim();
  if (!s) return null;

  // Replace PostgreSQL space separator with T
  s = s.replace(/^(\d{4}-\d{2}-\d{2}) (\d{2}:\d{2}:\d{2})/, "$1T$2");

  // Truncate sub-millisecond precision (PostgreSQL microseconds → 3 digits)
  s = s.replace(/(\.\d{3})\d+/, "$1");

  // If datetime has no timezone suffix, treat as UTC
  if (
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(s) &&
    !s.endsWith("Z") &&
    !/[+-]\d{2}:?\d{2}$/.test(s)
  ) {
    s += "Z";
  }

  const d = new Date(s);
  return isNaN(d.getTime()) ? null : d;
}

function ordinalDay(day: number): string {
  if (day >= 11 && day <= 13) return `${day}th`;
  switch (day % 10) {
    case 1:
      return `${day}st`;
    case 2:
      return `${day}nd`;
    case 3:
      return `${day}rd`;
    default:
      return `${day}th`;
  }
}

// ─── Date-only formats ────────────────────────────────────────────────────────

/**
 * "10 May 2026"
 * Standard date — order dates, delivery dates, cancellation dates.
 */
export function formatDate(input: DateInput): string {
  const d = toDate(input);
  if (!d) return "";
  return d.toLocaleDateString("en-IN", {
    timeZone: IST,
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/**
 * "10 May, 2026"
 * Date with comma before year — invoice headers, formal displays.
 */
export function formatDateDDMMMYYYY(input: DateInput): string {
  const d = toDate(input);
  if (!d) return "";
  const parts = new Intl.DateTimeFormat("en-IN", {
    timeZone: IST,
    day: "numeric",
    month: "short",
    year: "numeric",
  }).formatToParts(d);
  const day = parts.find((p) => p.type === "day")?.value ?? "";
  const month = parts.find((p) => p.type === "month")?.value ?? "";
  const year = parts.find((p) => p.type === "year")?.value ?? "";
  return `${day} ${month}, ${year}`;
}

/**
 * "Sat, 10 May 2026"
 * Date with short weekday — order confirmation, delivery screens.
 */
export function formatDateWithDay(input: DateInput): string {
  const d = toDate(input);
  if (!d) return "";
  return d.toLocaleDateString("en-IN", {
    timeZone: IST,
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/**
 * "10/05/2026"
 * DD/MM/YYYY with forward slash — compact tables, labels.
 */
export function formatDateDDMMYYYY(input: DateInput): string {
  const d = toDate(input);
  if (!d) return "";
  return d.toLocaleDateString("en-GB", {
    timeZone: IST,
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

/**
 * "10-05-2026"
 * DD-MM-YYYY with dashes — export files, download filenames, text fields.
 */
export function formatDateDDMMYYYYDash(input: DateInput): string {
  const d = toDate(input);
  if (!d) return "";
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: IST,
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).formatToParts(d);
  const day = parts.find((p) => p.type === "day")?.value ?? "";
  const month = parts.find((p) => p.type === "month")?.value ?? "";
  const year = parts.find((p) => p.type === "year")?.value ?? "";
  return `${day}-${month}-${year}`;
}

/**
 * "10th May 2026"
 * Ordinal day, full month, full year — delivery estimates, "Placed on" labels.
 */
export function formatDateOrdinal(input: DateInput): string {
  const d = toDate(input);
  if (!d) return "";
  const parts = new Intl.DateTimeFormat("en-IN", {
    timeZone: IST,
    day: "numeric",
    month: "long",
    year: "numeric",
  }).formatToParts(d);
  const day = parseInt(parts.find((p) => p.type === "day")?.value ?? "0", 10);
  const month = parts.find((p) => p.type === "month")?.value ?? "";
  const year = parts.find((p) => p.type === "year")?.value ?? "";
  return `${ordinalDay(day)} ${month} ${year}`;
}

/**
 * "21st Dec, 2026"
 * Ordinal day, short month, comma + year — "Expected by" labels, notifications.
 */
export function formatDateOrdinalShortMonth(input: DateInput): string {
  const d = toDate(input);
  if (!d) return "";
  const parts = new Intl.DateTimeFormat("en-IN", {
    timeZone: IST,
    day: "numeric",
    month: "short",
    year: "numeric",
  }).formatToParts(d);
  const day = parseInt(parts.find((p) => p.type === "day")?.value ?? "0", 10);
  const month = parts.find((p) => p.type === "month")?.value ?? "";
  const year = parts.find((p) => p.type === "year")?.value ?? "";
  return `${ordinalDay(day)} ${month}, ${year}`;
}

/**
 * "10th May"
 * Ordinal day, no year — compact delivery badges, inline labels.
 */
export function formatDateOrdinalShort(input: DateInput): string {
  const d = toDate(input);
  if (!d) return "";
  const parts = new Intl.DateTimeFormat("en-IN", {
    timeZone: IST,
    day: "numeric",
    month: "long",
  }).formatToParts(d);
  const day = parseInt(parts.find((p) => p.type === "day")?.value ?? "0", 10);
  const month = parts.find((p) => p.type === "month")?.value ?? "";
  return `${ordinalDay(day)} ${month}`;
}

/**
 * "10 May"
 * Short date, no year — compact badges, filter chips, chat timestamps.
 */
export function formatShortDate(input: DateInput): string {
  const d = toDate(input);
  if (!d) return "";
  return d.toLocaleDateString("en-IN", {
    timeZone: IST,
    day: "numeric",
    month: "short",
  });
}

/**
 * "May 2026"
 * Month + year — section grouping headers, statement periods.
 */
export function formatMonthYear(input: DateInput): string {
  const d = toDate(input);
  if (!d) return "";
  return d.toLocaleDateString("en-IN", {
    timeZone: IST,
    month: "long",
    year: "numeric",
  });
}

/**
 * Safe formatter for PostgreSQL DATE columns (e.g. estimatedDeliveryDate).
 * The pg driver returns DATE as a plain "YYYY-MM-DD" string with no time or TZ.
 * Parsing it directly as midnight UTC rolls the date back by 5:30 h in IST.
 * This function anchors the date at noon UTC to avoid that drift.
 *
 * Output: "10 May 2026"
 */
export function formatDateOnly(input: string | null | undefined): string {
  if (!input) return "";
  const dateStr = String(input).slice(0, 10);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return formatDate(input);
  return formatDate(new Date(`${dateStr}T12:00:00.000Z`));
}

// ─── DateTime formats ─────────────────────────────────────────────────────────

/**
 * "10 May 2026, 2:30 PM"
 * Standard datetime — order placed, payment confirmed, cancelled, returned.
 */
export function formatDateTime(input: DateInput): string {
  const d = toDate(input);
  if (!d) return "";
  return d.toLocaleString("en-IN", {
    timeZone: IST,
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

/**
 * "Sat, 10 May 2026 at 2:30 PM"
 * Full datetime with weekday — order detail header, timeline events.
 */
export function formatDateTimeWithDay(input: DateInput): string {
  const d = toDate(input);
  if (!d) return "";
  const datePart = d.toLocaleDateString("en-IN", {
    timeZone: IST,
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  const timePart = d.toLocaleTimeString("en-IN", {
    timeZone: IST,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  return `${datePart} at ${timePart}`;
}

/**
 * "10/05/2026, 02:30 PM"
 * DD/MM/YYYY with time — order list rows, payment attempt history.
 */
export function formatDateTimeDDMMYYYY(input: DateInput): string {
  const d = toDate(input);
  if (!d) return "";
  const datePart = d.toLocaleDateString("en-GB", {
    timeZone: IST,
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const timePart = d.toLocaleTimeString("en-IN", {
    timeZone: IST,
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  return `${datePart}, ${timePart}`;
}

/**
 * "March 25, 2026 at 10:00 AM"
 * Campaign / event style — campaign cards, promo banners.
 */
export function formatCampaignDate(input: DateInput): string {
  const d = toDate(input);
  if (!d) return "";
  const datePart = d.toLocaleDateString("en-US", {
    timeZone: IST,
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const timePart = d.toLocaleTimeString("en-US", {
    timeZone: IST,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  return `${datePart} at ${timePart}`;
}

// ─── Time-only ────────────────────────────────────────────────────────────────

/**
 * "2:30 PM"
 * Time only — timeline event time column, chat bubbles.
 */
export function formatTimeOnly(input: DateInput): string {
  const d = toDate(input);
  if (!d) return "";
  return d.toLocaleTimeString("en-IN", {
    timeZone: IST,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

// ─── Relative time ────────────────────────────────────────────────────────────

/**
 * Human-friendly elapsed / remaining time from now (computed in UTC — correct).
 *
 * - "just now"      < 60 s
 * - "5 min ago"     < 1 hr,  past
 * - "in 5 min"      < 1 hr,  future
 * - "3 hr ago"      < 24 hr, past
 * - "in 3 hr"       < 24 hr, future
 * - "2 days ago"    < 7 d,   past
 * - "in 2 days"     < 7 d,   future
 * - falls back to formatDate for anything beyond ±7 days
 */
export function formatRelativeTime(input: DateInput): string {
  const d = toDate(input);
  if (!d) return "";
  const diffMs = d.getTime() - Date.now();
  const past = diffMs < 0;
  const abs = Math.abs(diffMs);
  const sec = Math.round(abs / 1_000);
  const min = Math.round(abs / 60_000);
  const hr = Math.round(abs / 3_600_000);
  const day = Math.round(abs / 86_400_000);
  if (sec < 60) return "just now";
  if (min < 60) return past ? `${min} min ago` : `in ${min} min`;
  if (hr < 24) return past ? `${hr} hr ago` : `in ${hr} hr`;
  if (day < 7) return past ? `${day} days ago` : `in ${day} days`;
  return formatDate(d);
}
