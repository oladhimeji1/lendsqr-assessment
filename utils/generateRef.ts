export function generateRef(): string {
  return "TX-" + Math.random().toString(36).substring(2, 12).toUpperCase();
}
