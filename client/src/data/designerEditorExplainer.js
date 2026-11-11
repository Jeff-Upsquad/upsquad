// Content for the Designer & Video Editor Subscription explainer page, taken
// from the explainer video script. Plan names and prices here are the fixed
// plans from that script; they are separate from the availability plans in
// data/pricing.js used on /customers/designers-and-video-editors/.

// SquadHire Business line, the same destination as the accountant explainer.
const WA_NUMBER = '919995266342'
export const designerEditorWaLink = () =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
    "Hi UpSquad, I'm interested in UpSquad Select for Designers & Video Editors. Please share the available plans and enrollment details."
  )}`

export const serviceOptions = [
  {
    title: 'Graphic Designer',
    description: 'For your design work.',
    examples: ['Social media creatives', 'Posters', 'Marketing materials'],
  },
  {
    title: 'Video Editor',
    description: 'For your video work.',
    examples: ['Reels', 'Promotional videos', 'Regular video edits'],
  },
  {
    title: 'Designer + Video Editor Combo',
    description: 'For businesses that need both.',
    examples: ['Design requests', 'Video editing requests', 'All under a single plan'],
  },
]

export const processSteps = [
  {
    title: 'Submit your request',
    description:
      'Create a new task in SquadHub. Add your requirements, instructions, reference images, videos, and any files needed for the work.',
  },
  {
    title: 'Task review',
    description:
      'Our team reviews your requirements. If anything needs clarification, we ask through the task comments or chat. Once it is clear, the task is ready for your pipeline.',
  },
  {
    title: 'Work pipeline',
    description:
      'The task moves into your active pipeline based on your plan. Your designer or video editor starts work, and progress is updated in SquadHub.',
  },
  {
    title: 'Review & revisions',
    description:
      'Review the finished design or video directly in SquadHub. Approve and close the task, or request revisions and we will make the changes and resubmit.',
  },
  {
    title: 'Next task',
    description:
      'Once a task is completed and submitted for review, the next one can be taken up. Whether you select it or it starts automatically depends on your plan.',
  },
]

// `tasks` drives the 10-request diagram: active and scheduled counts, with the
// rest shown as waiting, or as `managed` on Personal where the assigned creative
// runs the sequence.
export const plans = [
  {
    id: 'starter',
    name: 'Starter',
    tagline: 'One task at a time, with manual task selection.',
    tasks: { active: 1, scheduled: 0, rest: 'waiting' },
    points: [
      'You select the first task and our team starts work.',
      'Once it is completed and approved, you manually select the next task.',
    ],
    nextTask: 'You select it after the current task is approved.',
    summary: 'One active task. Manually select the next.',
    price: { single: 5000, combo: 8000 },
  },
  {
    id: 'plus',
    name: 'Plus',
    tagline: 'One active task and one scheduled task.',
    tasks: { active: 1, scheduled: 1, rest: 'waiting' },
    points: [
      'While Task 1 is in progress, you can schedule Task 2.',
      'You can schedule one upcoming task at a time, and revisions on Task 1 stay available in SquadHub.',
    ],
    nextTask: 'Starts automatically when the active task is submitted for review, without waiting for approval.',
    summary: 'One active and one scheduled task. The next starts automatically.',
    price: { single: 10000, combo: 13000 },
  },
  {
    id: 'pro',
    name: 'Pro',
    tagline: 'Two active tasks, managed by one designer or video editor.',
    tasks: { active: 2, scheduled: 1, rest: 'waiting' },
    points: [
      'Tasks 1 and 2 are both active. The same person handles both, not two different people, switching based on requirements and priorities.',
      'If Task 1 is submitted while Task 2 is in progress, Task 3 starts and Task 2 continues.',
    ],
    nextTask: 'Fills the open slot automatically when either active task is submitted for review.',
    summary: 'Two active tasks with one creative. The next starts automatically.',
    price: { single: 15000, combo: 18000 },
  },
  {
    id: 'personal',
    name: 'Personal',
    tagline: 'Your own assigned designer or video editor.',
    tasks: { active: 1, scheduled: 0, rest: 'managed' },
    points: [
      'Submit your requests and share your priorities. Your assigned creative manages the work sequence.',
      'It is similar to having a designer or video editor working as part of your own team.',
    ],
    nextTask: 'Taken up automatically once a task is completed. No manual activation.',
    summary: 'An assigned creative continuously manages your work by your priorities.',
    price: { single: 20000, combo: 25000 },
  },
]

export const getStartedSteps = [
  {
    number: '01',
    title: 'Choose who you need',
    description: 'A Graphic Designer, a Video Editor, or both.',
  },
  {
    number: '02',
    title: 'Select your plan',
    description: 'Pick the subscription plan that best suits your requirements and budget.',
  },
  {
    number: '03',
    title: 'Start in SquadHub',
    description: 'Once your subscription is activated, start submitting your creative requests.',
  },
]
