export * from "./TokenUtils";

export function generateGameCode(): string {
  const code = Date.now().toString(36).substr(2, 10);
  return "#"+ code.toUpperCase();
}
