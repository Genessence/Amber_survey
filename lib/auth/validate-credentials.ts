import { timingSafeEqual } from 'crypto';

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

export function validateDashboardCredentials(id: string, password: string): boolean {
  const expectedId = process.env.DASHBOARD_ID ?? '';
  const expectedPassword = process.env.DASHBOARD_PASSWORD ?? '';
  if (!expectedId || !expectedPassword) return false;
  return safeEqual(id, expectedId) && safeEqual(password, expectedPassword);
}
