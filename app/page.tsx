'use client'

import { useEffect, useState } from 'react'
import { init, viewport } from '@telegram-apps/sdk'

export default function Home() {
  const [headerVisible, setHeaderVisible] = useState(false)

  useEffect(() => {
    init()

    const tg = window.Telegram?.WebApp
    if (!tg) return

    tg.ready()
    viewport.expand()

    const timeout = setTimeout(() => setHeaderVisible(true), 500)
    return () => clearTimeout(timeout)
  }, [])

  const handleFullscreen = async () => {
    if (viewport.requestFullscreen.isAvailable()) {
      try {
        await viewport.requestFullscreen()
      } catch (err) {
        console.error('requestFullscreen failed:', err)
      }
    } else {
      console.warn('Fullscreen not supported on this platform.')
    }
  }

  return (
    <main className="min-h-screen bg-black text-white p-6 text-center">
      {/* 疑似ヘッダー */}
      <div
        className="fixed top-0 left-0 w-full h-12 bg-black text-white flex items-center justify-between px-4 z-50 transition-opacity duration-500"
        style={{ opacity: headerVisible ? 1 : 0 }}
      >
        <span className="text-sm">Hamster Fight Club</span>
        <button onClick={() => window.Telegram.WebApp.close()} className="text-sm">✕</button>
      </div>

      <div className="pt-16">
        <h1 className="text-2xl mb-6">Hello Telegram Mini App 👋</h1>
        <button
          onClick={handleFullscreen}
          className="bg-blue-600 text-white py-2 px-4 rounded"
        >
          フルスクリーンにする
        </button>
      </div>
    </main>
  )
}
