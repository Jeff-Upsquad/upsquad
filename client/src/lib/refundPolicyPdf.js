import { refundPolicy, REFUND_POLICY_UPDATED, REFUND_POLICY_SLUG } from '../data/refundPolicy.js'

const INK = [10, 10, 10]
const BODY = [82, 82, 82]
const MUTED = [128, 128, 134]
const ACCENT = [255, 255, 153]
const CARD = [249, 249, 246]
const BORDER = [229, 229, 224]

const PAGE_WIDTH = 210
const PAGE_HEIGHT = 297
const MARGIN = 18
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2
const CONTENT_BOTTOM = 272

function formatDownloadStamp(date) {
  const datePart = new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date)
  const timePart = new Intl.DateTimeFormat('en-GB', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(date)
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'local time'
  return `Downloaded on ${datePart} at ${timePart} (${timeZone})`
}

function formatShortStamp(date) {
  const datePart = new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date)
  const timePart = new Intl.DateTimeFormat('en-GB', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(date)
  return `Downloaded ${datePart}, ${timePart}`
}

function fileDate(date) {
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, '0'),
    String(date.getDate()).padStart(2, '0'),
  ].join('-')
}

export async function buildRefundPolicyPdf(downloadedAt = new Date()) {
  const { jsPDF } = await import('jspdf')
  const doc = new jsPDF({ unit: 'mm', format: 'a4', compress: true })

  const fullStamp = formatDownloadStamp(downloadedAt)
  const shortStamp = formatShortStamp(downloadedAt)

  let y = 18

  const newPage = () => {
    doc.addPage()
    y = 27
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(7.5)
    doc.setTextColor(...MUTED)
    doc.text('UPSQUAD  ·  FIRST MONTH REFUND POLICY', MARGIN, 15)
    doc.setFont('helvetica', 'normal')
    doc.text(shortStamp, PAGE_WIDTH - MARGIN, 15, { align: 'right' })
    doc.setDrawColor(...BORDER)
    doc.setLineWidth(0.2)
    doc.line(MARGIN, 18.5, PAGE_WIDTH - MARGIN, 18.5)
  }

  const ensure = (height) => {
    if (y + height > CONTENT_BOTTOM) newPage()
  }

  const writeParagraph = (text, options = {}) => {
    const {
      size = 9.5,
      style = 'normal',
      color = BODY,
      indent = 0,
      lineHeight = 4.7,
      gapAfter = 2.4,
    } = options
    doc.setFont('helvetica', style)
    doc.setFontSize(size)
    doc.setTextColor(...color)
    const lines = doc.splitTextToSize(text, CONTENT_WIDTH - indent)
    lines.forEach((line) => {
      if (y > CONTENT_BOTTOM) newPage()
      doc.text(line, MARGIN + indent, y)
      y += lineHeight
    })
    y += gapAfter
  }

  const writeHeading = (text, options = {}) => {
    const { size = 14, gapBefore = 3.5, gapAfter = 2.6 } = options
    ensure(size * 0.3528 + gapBefore + 12)
    y += gapBefore
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(size)
    doc.setTextColor(...INK)
    doc.text(text, MARGIN, y)
    y += size * 0.3528 + gapAfter
  }

  /* ------------------------------- Page 1 header ------------------------------ */

  doc.setFillColor(...INK)
  doc.roundedRect(MARGIN, 18, CONTENT_WIDTH, 34, 3, 3, 'F')

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(16)
  doc.setTextColor(255, 255, 255)
  doc.text('UpSquad', MARGIN + 8, 30)
  const wordmarkWidth = doc.getTextWidth('UpSquad')
  doc.setFillColor(...ACCENT)
  doc.circle(MARGIN + 8 + wordmarkWidth + 2.4, 27, 1.25, 'F')

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(7)
  doc.setTextColor(170, 170, 175)
  doc.setCharSpace(0.6)
  doc.text('LEGAL', PAGE_WIDTH - MARGIN - 8, 29, { align: 'right' })
  doc.setCharSpace(0)

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(15)
  doc.setTextColor(255, 255, 255)
  doc.text(refundPolicy.title, MARGIN + 8, 43)

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8.2)
  doc.setTextColor(...MUTED)
  doc.text(fullStamp, MARGIN, 60)
  doc.text(`Policy last updated: ${REFUND_POLICY_UPDATED}`, MARGIN, 65.4)

  doc.setFillColor(...ACCENT)
  doc.roundedRect(MARGIN, 70, 22, 1.4, 0.7, 0.7, 'F')

  y = 80

  /* --------------------------------- Content --------------------------------- */

  writeHeading(refundPolicy.guaranteeTitle, { size: 15, gapBefore: 0, gapAfter: 2.8 })
  writeParagraph(refundPolicy.introduction, { size: 9.5, gapAfter: 3 })

  writeHeading('How It Works', { size: 15, gapBefore: 3 })

  refundPolicy.stages.forEach((stage) => {
    const pad = 6
    const innerWidth = CONTENT_WIDTH - pad * 2
    const titleSize = 12
    const bodySize = 9.2
    const lineHeight = 4.5

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(7.5)
    const pillWidth = stage.refund ? doc.getTextWidth(stage.refund) + 7 : 0

    doc.setFontSize(titleSize)
    const titleMaxWidth = innerWidth - (pillWidth ? pillWidth + 5 : 0)
    const titleLines = doc.splitTextToSize(stage.title, titleMaxWidth)

    let cardHeight = pad + 3.4 + titleLines.length * 5.4 + 0.6
    let descriptionLines = []
    if (stage.description) {
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(bodySize)
      descriptionLines = doc.splitTextToSize(stage.description, innerWidth)
      cardHeight += 2.2 + descriptionLines.length * lineHeight
    }
    let bulletLines = []
    if (stage.bullets?.length) {
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(bodySize)
      bulletLines = stage.bullets.map((bullet) => doc.splitTextToSize(bullet, innerWidth - 5.5))
      cardHeight += 2.4 + bulletLines.reduce((sum, lines) => sum + lines.length * lineHeight + 0.9, 0)
    }
    if (stage.note) cardHeight += 3 + 4.5
    cardHeight += pad

    ensure(cardHeight + 4)
    const top = y - 3.4

    doc.setFillColor(...CARD)
    doc.setDrawColor(...BORDER)
    doc.setLineWidth(0.25)
    doc.roundedRect(MARGIN, top, CONTENT_WIDTH, cardHeight, 2.5, 2.5, 'FD')

    let cursor = top + pad + 2.6

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(7)
    doc.setTextColor(...MUTED)
    doc.setCharSpace(0.5)
    doc.text(stage.label.toUpperCase(), MARGIN + pad, cursor)
    doc.setCharSpace(0)

    if (pillWidth) {
      const pillTop = top + pad - 1.2
      doc.setFillColor(...ACCENT)
      doc.roundedRect(MARGIN + CONTENT_WIDTH - pad - pillWidth, pillTop, pillWidth, 6.6, 3.3, 3.3, 'F')
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(7.5)
      doc.setTextColor(...INK)
      doc.text(stage.refund, MARGIN + CONTENT_WIDTH - pad - pillWidth / 2, pillTop + 4.35, { align: 'center' })
    }

    cursor += 3.6
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(titleSize)
    doc.setTextColor(...INK)
    titleLines.forEach((line) => {
      doc.text(line, MARGIN + pad, cursor + 4)
      cursor += 5.4
    })
    cursor += 1

    if (stage.description) {
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(bodySize)
      doc.setTextColor(...BODY)
      descriptionLines.forEach((line) => {
        doc.text(line, MARGIN + pad, cursor + 3.6)
        cursor += lineHeight
      })
      cursor += 1.6
    }

    if (stage.bullets?.length) {
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(bodySize)
      doc.setTextColor(...BODY)
      bulletLines.forEach((lines, bulletIndex) => {
        doc.setFillColor(...INK)
        doc.rect(MARGIN + pad + 0.5, cursor + 1.9, 1.1, 1.1, 'F')
        lines.forEach((line) => {
          doc.text(line, MARGIN + pad + 5.5, cursor + 3.6)
          cursor += lineHeight
        })
        cursor += 0.9
        if (bulletIndex === bulletLines.length - 1) cursor -= 0.9
      })
      cursor += 1.8
    }

    if (stage.note) {
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(bodySize)
      doc.setTextColor(...INK)
      doc.text(stage.note, MARGIN + pad, cursor + 3.8)
      cursor += 4.5
    }

    y = top + cardHeight + 4.5
  })

  /* ------------------------------ Refund process ----------------------------- */

  {
    const pad = 6
    const innerWidth = CONTENT_WIDTH - pad * 2
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(12)
    const headingLines = doc.splitTextToSize(refundPolicy.processing.title, innerWidth)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9.5)
    const bodyLines = doc.splitTextToSize(refundPolicy.processing.text, innerWidth)
    const boxHeight = pad + headingLines.length * 5.4 + 2.6 + bodyLines.length * 4.8 + pad

    ensure(boxHeight + 5)
    const top = y - 3.4

    doc.setFillColor(...ACCENT)
    doc.roundedRect(MARGIN, top, CONTENT_WIDTH, boxHeight, 2.5, 2.5, 'F')

    let cursor = top + pad + 4
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(12)
    doc.setTextColor(...INK)
    headingLines.forEach((line) => {
      doc.text(line, MARGIN + pad, cursor)
      cursor += 5.4
    })
    cursor += 2.6
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9.5)
    bodyLines.forEach((line) => {
      doc.text(line, MARGIN + pad, cursor)
      cursor += 4.8
    })

    y = top + boxHeight + 4.5
  }

  /* ---------------------------------- Terms ---------------------------------- */

  writeHeading('Terms & Conditions', { size: 15, gapBefore: 2.5 })

  refundPolicy.terms.forEach((term, index) => {
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(9.5)
    const lines = doc.splitTextToSize(term, CONTENT_WIDTH - 8)
    ensure(lines.length * 4.7 + 2)

    doc.setTextColor(...INK)
    doc.text(`${index + 1}.`, MARGIN + 1, y)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(...BODY)
    lines.forEach((line) => {
      doc.text(line, MARGIN + 8, y)
      y += 4.7
    })
    y += 1.7
  })

  /* --------------------------------- Slogan ---------------------------------- */

  ensure(30)
  y += 4
  const sloganTop = y - 3.4
  doc.setFillColor(...INK)
  doc.roundedRect(MARGIN, sloganTop, CONTENT_WIDTH, 18, 2.5, 2.5, 'F')
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(11.5)
  doc.setTextColor(255, 255, 255)
  doc.text(refundPolicy.slogan, PAGE_WIDTH / 2, sloganTop + 11, { align: 'center' })
  y = sloganTop + 18 + 4

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8)
  doc.setTextColor(...MUTED)
  doc.text(
    'Questions about a refund? Email hello@upsquadconnect.com or call +91 99952 66385.',
    PAGE_WIDTH / 2,
    y + 2,
    { align: 'center' },
  )

  /* --------------------------------- Footers --------------------------------- */

  const totalPages = doc.getNumberOfPages()
  for (let page = 1; page <= totalPages; page += 1) {
    doc.setPage(page)
    doc.setDrawColor(...BORDER)
    doc.setLineWidth(0.2)
    doc.line(MARGIN, 281, PAGE_WIDTH - MARGIN, 281)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(7.3)
    doc.setTextColor(...MUTED)
    doc.text(`upsquadconnect.com/${REFUND_POLICY_SLUG}`, MARGIN, 286)
    doc.text(`Page ${page} of ${totalPages}`, PAGE_WIDTH - MARGIN, 286, { align: 'right' })
  }

  doc.setProperties({
    title: `UpSquad ${refundPolicy.title}`,
    subject: 'First month refund terms for selected UpSquad subscriptions',
    author: 'UpSquad',
    creator: 'UpSquad',
    keywords: 'UpSquad, refund policy, first month, subscription, legal',
  })

  return doc
}

export async function downloadRefundPolicyPdf(downloadedAt = new Date()) {
  const doc = await buildRefundPolicyPdf(downloadedAt)
  const filename = `UpSquad-First-Month-Refund-Policy-${fileDate(downloadedAt)}.pdf`
  doc.save(filename)
  return filename
}
