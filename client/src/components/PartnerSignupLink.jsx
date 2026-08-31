export default function PartnerSignupLink({ href, className, children }) {
  const external = /^https?:\/\//i.test(href || '')
  return (
    <a
      href={href}
      className={className}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}
    </a>
  )
}
