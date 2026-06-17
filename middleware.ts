import { next } from '@vercel/edge';

export const config = {
  matcher: '/(.*)',
};

const CSP = [
  "default-src 'self'",
  "script-src 'self' https://js.stripe.com https://va.vercel-scripts.com https://vercel.live",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https://*.stripe.com",
  "font-src 'self'",
  "connect-src 'self' https://api.stripe.com https://m.stripe.network https://q.stripe.com https://vitals.vercel-insights.com https://vercel.live",
  "frame-src 'self' https://js.stripe.com https://hooks.stripe.com https://m.stripe.network https://b.stripecdn.com https://newassets.hcaptcha.com",
  "worker-src 'self' blob:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join('; ');

export default function middleware() {
  const response = next();

  // VERCEL_ENV is 'production' | 'preview' | 'development' (the last one = `vercel dev` locally).
  // Skip security headers locally so HMR and dev-time experimentation aren't constrained.
  const isPublicDeployment =
    process.env.VERCEL_ENV === 'production' || process.env.VERCEL_ENV === 'preview';

  if (!isPublicDeployment) {
    return response;
  }

  response.headers.set('Content-Security-Policy', CSP);
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), payment=(self "https://js.stripe.com")',
  );

  return response;
}
