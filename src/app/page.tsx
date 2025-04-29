'use client'

import { useEffect, useState } from 'react'

export default function Home() {
  const [userName, setUserName] = useState<string | null>(null)

  useEffect(() => {
    const tg = window.Telegram?.WebApp
    if (!tg) return

    tg.ready()
    tg.expand()

    const user = tg.initDataUnsafe?.user
    if (user) {
      setUserName(`${user.first_name} ${user.last_name ?? ''}`.trim())
    }
  }, [])

  const handleSend = () => {
    window.Telegram.WebApp.sendData('Hello from Next.js Mini App!')
  }

  return (
    <main className="p-6 text-center">
      <h1 className="text-2xl mb-4">Hello Telegram Mini App 👋</h1>
      {userName && <p className="mb-4">Welcome, {userName}!</p>}
      <button
        onClick={handleSend}
        className="bg-blue-600 text-white py-2 px-4 rounded"
      >
        sendData() を送信
      </button>
    </main>
  )
}
