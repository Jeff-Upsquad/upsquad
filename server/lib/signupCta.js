export const PARTNER_CTA_DESTINATIONS = ['talent_signup', 'decide_form']

export const PARTNER_CTA_URLS = {
  talent_signup: 'https://squadhire.upsquadconnect.com/signup/talent',
  decide_form: '/signup/',
}

export function isValidPartnerCtaDestination(destination) {
  return PARTNER_CTA_DESTINATIONS.includes(destination)
}

export function resolvePartnerCtaUrl(destination) {
  return PARTNER_CTA_URLS[destination] || PARTNER_CTA_URLS.talent_signup
}
