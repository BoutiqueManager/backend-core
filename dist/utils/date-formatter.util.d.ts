export type DateInput = string | Date | null | undefined;
export interface ParsedDateRange {
    startDate: Date;
    endDate: Date;
}
export interface IsoDateRange {
    startDate: string;
    endDate: string;
}
export interface DateOnlyRange {
    startDate: string;
    endDate: string;
}
/**
 * Converts any date input (interpreted as an IST calendar date) to
 * the UTC instant of IST midnight (00:00:00.000 IST) for that day.
 * Use as the lower bound of a DB date-range query.
 */
export declare function toUtcStartOfDay(input: DateInput): Date;
/**
 * Converts any date input (interpreted as an IST calendar date) to
 * the UTC instant of IST end-of-day (23:59:59.999 IST) for that day.
 * Use as the upper bound of a DB date-range query.
 */
export declare function toUtcEndOfDay(input: DateInput): Date;
/**
 * Convenience wrapper — returns UTC start-of-day for startInput and
 * UTC end-of-day for endInput in one call.
 *
 * Usage:
 *   const { startDate, endDate } = parseDateRangeToUtc(startDate, endDate);
 *   // use startDate / endDate directly in TypeORM BETWEEN queries
 */
export declare function parseDateRangeToUtc(startInput: DateInput, endInput: DateInput): ParsedDateRange;
/**
 * Returns the current IST week (Monday–Sunday) as date-only strings (YYYY-MM-DD).
 * Backend interprets these as IST calendar dates and converts to UTC for DB queries.
 *
 * Example output (when called on Monday Jun 8, 2026):
 *   {
 *     startDate: "2026-06-08",  // Mon
 *     endDate: "2026-06-14"    // Sun
 *   }
 */
export declare function getCurrentIstWeekRange(): DateOnlyRange;
/**
 * Returns the current IST month (1st–last day) as date-only strings (YYYY-MM-DD).
 * Backend interprets these as IST calendar dates and converts to UTC for DB queries.
 *
 * Example output (when called on Jun 8, 2026):
 *   {
 *     startDate: "2026-06-01",  // Jun 1
 *     endDate: "2026-06-30"    // Jun 30
 *   }
 */
export declare function getCurrentIstMonthRange(): DateOnlyRange;
/**
 * Returns the current IST week (Monday–Sunday) as UTC ISO strings.
 * Send these directly as API query params — the backend parses them
 * straight into Date objects with no IST→UTC conversion needed.
 *
 * Example (called on Jun 7, 2026 IST):
 *   { startDate: "2026-06-01T18:30:00.000Z",   // Mon Jun 2 00:00:00 IST
 *     endDate:   "2026-06-08T18:29:59.999Z" }   // Sun Jun 8 23:59:59.999 IST
 */
export declare function getCurrentIstWeekRangeUtc(): {
    startDate: string;
    endDate: string;
};
/**
 * Returns the current IST month (1st–last day) as UTC ISO strings.
 * Send these directly as API query params — the backend parses them
 * straight into Date objects with no IST→UTC conversion needed.
 *
 * Example (called in Jun 2026):
 *   { startDate: "2026-05-31T18:30:00.000Z",   // Jun 1 00:00:00 IST
 *     endDate:   "2026-06-30T18:29:59.999Z" }   // Jun 30 23:59:59.999 IST
 */
export declare function getCurrentIstMonthRangeUtc(): {
    startDate: string;
    endDate: string;
};
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
