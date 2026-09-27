export function calculateSizing(students, concurrency, maxSessions, safetyBuffer) {
  const s = parseInt(students) || 50;
  const c = parseInt(concurrency) || 70;
  const m = parseInt(maxSessions) || 10;
  const b = parseInt(safetyBuffer) || 20;

  const expectedUsers = Math.ceil(s * (c / 100));
  const baselineHosts = Math.ceil(expectedUsers / m);
  const recommendedHosts = Math.ceil(baselineHosts * (1 + (b / 100)));
  const totalSeats = recommendedHosts * m;

  return {
    students: s,
    concurrency: c,
    maxSessions: m,
    safetyBuffer: b,
    expectedUsers,
    baseHosts: baselineHosts,
    recommendedHosts,
    totalSeats
  };
}
