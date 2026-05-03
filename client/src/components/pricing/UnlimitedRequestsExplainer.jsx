export default function UnlimitedRequestsExplainer() {
  return (
    <section className="mt-20">
      <h2 className="font-heading text-xl font-bold text-text-primary mb-3">
        How Our "Unlimited Requests — One at a Time" System Works
      </h2>
      <p className="text-sm text-text-secondary mb-6">
        At UpSquad, you can submit <strong>unlimited design and video editing requests</strong>, but our team works on{' '}
        <strong>one request at a time</strong>. This ensures high quality, full focus, and fast delivery for every task.
      </p>

      <div className="grid md:grid-cols-2 gap-10 mb-8">
        <div>
          <h3 className="text-sm font-semibold text-text-primary mb-3">Here's the simplest way to understand it:</h3>
          <ul className="text-sm text-text-secondary space-y-2 list-disc list-inside">
            <li>You can add <strong>as many tasks as you want</strong> to your queue.</li>
            <li>We will pick up <strong>one design or one video edit</strong> at a time.</li>
            <li>Once that task is completed and delivered to you...</li>
            <li>
              The <strong>next task in your queue automatically starts</strong>, without you needing to follow up.
            </li>
            <li>When that is completed, the next one begins — and so on.</li>
          </ul>
          <div className="mt-4">
            <p className="text-sm font-medium text-text-primary">Think of it like a conveyor belt:</p>
            <p className="text-sm text-text-secondary mt-1">
              You can load unlimited items onto the belt, but the machine processes{' '}
              <strong>one item at a time</strong>, very efficiently.
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-text-primary mb-3">Why we do this:</h3>
          <ul className="text-sm text-text-secondary space-y-2 list-disc list-inside">
            <li>
              It gives you <strong>unlimited output</strong> without compromising quality.
            </li>
            <li>
              Designers and editors can fully focus on <strong>one task</strong>, resulting in better work.
            </li>
            <li>Delivery timelines stay predictable (24–48 hours depending on your plan).</li>
            <li>Your entire queue keeps moving smoothly.</li>
          </ul>

          <div className="mt-6 bg-brand-purple/5 border border-brand-purple/20 rounded-xl p-5">
            <h4 className="text-sm font-semibold text-text-primary mb-2">Important clarity:</h4>
            <p className="text-sm text-text-primary">
              The limit is <strong>not on how many tasks you can submit</strong>.
            </p>
            <p className="text-sm text-text-primary">
              The limit is only on <strong>how many tasks we work on simultaneously</strong>.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
