export const OFFER_ROLES = {
  designer: { id: 'designer', label: 'Designer', noun: 'designer' },
  editor: { id: 'editor', label: 'Video editor', noun: 'video editor' },
  accountant: { id: 'accountant', label: 'Accountant', noun: 'accountant' },
}

export const OFFER_PLANS = {
  basic: { id: 'basic', name: 'Basic', hoursPerDay: 2, price: 5000 },
  plus: { id: 'plus', name: 'Plus', hoursPerDay: 4, price: 10000 },
}

export function normalizeRoleIds(input) {
  const raw = Array.isArray(input)
    ? input
    : typeof input === 'string'
      ? input.split(',')
      : []
  const ids = [...new Set(raw.map((id) => String(id).trim()).filter((id) => OFFER_ROLES[id]))]
  return ids
}

export function quoteFor(planId, roleIds) {
  const plan = OFFER_PLANS[planId]
  const roles = normalizeRoleIds(roleIds)
  if (!plan || roles.length === 0) return null
  return {
    plan,
    roles: roles.map((id) => OFFER_ROLES[id]),
    amount: plan.price * roles.length,
  }
}

export function roleLabel(roles) {
  return roles.map((role) => role.label).join(' + ')
}

export function roleNoun(roles) {
  if (roles.length === 2) return `${roles[0].noun} and a ${roles[1].noun}`
  return roles[0]?.noun || 'creative'
}

export function normalizePhone(phone) {
  const digits = String(phone || '').replace(/\D/g, '')
  if (digits.length === 10) return `+91${digits}`
  if (digits.length === 12 && digits.startsWith('91')) return `+${digits}`
  if (digits.length > 10) return `+${digits}`
  return digits
}
