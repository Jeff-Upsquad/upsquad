import { fetchAccountantPaymentLink, isAccountantPaymentPaid } from './cashfree.js'
import { markAccountantPaymentPaid } from './db.js'

export async function syncAccountantPayment(row) {
  if (row.status === 'paid') return row
  const link = await fetchAccountantPaymentLink(row.id)
  return isAccountantPaymentPaid(link, row.id) ? markAccountantPaymentPaid(row.id) : row
}
