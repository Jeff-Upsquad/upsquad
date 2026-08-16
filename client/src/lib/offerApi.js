const API_URL = process.env.NEXT_PUBLIC_SQUADHUB_API_URL || ''

export async function startOfferCheckout(payload) {
  const res = await fetch(`${API_URL}/api/v1/offer/checkout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(payload),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    const message = data.details?.join('. ') || data.error || 'Could not start payment'
    throw new Error(message)
  }
  return data
}

export async function fetchOfferReservation(id) {
  const res = await fetch(`${API_URL}/api/v1/offer/reservations/${encodeURIComponent(id)}`, {
    headers: { Accept: 'application/json' },
  })
  if (res.status === 404) return null
  if (!res.ok) throw new Error('Could not load reservation')
  return res.json()
}
