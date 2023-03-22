export function truncate(text: string, n: number): string {
  return text.length > n ? text.slice(0, n - 1) + "..." : text;
}
