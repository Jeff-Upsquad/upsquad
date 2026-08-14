import Link from 'next/link'

export default function SignupCta({
  className = 'btn-gradient text-sm font-semibold px-7 py-3.5',
  children = 'Sign up',
}) {
  return (
    <Link href="/signup" className={className}>
      {children}
    </Link>
  )
}
