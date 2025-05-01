/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useCallback, useEffect, useState } from 'react'

// グローバル Window に Telegram.WebApp がある前提
export default function Home() {
  const [headerVisible, setHeaderVisible] = useState(false)

  const handleFullscreen = useCallback(async () => {
    try {
      const el = document.documentElement
      if (el.requestFullscreen) {
        await el.requestFullscreen()
      } else if ((el as any).webkitRequestFullscreen) {
        await (el as any).webkitRequestFullscreen()
      } else if ((el as any).mozRequestFullScreen) {
        await (el as any).mozRequestFullScreen()
      } else if ((el as any).msRequestFullscreen) {
        await (el as any).msRequestFullscreen()
      }
    } catch (err) {
      console.error('Fullscreen failed:', err)
    }
  }, []);

  useEffect(() => {
    const tg = window.Telegram?.WebApp
    if (!tg) return

    tg.ready()
    tg.expand()
    tg.setHeaderColor('bg_color')
    handleFullscreen()

    const timeout = setTimeout(() => setHeaderVisible(true), 500)
    return () => clearTimeout(timeout)
  }, [handleFullscreen])

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
