'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { BRAND_DARK, BRAND_PRIMARY } from '@/lib/dashboard/theme';

export function DashboardSignOut() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSignOut() {
    setLoading(true);
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/login');
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
  type="button"
  onClick={handleSignOut}
  disabled={loading}
  className="rounded-full border px-4 py-2 text-sm font-bold transition-opacity disabled:opacity-60"
  style={{
    borderColor: BRAND_PRIMARY,
    color: BRAND_DARK,
    background: 'rgba(255,255,255,0.85)',
  }}
>
  {loading ? 'Signing out...' : 'Sign out'}
</button>
  );
}
