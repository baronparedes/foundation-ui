export function generateNumberedSeries(n: number): number[] {
  return Array(n)
    .fill(0)
    .map((_, i) => i + 1);
}

export function sum(numbers: number[] | undefined) {
  if (!numbers || numbers.length === 0) return 0;
  return numbers.reduce((p, c) => Number(p) + Number(c));
}
