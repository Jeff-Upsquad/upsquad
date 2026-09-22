// SquadHire's WhatsApp Business number — inbound messages land in SquadHire CRM,
// which routes brand-new contacts to a candidates pipeline by matching the first
// message against crm_pipeline_keyword_rules.
export const SQUADHIRE_WA_NUMBER = '919995266342'
export const SALES_WA_NUMBER = '919995266385'

// Each message carries a distinctive role phrase that a keyword rule in
// SquadHire CRM matches on. Editing this copy without updating the matching rule
// will silently drop people into the default candidates pipeline instead.
//   accountant                 -> "accountant partner program"
//   designer-and-video-editor  -> "video editor partner program"
//   sales                      -> "sales partner program"
//   general                    -> "partner program"
//   agency                     -> routes to sales WhatsApp (ending in 66385)
export const PARTNER_WA_MESSAGES = {
  accountant: "Hi UpSquad, I'm interested in the Accountant Partner Program.",
  'designer-and-video-editor':
    "Hi UpSquad, I'm interested in the Designer & Video Editor Partner Program.",
  sales: "Hi UpSquad, I'm interested in the Sales Partner Program.",
  general: "Hi UpSquad, I'm interested in the Partner Program.",
  agency: "I want to join up squad as an agency",
}

export function partnerWaLink(slug) {
  if (slug === 'agency') {
    const msg = PARTNER_WA_MESSAGES.agency
    return `https://wa.me/${SALES_WA_NUMBER}?text=${encodeURIComponent(msg)}`
  }
  const text = PARTNER_WA_MESSAGES[slug]
  if (!text) return null
  return `https://wa.me/${SQUADHIRE_WA_NUMBER}?text=${encodeURIComponent(text)}`
}
