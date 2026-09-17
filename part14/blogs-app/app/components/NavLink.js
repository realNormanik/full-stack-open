import Link from "next/link"

export default function NavLink({ href, children }) {
  return <Link href={href} className="hover:text-gray-300">{children}</Link>
}