export const NAV_LINKS = [
  { label: 'Work', href: '#portfolio' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Book', href: '#booking' },
] as const;

export const CONTACT = {
  email: 'fortunethecreative@gmail.com',
  phone: '+2347037038069',
  phoneDisplay: '+234 703 7038 069',
  instagram: [
    { handle: '@fortune_creatives', url: 'https://instagram.com/fortune_creatives' },
    { handle: '@fortuneartz', url: 'https://instagram.com/fortuneartz' },
  ],
} as const;

/**
 * Calendly booking URL.
 *
 * TESTING  — account: ugorjimicheal.um@gmail.com
 * After creating the Calendly account, go to Settings › Profile to confirm
 * the exact username, then update the slug below if it differs from
 * "ugorjimicheal-um".
 *
 * DELIVERY — replace with Fortune's Calendly username before going live.
 */
export const CALENDLY_URL = 'https://calendly.com/fortunethecreative/30min';
