"use client"
import { createContext, useContext, useState } from "react"

const NotificationContext = createContext({
  message: "",
  type: "success",
  showNotification: () => {},
})

export const NotificationProvider = ({ children }) => {
  const [message, setMessage] = useState("")
  const [type, setType] = useState("success")

  const showNotification = (msg, notifType = "success") => {
    setMessage(msg)
    setType(notifType)
    setTimeout(() => setMessage(""), 5000)
  }

  return (
    <NotificationContext value={{ message, type, showNotification }}>
      {children}
    </NotificationContext>
  )
}

export const useNotification = () => useContext(NotificationContext)