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
const IST_OFFSET_MS = 5.5 * 60 * 60 * 1000; // 5:30 hours in milliseconds

export type DateInput = string | Date | null | undefined;

// ─── IST → UTC boundary helpers (for DB queries) ─────────────────────────────
//
// Use these when the caller provides a date that represents an IST calendar
// day and you need exact UTC timestamps to BETWEEN-query a UTC database.
//
// All three accept any DateInput format:
//   "2026-06-01"             YYYY-MM-DD
//   "1 Jun 2026"             human-readable
//   "2026-06-01T18:30:00Z"   ISO timestamp
//   Date object
//
// Examples (IST = UTC+5:30):
//   toUtcStartOfDay("2026-06-01")
//     → 2026-05-31T18:30:00.000Z  (Jun 1 00:00 IST)
//   toUtcEndOfDay("2026-06-07")
//     → 2026-06-07T18:29:59.999Z  (Jun 7 23:59:59.999 IST)

export interface ParsedDateRange {
  startDate: Date;
  endDate: Date;
}

export interface IsoDateRange {
  startDate: string; // ISO string with IST offset, e.g., "2026-06-08T00:00:00+05:30"
  endDate: string; // ISO string with IST offset, e.g., "2026-06-14T23:59:59+05:30"
}

/**
 * Converts any date input (interpreted as an IST calendar date) to
 * the UTC instant of IST midnight (00:00:00.000 IST) for that day.
 * Use as the lower bound of a DB date-range query.
 */
export function toUtcStartOfDay(input: DateInput): Date {
  const { year, month, day } = extractIstDateParts(input);
  // IST 00:00:00.000 → UTC: subtract 5 h 30 m
  return new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0) - IST_OFFSET_MS);
}

/**
 * Converts any date input (interpreted as an IST calendar date) to
 * the UTC instant of IST end-of-day (23:59:59.999 IST) for that day.
 * Use as the upper bound of a DB date-range query.
 */
export function toUtcEndOfDay(input: DateInput): Date {
  const { year, month, day } = extractIstDateParts(input);
  // IST 23:59:59.999 → UTC: subtract 5 h 30 m
  return new Date(
    Date.UTC(year, month - 1, day, 23, 59, 59, 999) - IST_OFFSET_MS,
  );
}

/**
 * Convenience wrapper — returns UTC start-of-day for startInput and
 * UTC end-of-day for endInput in one call.
 *
 * Usage:
 *   const { startDate, endDate } = parseDateRangeToUtc(startDate, endDate);
 *   // use startDate / endDate directly in TypeORM BETWEEN queries
 */
export function parseDateRangeToUtc(
  startInput: DateInput,
  endInput: DateInput,
): ParsedDateRange {
  return {
    startDate: toUtcStartOfDay(startInput),
    endDate: toUtcEndOfDay(endInput),
  };
}

/**
 * Returns the current IST week (Monday–Sunday) as ISO strings with IST timezone offset.
 * UI can send these directly to the backend, which will convert to UTC for DB queries.
 *
 * Example output (when called on Monday Jun 8, 2026):
 *   {
 *     startDate: "2026-06-08T00:00:00+05:30",  // Mon 00:00 IST
 *     endDate: "2026-06-14T23:59:59+05:30"    // Sun 23:59 IST
 *   }
 */
export function getCurrentIstWeekRange(): IsoDateRange {
  const now = new Date();

  // IST day-of-week (1=Mon … 7=Sun)
  // Get UTC day, add IST offset, then normalize to 1-7 (Mon-Sun)
  const utcDay = now.getUTCDay();
  const istDay =
    (utcDay + Math.floor(IST_OFFSET_MS / (1000 * 60 * 60) + 24)) % 7;
  const istWeekday = istDay === 0 ? 7 : istDay; // Convert 0=Sun to 7, 1=Mon stays 1
  const daysFromMonday = istWeekday === 7 ? 6 : istWeekday - 1;

  // IST calendar date parts for today
  const istParts = new Intl.DateTimeFormat("en-CA", {
    timeZone: IST,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const year = parseInt(
    istParts.find((p) => p.type === "year")?.value ?? "0",
    10,
  );
  const month = parseInt(
    istParts.find((p) => p.type === "month")?.value ?? "0",
    10,
  );
  const day = parseInt(
    istParts.find((p) => p.type === "day")?.value ?? "0",
    10,
  );

  // IST Monday (00:00:00)
  const istMonday = new Date(
    Date.UTC(year, month - 1, day, 0, 0, 0) - IST_OFFSET_MS,
  );
  istMonday.setDate(istMonday.getDate() - daysFromMonday);

  // IST Sunday (23:59:59)
  const istSunday = new Date(istMonday);
  istSunday.setDate(istMonday.getDate() + 6);
  istSunday.setUTCHours(23, 59, 59, 999);

  // Format as ISO strings with IST offset (+05:30)
  const formatIstIso = (date: Date): string => {
    const offset = "+05:30";
    const yyyy = date.getUTCFullYear();
    const mm = String(date.getUTCMonth() + 1).padStart(2, "0");
    const dd = String(date.getUTCDate()).padStart(2, "0");
    const hh = String(date.getUTCHours()).padStart(2, "0");
    const mi = String(date.getUTCMinutes()).padStart(2, "0");
    const ss = String(date.getUTCSeconds()).padStart(2, "0");
    const ms = String(date.getUTCMilliseconds()).padStart(3, "0");
    return `${yyyy}-${mm}-${dd}T${hh}:${mi}:${ss}.${ms}${offset}`;
  };

  return {
    startDate: formatIstIso(istMonday),
    endDate: formatIstIso(istSunday),
  };
}

/**
 * Returns the current IST month (1st–last day) as ISO strings with IST timezone offset.
 * UI can send these directly to the backend, which will convert to UTC for DB queries.
 *
 * Example output (when called on Jun 8, 2026):
 *   {
 *     startDate: "2026-06-01T00:00:00+05:30",  // Jun 1 00:00 IST
 *     endDate: "2026-06-30T23:59:59+05:30"    // Jun 30 23:59 IST
 *   }
 */
export function getCurrentIstMonthRange(): IsoDateRange {
  const now = new Date();

  // IST calendar date parts for today
  const istParts = new Intl.DateTimeFormat("en-CA", {
    timeZone: IST,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const year = parseInt(
    istParts.find((p) => p.type === "year")?.value ?? "0",
    10,
  );
  const month = parseInt(
    istParts.find((p) => p.type === "month")?.value ?? "0",
    10,
  );

  // IST 1st of month (00:00:00)
  const istMonthStart = new Date(
    Date.UTC(year, month - 1, 1, 0, 0, 0) - IST_OFFSET_MS,
  );

  // IST last day of month (23:59:59)
  const istMonthEnd = new Date(
    Date.UTC(year, month, 0, 23, 59, 59, 999) - IST_OFFSET_MS,
  );

  // Format as ISO strings with IST offset (+05:30)
  const formatIstIso = (date: Date): string => {
    const offset = "+05:30";
    const yyyy = date.getUTCFullYear();
    const mm = String(date.getUTCMonth() + 1).padStart(2, "0");
    const dd = String(date.getUTCDate()).padStart(2, "0");
    const hh = String(date.getUTCHours()).padStart(2, "0");
    const mi = String(date.getUTCMinutes()).padStart(2, "0");
    const ss = String(date.getUTCSeconds()).padStart(2, "0");
    const ms = String(date.getUTCMilliseconds()).padStart(3, "0");
    return `${yyyy}-${mm}-${dd}T${hh}:${mi}:${ss}.${ms}${offset}`;
  };

  return {
    startDate: formatIstIso(istMonthStart),
    endDate: formatIstIso(istMonthEnd),
  };
}

/**
 * Extracts the IST calendar date parts (year, month, day) from any DateInput.
 * Uses Intl to project the UTC instant into Asia/Kolkata timezone.
 */
function extractIstDateParts(input: DateInput): {
  year: number;
  month: number;
  day: number;
} {
  const d = toDate(input);
  if (!d) throw new Error(`Cannot parse date: ${String(input)}`);

  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: IST,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(d);

  const year = parseInt(parts.find((p) => p.type === "year")?.value ?? "0", 10);
  const month = parseInt(
    parts.find((p) => p.type === "month")?.value ?? "0",
    10,
  );
  const day = parseInt(parts.find((p) => p.type === "day")?.value ?? "0", 10);

  return { year, month, day };
}

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
