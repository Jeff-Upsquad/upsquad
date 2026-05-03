export default function NoteSection() {
  return (
    <div className="mt-8 bg-surface-secondary border border-[rgba(96,96,163,0.2)] rounded-xl p-6">
      <p className="text-sm font-semibold text-text-primary mb-2">Note:</p>
      <ul className="text-sm text-text-secondary space-y-1.5 list-disc list-inside">
        <li>
          Capacity mentioned is the combined capacity of Squad Manager and the resource which is designer and/or editor.
          Meaning, they both work together to give the output of a full-time equivalent employee.
        </li>
        <li>All plans are billed monthly. Prices in Indian Rupees (₹). Applicable taxes extra. Cancel anytime.</li>
      </ul>
    </div>
  )
}
