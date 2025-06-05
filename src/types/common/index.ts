

export const CURRENCIES = ['INR', 'USD', 'EUR', 'GBP', 'CAD', 'AUD', 'JPY', 'SGD'] as const;
export const LANGUAGES = ['in', 'en', 'es', 'fr', 'de', 'it', 'pt', 'ja', 'zh'] as const;
export const TIMEZONES = [
  'UTC',
  'America/New_York',
  'America/Los_Angeles',
  'Europe/London',
  'Europe/Paris',
  'Asia/Tokyo',
  'Asia/Singapore',
  'Australia/Sydney'
] as const;

export type Currency = typeof CURRENCIES[number];
export type Language = typeof LANGUAGES[number];
export type Timezone = typeof TIMEZONES[number];