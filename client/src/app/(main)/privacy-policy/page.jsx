import LegalPage, { LegalContact } from '../../../components/legal/LegalPage'

export const metadata = {
  title: 'Privacy Policy',
  description: 'How UpSquad collects, uses and shares personal information, and how to contact us about your privacy.',
  alternates: { canonical: '/privacy-policy/' },
}

const sections = [
  {
    id: 'scope', title: 'Who we are and what this covers',
    paragraphs: [
      'This policy applies to UpSquad (“we”, “us”). This policy explains how we handle personal information collected through this website and related enquiries, subscription requests, bookings, recruitment and service delivery.',
      'A separate product, partner platform or customer agreement may provide additional privacy information. When we process personal information on a customer’s instructions to deliver work, the applicable service agreement also governs that processing.',
    ],
  },
  {
    id: 'information', title: 'Information we collect',
    paragraphs: [
      'Information you provide: your name, email address, phone number, company or brand, business location, country, preferred languages, service interests, plan and budget preferences, project requirements and messages. Booking requests may include your chosen time, time zone and communication method. Job and partner enquiries include the application details and any professional information you choose to share.',
      'Service and transaction information: briefs, files and feedback you send us, communications about your work, and booking, subscription and payment records. For Razorpay checkout, our systems handle order or reservation identifiers, payment references, amounts and payment status. Payment credentials are handled by the payment provider on its checkout.',
      'Technical information: when you access the site, our hosting infrastructure and embedded providers may receive information such as your IP address, browser and device details, requested pages, timestamps and error information. Browser preferences and embedded content are described below.',
      'Please share only information needed for your enquiry or work. Do not send passwords, full card details or unnecessary sensitive personal information through enquiry forms or messages. If your project requires sensitive information, contact us first to agree an appropriate way to share it.',
    ],
  },
  {
    id: 'purposes', title: 'How and why we use information',
    paragraphs: [
      'We use information to respond to enquiries; arrange calls and meetings; assess subscription, talent and partner requests; match people with work; deliver and support services; administer payments and refunds; keep business records; and communicate about your requests or services.',
      'We also use information as needed to maintain and secure the website, investigate misuse, resolve disputes and meet legal obligations. Where applicable law requires consent for a particular activity, we will seek that consent. An enquiry does not by itself authorise unrelated marketing; you can ask us to stop promotional messages at any time.',
    ],
  },
  {
    id: 'sharing', title: 'When information is shared',
    paragraphs: [
      'Information may be shared with team members, assigned professionals and agencies who need it to respond to your request or deliver agreed work. Service providers may process information for hosting, storage, communications, scheduling, payment processing and other service operations. We share information for these purposes, subject to applicable law and the relevant arrangements.',
      'If an agreed service uses an AI tool or an external platform, information supplied to that tool is also subject to the relevant provider’s terms and privacy practices. Agree any restrictions on customer data or AI use with us before sharing project material.',
      'We may disclose information when required by law, to respond to lawful requests, to protect rights or safety, or in connection with a business transfer, subject to applicable safeguards. Clicking a third-party link or interacting with an embedded service can also share information directly with that provider.',
    ],
  },
  {
    id: 'cookies', title: 'Cookies, browser storage and embeds',
    paragraphs: [
      'We use browser local storage to remember your light or dark theme and your preferred video language for landing pages. These preferences remain on your device until changed or cleared. Administrative sign-in uses an authentication cookie.',
      'Some pages include third-party video players, maps, booking links or payment checkout. Providers such as Squad Clips, YouTube, Vimeo, Google Maps and Razorpay may receive technical information and use cookies or similar technologies when their content loads or you interact with them. An embed may connect to its provider before you press play. Their own privacy policies explain their practices.',
      'You can delete local storage and cookies through your browser’s site-data settings, or restrict third-party cookies using browser controls. Clearing preferences resets saved choices, and blocking storage or embedded content may affect some features. Contact us if you need another way to access information or arrange a service.',
    ],
  },
  {
    id: 'retention', title: 'Retention and security',
    paragraphs: [
      'We retain personal information for as long as reasonably needed for the purpose for which it was collected, including service delivery, recruitment follow-up, accounting, legal obligations and dispute resolution. The period depends on the type of record, our relationship with you and applicable requirements. You may contact us to request deletion; some records may need to be retained for legal or legitimate business reasons.',
      'We use reasonable technical and organisational safeguards appropriate to the information we handle. No website, transmission method or storage system is completely secure. Contact us promptly if you suspect unauthorised access or misuse involving information you shared with us.',
    ],
  },
  {
    id: 'international', title: 'International processing',
    paragraphs: [
      'UpSquad operates from India. Our professionals and service providers may process information in India or other countries, whose privacy laws may differ from those where you live. Any cross-border handling remains subject to applicable legal requirements and relevant service arrangements.',
    ],
  },
  {
    id: 'choices', title: 'Your choices and privacy requests',
    paragraphs: [
      'You can ask what personal information we hold about you, request a correction or deletion, withdraw consent where processing relies on it, or raise a privacy complaint by emailing hello@upsquadconnect.com with the subject “Privacy request”. Additional rights may apply under the law where you live. We will handle requests in accordance with applicable law and may need to verify your identity without collecting more information than necessary.',
      'You may choose not to provide optional information. Withdrawing consent or requesting deletion may mean we can no longer provide a service that needs that information; we will explain any relevant consequence. These choices do not affect processing already lawfully carried out or records we must retain. You may also raise concerns with the competent authority where applicable law provides that right.',
    ],
  },
  {
    id: 'children', title: 'Children’s information',
    paragraphs: [
      'Our business services and applications are intended for adults aged 18 or older. We do not knowingly collect personal information from children. If you believe a child has provided information, contact us so we can investigate and arrange deletion where appropriate.',
    ],
  },
  {
    id: 'updates', title: 'Changes to this policy',
    paragraphs: [
      'We may update this policy as our services or legal requirements change. The latest version will appear here with its updated date. Where required, we will provide additional notice or seek consent before a new use of personal information.',
    ],
  },
  {
    id: 'contact', title: 'Contact and privacy concerns',
    paragraphs: [
      'For questions, privacy requests or complaints, contact us using the details below and address your message to the UpSquad privacy team. Please describe your concern and how we can reach you.',
      <LegalContact key="contact" />,
    ],
  },
]

export default function PrivacyPolicy() {
  return <LegalPage title="Privacy Policy" introduction="Your information helps us answer your questions, connect you with the right people and deliver your work. This policy explains what we collect, how it is used and the choices available to you." sections={sections} relatedHref="/terms-of-service/" relatedTitle="Terms of Service" />
}
