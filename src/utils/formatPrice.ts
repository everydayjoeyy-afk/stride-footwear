/**
 * Format a numeric price for display in Ghana Cedis (GHS).
 * Does not change stored values — use only for UI display.
 */
export function formatPrice(amount: number, decimals: number = 2): string {
  const value = decimals >= 0 ? amount.toFixed(decimals) : String(amount);
  return `GHS ${value}`;
}
