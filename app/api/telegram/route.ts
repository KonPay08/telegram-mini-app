/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextRequest, NextResponse } from 'next/server'
import { Telegraf } from 'telegraf'

const bot = new Telegraf(process.env.BOT_TOKEN!)

// ✅ /play コマンドでゲーム起動ボタンを送信
bot.command('play', ctx => {
  return ctx.replyWithGame('react_game', {
    reply_markup: {
      inline_keyboard: [[
        { text: '▶ Play', callback_game: {} }
      ]]
    }
  })
})

// ✅ ボタン押下時にゲームURLを返す
bot.on('callback_query', async ctx => {
  const payload = ctx.callbackQuery as any
  if (payload.game_short_name === 'react_game') {
    await ctx.answerGameQuery('https://telegram-react-game.vercel.app/')
  }
})

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json()
    console.log('🔔 Telegram update received:', JSON.stringify(body))
    await bot.handleUpdate(body)
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('❌ Telegram handler error:', error)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}