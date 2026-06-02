import { NextRequest, NextResponse } from 'next/server';
import {
  createSessionToken,
  getSessionCookieName,
  getSessionCookieOptions,
} from '@/lib/auth/dashboard-session';
import { validateDashboardCredentials } from '@/lib/auth/validate-credentials';

export async function POST(request: NextRequest) {
  let body: { id?: string; password?: string };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const id = body.id?.trim() ?? '';
  const password = body.password ?? '';

  if (!id || !password) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  if (!validateDashboardCredentials(id, password)) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const token = await createSessionToken();
  if (!token) {
    return NextResponse.json(
      { error: 'Server auth is not configured' },
      { status: 500 }
    );
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(getSessionCookieName(), token, getSessionCookieOptions());
  return response;
}
