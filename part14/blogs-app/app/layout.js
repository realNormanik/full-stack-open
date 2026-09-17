import "./globals.css"
import AuthSessionProvider from "./components/SessionProvider"
import NavBar from "./components/NavBar"

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthSessionProvider>
          <NavBar />
          <main>{children}</main>
        </AuthSessionProvider>
      </body>
    </html>
  )
}