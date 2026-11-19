export const REFUND_POLICY_UPDATED = '19 November 2026'
export const REFUND_POLICY_UPDATED_ISO = '2026-11-19'
export const REFUND_POLICY_SLUG = 'refund-policy'

export const refundPolicy = {
  title: 'First Month Refund Policy',
  guaranteeTitle: '100% Satisfaction Guarantee',
  introduction:
    "At UpSquad, we want our customers to feel confident about subscribing to our services. That's why we offer an exclusive No Questions Asked Refund Policy to select customers, allowing them to experience our services without financial risk during the initial 15 days.",
  stages: [
    {
      id: 'stage-1',
      number: '01',
      label: 'Stage 1',
      title: 'Subscribe & Get Started',
      refund: null,
      bullets: [
        'Subscribe to an eligible monthly subscription plan.',
        'UpSquad will assign the required resource based on your subscription.',
        'Start using our services as per your selected plan.',
      ],
    },
    {
      id: 'stage-2',
      number: '02',
      label: 'Stage 2',
      title: '15-Day Review & 100% Refund',
      refund: '100% refund',
      description: 'After completing the first 15 days, our team will reach out to collect your feedback.',
      bullets: [
        'If you are satisfied with our services, you can continue your subscription.',
        'If you are not satisfied or do not wish to continue, you can cancel your subscription and receive a 100% refund of your monthly subscription fee.',
      ],
      note: 'No questions asked.',
    },
    {
      id: 'stage-3',
      number: '03',
      label: 'Stage 3',
      title: 'End-of-Month Review & 50% Refund',
      refund: '50% refund',
      description: 'At the end of your first month, our team will reach out once again to collect your feedback.',
      bullets: [
        'If you are satisfied with our services, you can continue your subscription.',
        "If you do not wish to continue, you can cancel your subscription and receive a 50% refund of your first month's subscription fee, equivalent to 15 days of service.",
      ],
      note: 'No questions asked.',
    },
  ],
  processing: {
    title: 'Refund Processing',
    text: 'All eligible refunds will be processed within 5 working days from the date of subscription cancellation.',
  },
  terms: [
    'This refund policy is exclusively available to selected customers.',
    'This policy is applicable only to the first month of the subscription.',
    'Refunds must be requested at the respective review stages.',
    'Refunds are applicable only to the subscription fee.',
    'All eligible refunds will be processed within five working days of cancellation.',
    "Subsequent subscription months will be subject to UpSquad's standard subscription and cancellation policies.",
  ],
  slogan: 'Your Satisfaction. Your Choice. Zero Pressure.',
}
