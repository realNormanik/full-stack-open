import { redirect } from "next/navigation"
import { getCurrentUser } from "../services/session"
import { generateToken } from "../actions/token"

export default async function MePage() {
  const user = await getCurrentUser()
  if (!user) redirect("/login")

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">{user.name}</h2>
      <p>username: {user.username}</p>
      <p className="mt-4">
        {user.token ? <code>{user.token}</code> : "no token generated yet"}
      </p>
      <form action={generateToken}>
        <button type="submit" className="mt-2 bg-blue-600 text-white px-4 py-2 rounded">
          generate token
        </button>
      </form>
    </div>
  )
}