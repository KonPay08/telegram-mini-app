/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useEffect } from 'react'

export default function Home() {
  useEffect(() => {
    const tg = window.Telegram?.WebApp
    if (!tg) return

    tg.ready()
    tg.expand()
  }, [])

  const handleFullscreen = () => {
    const el = document.documentElement
    if (el.requestFullscreen) {
      el.requestFullscreen()
    } else if ((el as any).webkitRequestFullscreen) {
      (el as any).webkitRequestFullscreen()
    } else if ((el as any).mozRequestFullScreen) {
      (el as any).mozRequestFullScreen()
    } else if ((el as any).msRequestFullscreen) {
      (el as any).msRequestFullscreen()
    }
  }

  return (
    <main className="min-h-screen bg-black text-white p-6 text-center">
      <h1 className="text-2xl mb-6">Hello Telegram Mini App 👋</h1>

      <button
        onClick={handleFullscreen}
        className="bg-blue-600 text-white py-2 px-4 rounded mb-4"
      >
        フルスクリーンにする
      </button>
    </main>
  )
}
