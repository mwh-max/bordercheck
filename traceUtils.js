// traceUtils.js
export const traceZone = (score) => {
  if (score === 5) return "Transparent Use";
  if (score >= 3) return "Consent Optional";
  if (score >= 1) return "Active Surveillance";
  return "Opaque Trace";
};

export const traceHeatIcon = (score) => {
  if (score === 5) return "🟢";
  if (score >= 3) return "🟡";
  if (score >= 1) return "🟠";
  return "🟥";
};
