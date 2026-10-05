declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(
  name: string,
  params?: Record<string, string | number>,
): void {
  if (typeof window.gtag === 'function') {
    window.gtag('event', name, params);
  }
}

export function trackPageView(path: string): void {
  trackEvent('page_view', { page_path: path });
}
