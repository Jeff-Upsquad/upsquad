export const metadata = {
  title: 'Contact Us – UpSquad',
  description: 'Get in touch with UpSquad. Email us, call us, or visit our office.'
}

export default function Contact() {
  return (
    <section className="pt-32 pb-20 px-5 sm:px-8">
      <div className="max-w-[1160px] mx-auto">
        <div className="inline-flex items-center gap-2 text-xs font-medium text-text-primary bg-brand-purple/10 border border-brand-purple/20 px-3 py-1.5 rounded-full mb-8">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path>
          </svg>
          Contact Us
        </div>
        <h1 className="font-heading text-4xl sm:text-5xl font-extrabold leading-[1.15] tracking-tight mb-4 text-text-primary">UpSquad</h1>
        <p className="text-base text-text-secondary mb-16">Upsquad is a brand from D-VAR DYNAMICS TECHNOLOGIES PVT LTD.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-[rgba(96,96,163,0.2)] rounded-xl p-8 shadow-sm hover:shadow-card-hover transition-all duration-short">
            <h2 className="font-heading text-lg font-semibold text-text-primary mb-4">Email Us</h2>
            <a href="mailto:hello@upsquadconnect.com" className="inline-block btn-gradient text-sm font-medium px-4 py-2 rounded-lg transition-colors mb-4">hello@upsquadconnect.com</a>
            <p className="text-sm text-text-secondary leading-relaxed">For any inquiries or assistance, feel free to email us. We aim to respond within 24 hours.</p>
          </div>
          <div className="bg-white border border-[rgba(96,96,163,0.2)] rounded-xl p-8 shadow-sm hover:shadow-card-hover transition-all duration-short">
            <h2 className="font-heading text-lg font-semibold text-text-primary mb-4">Call Us</h2>
            <a href="tel:+919995566382" className="inline-block btn-gradient text-sm font-medium px-4 py-2 rounded-lg transition-colors mb-4">+919995566382</a>
            <p className="text-sm text-text-secondary leading-relaxed">Our customer support team is available Monday to Friday, 10 AM to 6 PM (IST).</p>
          </div>
          <div className="bg-white border border-[rgba(96,96,163,0.2)] rounded-xl p-8 shadow-sm hover:shadow-card-hover transition-all duration-short">
            <h2 className="font-heading text-lg font-semibold text-text-primary mb-4">Address</h2>
            <p className="text-sm text-slate-700 font-medium mb-4">Panadans, CUSAT, Kalamassery, Kochi, Kerala 682022</p>
            <a href="https://maps.google.com/?q=Panadans,CUSAT,Kalamassery,Kochi,Kerala+682022" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-text-primary hover:opacity-70 font-medium transition-colors mb-5">
              Open in Maps
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
              </svg>
            </a>
            <div className="rounded-xl overflow-hidden border border-[rgba(96,96,163,0.2)] w-full" style={{ height: '200px' }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.8!2d76.329!3d10.042!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080d514abec6b1%3A0x2ea9d6b1f68c6b6!2sCUSAT%2C%20Kalamassery%2C%20Kochi%2C%20Kerala%20682022!5e0!3m2!1sen!2sin!4v1"
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
