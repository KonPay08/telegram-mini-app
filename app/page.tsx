'use client'

import { useEffect, useState } from 'react'

export default function Home() {
  const [headerVisible, setHeaderVisible] = useState(false)

  useEffect(() => {
    const tg = window.Telegram?.WebApp
    if (!tg) return

    tg.ready()
    tg.expand()
    tg.setHeaderColor('bg_color')

    // 0.5秒後に自作ヘッダーを表示（Telegramヘッダーとの切り替え感を演出）
    const timeout = setTimeout(() => setHeaderVisible(true), 500)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <main className="min-h-screen bg-black text-white p-6 text-center">
      {/* 疑似ヘッダーを遅延表示 */}
      <div
        className="fixed top-0 left-0 w-full h-12 bg-black text-white flex items-center justify-between px-4 z-50 transition-opacity duration-500"
        style={{ opacity: headerVisible ? 1 : 0 }}
      >
        <span className="text-sm">Hamster Fight Club</span>
        <button onClick={() => window.Telegram.WebApp.close()} className="text-sm">✕</button>
      </div>

      <div className="pt-16">
        <h1 className="text-2xl mb-6">Hello Telegram Mini App 👋</h1>
      </div>
    </main>
  )
}