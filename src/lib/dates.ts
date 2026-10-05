const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** "2025-09" -> 2025.67 (fractional year, month start) */
export function toYear(ym: string): number {
  const [y, m] = ym.split('-').map(Number);
  return y + (m - 1) / 12;
}

/** "2025-09" -> "Sep 2025" */
export function monthYear(ym: string): string {
  const [y, m] = ym.split('-').map(Number);
  return `${MONTHS[m - 1]} ${y}`;
}

/** "2025-09" -> "2025.09" */
export function dotted(ym: string): string {
  return ym.replace('-', '.');
}

export function range(start: string, end?: string, display?: string): string {
  if (display) return display;
  return `${monthYear(start)} – ${end ? monthYear(end) : 'now'}`;
}
