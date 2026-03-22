"use client"
export default function About() {
  return (
    <section className="py-16 px-5 sm:px-8 bg-white border-y border-gray-100">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-[180px_1fr] gap-10 items-start">
          {/* Label */}
          <div className="pt-1">
            <span className="text-xs font-medium text-gray-400 uppercase tracking-widest">About Us</span>
          </div>

          {/* Content */}
          <div className="max-w-2xl">
            <p className="text-lg text-gray-800 leading-relaxed mb-4 font-medium">
              The Future of Work Starts Here
            </p>
            <p className="text-base text-gray-500 leading-relaxed mb-4">
              UpSquad is a new way for businesses to build teams — without the complexity of
              traditional hiring.
            </p>
            <p className="text-base text-gray-500 leading-relaxed mb-4">
              Instead of recruiting full-time or part-time employees, businesses can subscribe to
              UpSquad and access skilled professionals on demand. From design and development to
              marketing and operations, you get the talent you need — when you need it.
            </p>
            <p className="text-base text-gray-500 leading-relaxed">
              Built for startups, growing brands, and modern businesses that want flexibility,
              UpSquad helps you move faster without the cost and commitment of traditional hiring.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
