export default function WorkingHours() {
  return (
    <section className="mt-20 border border-[rgba(96,96,163,0.2)] rounded-xl p-8 bg-white">
      <h2 className="font-heading text-xl font-bold text-text-primary mb-6">Working Days & Business Hours</h2>
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="flex gap-3">
          <span className="text-sm font-medium text-text-primary">Working Days:</span>
          <span className="text-sm text-text-secondary">Monday to Friday</span>
        </div>
        <div className="flex gap-3">
          <span className="text-sm font-medium text-text-primary">Working Hours:</span>
          <span className="text-sm text-text-secondary">10:00 AM – 6:00 PM (IST)</span>
        </div>
      </div>
      <div className="text-sm text-text-secondary space-y-3">
        <p>
          <span className="font-medium text-text-primary">During working hours, our team is available for:</span>
          <br />
          Project execution &middot; Client communication &middot; Meetings & reviews &middot; Support requests
        </p>
        <p>
          <span className="font-medium text-text-primary">Weekends & Holidays:</span> Closed on Sundays and Public
          Holidays. Saturdays are conditional based on project needs.
        </p>
        <p>
          <span className="font-medium text-text-primary">Response Time:</span> Same-day during business hours.
          After-hours messages addressed next working day (10-11 AM planning window).
        </p>
      </div>
    </section>
  )
}
