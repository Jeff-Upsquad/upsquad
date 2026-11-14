import LegalPage, { LegalContact } from '../../../components/legal/LegalPage'

export const metadata = {
  title: 'Terms of Service',
  description: 'Terms for using the UpSquad website, requesting services, subscriptions, payments and working with our team.',
  alternates: { canonical: '/terms-of-service/' },
}

const sections = [
  {
    id: 'agreement', title: 'About these terms',
    paragraphs: [
      'These terms govern your use of the UpSquad website and services provided by UpSquad (“UpSquad”, “we”, “us”). By using the website or ordering a service, you agree to the terms that apply to that activity. If you do not agree, do not use the website or place an order.',
      'You must be at least 18 and legally able to enter a contract to order services or submit an application. If acting for a business, you confirm you are authorised to do so. A separately agreed proposal, order or service agreement governs the specific engagement and takes priority if it conflicts with these general terms, subject to mandatory law.',
    ],
  },
  {
    id: 'services', title: 'Services and availability',
    paragraphs: [
      'UpSquad connects businesses with talent and provides subscription and project services, including creative and other business support. Availability depends on the service, skills, capacity and location. Features labelled as a waitlist, beta or coming soon are not a commitment to provide immediate access.',
      'An enquiry, proposed budget, booking or application does not by itself guarantee a service, role, partnership or start date. The accepted order or written confirmation sets the scope, fees, working hours, delivery arrangements and other applicable conditions. Any paid reservation remains subject to the terms and refund promises shown with that offer.',
    ],
  },
  {
    id: 'responsibilities', title: 'Your responsibilities',
    paragraphs: [
      'Provide accurate contact, business and billing information, and timely briefs, permissions, materials, access and feedback needed for the work. You are responsible for ensuring you have the rights and lawful authority to share all material and personal information you supply. Keep any account credentials secure and notify us of suspected misuse.',
      'Do not use the website or services for illegal, fraudulent, infringing, abusive or harmful activity; upload malicious code; attempt unauthorised access; interfere with other users or infrastructure; or misrepresent your identity or authority. We may decline requests that would breach these obligations.',
    ],
  },
  {
    id: 'delivery', title: 'Scope, delivery and review',
    paragraphs: [
      'Turnaround and output depend on the agreed scope, complexity, assigned capacity, working days and timely customer input. “Unlimited requests” means you may submit requests within your plan; it does not mean unlimited simultaneous work, working hours or instant delivery. Priorities, revisions and work outside scope are handled under your agreed plan or proposal.',
      'Review deliverables and raise concerns promptly so we can address them. You remain responsible for final publication decisions and for checking claims, permissions and information used in your business. Where AI tools are part of agreed work, outputs may contain errors and require human review. Professional, regulated or statutory sign-off must be separately agreed with an appropriately qualified professional.',
    ],
  },
  {
    id: 'payments', title: 'Pricing and payments',
    paragraphs: [
      'The price, currency, billing period and applicable taxes are those disclosed in the accepted offer or order. A budget submitted through a form is a proposal until accepted. Additional work or third-party costs require agreement. Payments must be made using the method and schedule confirmed for your order.',
      'Online payments may be processed by Razorpay and are also subject to the provider’s applicable terms. A payment attempt is not confirmation of success; retain the transaction reference and contact us if payment status is unclear. Recurring billing, if offered, requires the authorisation and renewal details disclosed at checkout or in your agreement.',
    ],
  },
  {
    id: 'cancellation', title: 'Pausing, cancellation and refunds',
    paragraphs: [
      'You can request a pause or cancellation at any time by contacting hello@upsquadconnect.com or your assigned UpSquad contact. We will confirm the effective date and any remaining work or billing. For a monthly subscription, cancellation stops future billing periods; a pause or cancellation does not automatically create a refund for work already delivered or the current paid period, unless your offer, agreement or applicable law provides otherwise.',
      'Any refund promise shown on your accepted offer continues to apply. In particular, where a first-month offer promises a full refund if the talent match is not right, we honour that promise. Contact us with your reservation or payment reference to raise the issue and request the refund. Any eligibility conditions must be those disclosed for the offer when you purchased it.',
      'Refund processing depends on the payment provider and banking system. We will confirm the applicable amount and status rather than promise an unverified settlement time. Nothing in these terms removes any cancellation, refund or consumer right that cannot lawfully be excluded.',
    ],
  },
  {
    id: 'ownership', title: 'Intellectual property and your materials',
    paragraphs: [
      'You retain your rights in the material you supply. You give us permission to use it as reasonably necessary to deliver the agreed service, including sharing it with assigned professionals and agreed service providers. Do not supply material you are not entitled to use.',
      'Ownership and licensing of commissioned work are governed by your service agreement. Unless otherwise agreed in writing, on full payment we assign to you our transferable rights in final custom deliverables created specifically for your order. Pre-existing tools, templates, software, stock assets, fonts and other third-party materials remain subject to their owners’ rights and licence terms. Editable source files and any additional licences are included only where agreed.',
      'The UpSquad website, branding and underlying platform remain the property of their respective owners. Website access does not give you permission to reproduce or resell them. Any use of your confidential work or branding in our portfolio requires your permission.',
    ],
  },
  {
    id: 'confidentiality', title: 'Confidentiality and personal information',
    paragraphs: [
      'Each party should protect non-public business information received for an engagement and use it only for that engagement, sharing it only as needed with people or providers involved in the work or as legally required. This does not apply to information already lawfully known, independently developed or publicly available without a breach. Additional confidentiality or data-processing terms may be agreed for a project.',
      <>Our <a href="/privacy-policy/" className="underline underline-offset-4">Privacy Policy</a> explains how we handle personal information. Agree any special security, data access, regulated information or AI-tool restrictions with us before providing project materials.</>,
    ],
  },
  {
    id: 'third-parties', title: 'Third-party services and applications',
    paragraphs: [
      'The website may link to payment, communication, hiring, video or other external services. Their availability, accounts and use are governed by their own terms and privacy policies. We are responsible for our own obligations, but cannot control third-party services or guarantee their uninterrupted operation.',
      'Talent, career and agency applications are expressions of interest. Employment, contractor status, compensation, commissions and partner obligations arise only under a separate accepted agreement; submitting a form does not create those relationships.',
    ],
  },
  {
    id: 'suspension', title: 'Suspension and ending a service',
    paragraphs: [
      'We may restrict access or suspend work for non-payment, unlawful use, security threats or a material breach of the applicable agreement. Where practical, we will notify you and allow a reasonable opportunity to resolve the issue; urgent security or legal concerns may require immediate action.',
      'On termination, payment for work properly delivered remains due, and any handover, unused prepayments and refunds will be handled under the agreed order and applicable law. Provisions that by their nature continue, including confidentiality and ownership, remain in effect.',
    ],
  },
  {
    id: 'liability', title: 'Service standards and liability',
    paragraphs: [
      'We aim to provide services with reasonable care and skill. The website may contain errors or experience interruptions, and we do not guarantee specific business results, revenue, rankings or hiring outcomes. Any service-specific warranties and remedies are set out in your agreement.',
      'To the extent permitted by applicable law, we are not responsible for indirect or consequential losses arising from use of the website or services. Nothing in these terms excludes liability for fraud, wilful misconduct or any liability or statutory right that cannot lawfully be limited. Any additional liability limits must be stated in your accepted service agreement.',
    ],
  },
  {
    id: 'law', title: 'Governing law and resolving concerns',
    paragraphs: [
      'These terms are governed by the laws of India. Please contact us first so we can try to resolve concerns about the website, a payment or an engagement. Unless a separate agreement provides otherwise, courts with jurisdiction in Kochi, Kerala, India may hear disputes, subject to mandatory law and any consumer forum or other legal remedy available to you.',
      'If a provision is unenforceable, the remaining provisions continue to apply to the extent permitted by law. A delay in enforcing a provision does not waive it.',
    ],
  },
  {
    id: 'updates', title: 'Changes to these terms',
    paragraphs: [
      'We may update these terms and will show the latest revision date on this page. Updates apply to future use and new orders. Changes to an existing paid engagement require the notice or agreement provided for in that engagement and applicable law; posting a new version does not retrospectively remove an agreed offer or refund promise.',
    ],
  },
  {
    id: 'contact', title: 'Contact us',
    paragraphs: [<LegalContact key="contact" />],
  },
]

export default function TermsOfService() {
  return <LegalPage title="Terms of Service" introduction="These terms explain how to use our website and what to expect when requesting or purchasing UpSquad services. Please read them alongside the details of your chosen offer and any agreement for your work." sections={sections} relatedHref="/privacy-policy/" relatedTitle="Privacy Policy" />
}
