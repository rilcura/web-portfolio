export const counterSite = 'https://rilcura-portfolio.goatcounter.com';
export const visitPath = '/web-portfolio/';
export const contactPaths = ['contact-email', 'contact-linkedin', 'contact-github'] as const;

// Fixed identifiers only: no URL query, referrer, screen size or contact details.
export function eventUrl(path: string, event = false): string {
  const query = new URLSearchParams({ p: path, t: event ? 'Contact link click' : 'Builder Island', ns: 'true' });
  if (event) query.set('e', 'true');
  return `${counterSite}/count?${query}`;
}

export function parseCount(data: unknown): number {
  const text = (data as {count?: unknown} | null)?.count;
  if (typeof text !== 'string' || !/^(?:\d{1,3}(?:,\d{3})*|\d+)$/.test(text)) throw new Error('Invalid count');
  const value = Number(text.replaceAll(',', ''));
  if (!Number.isSafeInteger(value)) throw new Error('Invalid count');
  return value;
}

export async function readCount(path: string, missingIsZero = false): Promise<number> {
  const response = await fetch(`${counterSite}/counter/${encodeURIComponent(path)}.json`, {
    credentials: 'omit', referrerPolicy: 'no-referrer', cache: 'no-store', signal: AbortSignal.timeout(6000),
  });
  // Event paths do not exist until the first click. Other failures remain unknown.
  if (missingIsZero && response.status === 404) return 0;
  if (!response.ok) throw new Error('Counter unavailable');
  return parseCount(await response.json());
}
