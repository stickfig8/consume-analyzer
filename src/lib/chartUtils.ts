export function getEmotionColor(score: number) {
  if (score < 30) return "var(--emotion-low)";
  if (score < 60) return "var(--emotion-mid)";
  return "var(--emotion-high)";
}

export function getEmotionClass(score: number) {
  if (score < 30) return "radial-low";
  if (score < 60) return "radial-midlow";
  if (score < 80) return "radial-midhigh";
  return "radial-high";
}
