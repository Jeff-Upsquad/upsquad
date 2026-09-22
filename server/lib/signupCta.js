export const PARTNER_CTA_DESTINATIONS = ['talent_signup', 'decide_form']

export const PARTNER_CTA_URLS = {
  talent_signup: 'https://squadhire.upsquadconnect.com/signup/talent',
  decide_form: '/signup/',
}

const ROLE_SIGNUP_URLS = {
  accountant: 'https://squadhire.upsquadconnect.com/apply/accountant',
  'designer-and-video-editor': 'https://squadhire.upsquadconnect.com/apply/creative',
  sales: 'https://squadhire.upsquadconnect.com/apply/sales',
  agency: 'https://squadhire.upsquadconnect.com/signup/agency',
}

export function isValidPartnerCtaDestination(destination) {
  return PARTNER_CTA_DESTINATIONS.includes(destination)
}

export function resolvePartnerCtaUrl(destination, slug) {
  if (ROLE_SIGNUP_URLS[slug]) return ROLE_SIGNUP_URLS[slug]
  return PARTNER_CTA_URLS[destination] || PARTNER_CTA_URLS.talent_signup
}
