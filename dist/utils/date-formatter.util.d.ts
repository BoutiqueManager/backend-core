export type DateInput = string | Date | null | undefined;
/**
 * "10 May 2026"
 * Standard date — order dates, delivery dates, cancellation dates.
 */
export declare function formatDate(input: DateInput): string;
/**
 * "10 May, 2026"
 * Date with comma before year — invoice headers, formal displays.
 */
export declare function formatDateDDMMMYYYY(input: DateInput): string;
/**
 * "Sat, 10 May 2026"
 * Date with short weekday — order confirmation, delivery screens.
 */
export declare function formatDateWithDay(input: DateInput): string;
/**
 * "10/05/2026"
 * DD/MM/YYYY with forward slash — compact tables, labels.
 */
export declare function formatDateDDMMYYYY(input: DateInput): string;
/**
 * "10-05-2026"
 * DD-MM-YYYY with dashes — export files, download filenames, text fields.
 */
export declare function formatDateDDMMYYYYDash(input: DateInput): string;
/**
 * "10th May 2026"
 * Ordinal day, full month, full year — delivery estimates, "Placed on" labels.
 */
export declare function formatDateOrdinal(input: DateInput): string;
/**
 * "21st Dec, 2026"
 * Ordinal day, short month, comma + year — "Expected by" labels, notifications.
 */
export declare function formatDateOrdinalShortMonth(input: DateInput): string;
/**
 * "10th May"
 * Ordinal day, no year — compact delivery badges, inline labels.
 */
export declare function formatDateOrdinalShort(input: DateInput): string;
/**
 * "10 May"
 * Short date, no year — compact badges, filter chips, chat timestamps.
 */
export declare function formatShortDate(input: DateInput): string;
/**
 * "May 2026"
 * Month + year — section grouping headers, statement periods.
 */
export declare function formatMonthYear(input: DateInput): string;
/**
 * Safe formatter for PostgreSQL DATE columns (e.g. estimatedDeliveryDate).
 * The pg driver returns DATE as a plain "YYYY-MM-DD" string with no time or TZ.
 * Parsing it directly as midnight UTC rolls the date back by 5:30 h in IST.
 * This function anchors the date at noon UTC to avoid that drift.
 *
 * Output: "10 May 2026"
 */
export declare function formatDateOnly(input: string | null | undefined): string;
/**
 * "10 May 2026, 2:30 PM"
 * Standard datetime — order placed, payment confirmed, cancelled, returned.
 */
export declare function formatDateTime(input: DateInput): string;
/**
 * "Sat, 10 May 2026 at 2:30 PM"
 * Full datetime with weekday — order detail header, timeline events.
 */
export declare function formatDateTimeWithDay(input: DateInput): string;
/**
 * "10/05/2026, 02:30 PM"
 * DD/MM/YYYY with time — order list rows, payment attempt history.
 */
export declare function formatDateTimeDDMMYYYY(input: DateInput): string;
/**
 * "March 25, 2026 at 10:00 AM"
 * Campaign / event style — campaign cards, promo banners.
 */
export declare function formatCampaignDate(input: DateInput): string;
/**
 * "2:30 PM"
 * Time only — timeline event time column, chat bubbles.
 */
export declare function formatTimeOnly(input: DateInput): string;
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
export declare function formatRelativeTime(input: DateInput): string;
