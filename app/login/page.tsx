'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { FormEvent, Suspense, useState } from 'react';
import {
  BG_CARD,
  BORDER,
  BRAND_DARK,
  BRAND_PRIMARY,
  BG_PAGE,
  TEXT_SECONDARY,
} from '@/lib/dashboard/theme';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = searchParams.get('next') || '/dashboard';

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, password }),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        setError(data.error ?? 'Invalid credentials');
        return;
      }

      router.push(nextPath.startsWith('/') ? nextPath : '/dashboard');
      router.refresh();
    } catch {
      setError('Unable to sign in. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="flex min-h-screen items-center justify-center px-4"
      style={{ background: BG_PAGE }}
    >
      <div
        className="w-full max-w-md rounded-2xl border p-8 shadow-sm"
        style={{ background: BG_CARD, borderColor: BORDER }}
      >
        <div className="mb-6 text-center">
          <img
            src="https://vendor.ambercompliancesystem.com/assets/amber-logo-BvJV0paR.png"
            alt="Amber"
            className="mx-auto mb-4 h-12 w-auto object-contain"
          />
          <h1 className="text-xl font-semibold" style={{ color: BRAND_DARK }}>
            Supplier Satisfaction Dashboard
          </h1>
          <p className="mt-2 text-sm" style={{ color: TEXT_SECONDARY }}>
            Sign in to view the analytics dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="id"
              className="mb-1 block text-xs font-semibold uppercase tracking-wide"
              style={{ color: TEXT_SECONDARY }}
            >
              ID
            </label>
            <input
              id="id"
              type="text"
              autoComplete="username"
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-[#4F81BD]"
              style={{ borderColor: BORDER, color: BRAND_DARK }}
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-xs font-semibold uppercase tracking-wide"
              style={{ color: TEXT_SECONDARY }}
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-[#4F81BD]"
              style={{ borderColor: BORDER, color: BRAND_DARK }}
              required
            />
          </div>

          {error && (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition-opacity disabled:opacity-60"
            style={{ background: BRAND_PRIMARY }}
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center" style={{ background: BG_PAGE }}>
          <p className="text-sm" style={{ color: TEXT_SECONDARY }}>
            Loading...
          </p>
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
