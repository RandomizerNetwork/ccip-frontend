'use client';

import { GoogleTagManager } from '@next/third-parties/google'

export default function GoogleAnalytics() {
  return (
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTAG!} />
  );
}
