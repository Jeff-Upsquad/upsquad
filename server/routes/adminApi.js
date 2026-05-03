import express from 'express'
import { requireApiToken } from '../lib/adminApiAuth.js'
import {
  listSubscriptionRequests,
  getSubscriptionRequestById,
  updateSubscriptionRequestStatus,
} from '../lib/db.js'

const router = express.Router()

router.use(express.json())
router.use(requireApiToken)

router.get('/subscription-requests', (req, res) => {
  const { status, search, limit, offset } = req.query
  try {
    const result = listSubscriptionRequests({
      status: status || undefined,
      search: search || undefined,
      limit: limit ? Math.min(parseInt(limit, 10) || 50, 200) : 50,
      offset: offset ? parseInt(offset, 10) || 0 : 0,
    })
    res.json(result)
  } catch (err) {
    console.error('List subscription requests error:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

router.get('/subscription-requests/:id', (req, res) => {
  const id = parseInt(req.params.id, 10)
  if (!id) return res.status(400).json({ error: 'Invalid ID' })

  try {
    const data = getSubscriptionRequestById(id)
    if (!data) return res.status(404).json({ error: 'Not found' })
    res.json({ data })
  } catch (err) {
    console.error('Get subscription request error:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

router.patch('/subscription-requests/:id', (req, res) => {
  const id = parseInt(req.params.id, 10)
  if (!id) return res.status(400).json({ error: 'Invalid ID' })

  const { status } = req.body || {}
  if (!status) return res.status(400).json({ error: 'status is required' })

  try {
    const data = updateSubscriptionRequestStatus(id, status)
    if (!data) return res.status(404).json({ error: 'Not found or invalid status' })
    res.json({ data })
  } catch (err) {
    console.error('Update subscription request error:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default router
