
// Security headers and CSP configuration
export const setupSecurityHeaders = () => {
  // Only run in browser environment
  if (typeof window === 'undefined') return;

  // Set up Content Security Policy via meta tag if not already set
  if (!document.querySelector('meta[http-equiv="Content-Security-Policy"]')) {
    const cspMeta = document.createElement('meta');
    cspMeta.setAttribute('http-equiv', 'Content-Security-Policy');
    cspMeta.setAttribute('content', [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://apis.google.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: https: blob:",
      "connect-src 'self' https://znlmsmbtjnxtrenlrlkc.supabase.co wss://znlmsmbtjnxtrenlrlkc.supabase.co",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'"
    ].join('; '));
    document.head.appendChild(cspMeta);
  }

  // Set up other security meta tags
  const securityMetas = [
    { name: 'referrer', content: 'strict-origin-when-cross-origin' },
    { name: 'robots', content: 'noindex, nofollow' }, // Adjust based on your needs
    { 'http-equiv': 'X-Content-Type-Options', content: 'nosniff' },
    { 'http-equiv': 'X-Frame-Options', content: 'DENY' },
    { 'http-equiv': 'X-XSS-Protection', content: '1; mode=block' }
  ];

  securityMetas.forEach(meta => {
    const key = meta.name ? 'name' : 'http-equiv';
    const value = meta.name || meta['http-equiv'];
    
    if (!document.querySelector(`meta[${key}="${value}"]`)) {
      const metaTag = document.createElement('meta');
      metaTag.setAttribute(key, value!);
      metaTag.setAttribute('content', meta.content);
      document.head.appendChild(metaTag);
    }
  });
};

// Initialize security headers
setupSecurityHeaders();
