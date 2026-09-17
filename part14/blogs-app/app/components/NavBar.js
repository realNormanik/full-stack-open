"use client"
import Link from "next/link"
import { useSession, signOut } from "next-auth/react"

export default function NavBar() {
  const { data: session } = useSession()

  return (
    <nav>
      <Link href="/">home</Link>
      {" | "}
      <Link href="/blogs">blogs</Link>
      {" | "}
      {session ? (
        <>
          <Link href="/blogs/new">create new</Link>
          {" | "}
          <Link href="/me">{session.user?.name}</Link>{" "}
          <button onClick={() => signOut({ redirectTo: "/" })}>logout</button>
        </>
      ) : (
        <>
          <Link href="/login">login</Link>
          {" | "}
          <Link href="/register">register</Link>
        </>
      )}
    </nav>
  )
}