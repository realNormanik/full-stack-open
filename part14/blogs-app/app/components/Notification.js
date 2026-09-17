"use client"
import { useNotification } from "./NotificationContext"

export default function Notification() {
  const { message, type } = useNotification()
  if (!message) return null

  return (
    <div className={`mx-auto max-w-2xl my-3 rounded px-4 py-2 text-white ${
      type === "success" ? "bg-green-600" : "bg-red-600"
    }`}>
      {message}
    </div>
  )
}