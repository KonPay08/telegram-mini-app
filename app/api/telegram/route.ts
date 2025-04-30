/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/telegram/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { Telegraf } from 'telegraf'

const bot = new Telegraf(process.env.BOT_TOKEN!)

// ① /play コマンドのハンドラ
bot.command('play', ctx => {
  return ctx.reply('▶ Play the game!', {
    reply_markup: {
      inline_keyboard: [[{ text: '▶ Play', callback_game: {} }]]
    }
  })
})

// ② callback_query を受けてゲーム URL を返す
bot.on('callback_query', async ctx => {
  if ((ctx.callbackQuery as any).game_short_name === 'react_game') {
    await ctx.answerGameQuery('https://telegram-react-game.vercel.app/')
  }
})


export const POST = async (req: NextRequest) => {
  const body = await req.json()
  await bot.handleUpdate(body)
  return NextResponse.json({ ok: true })
}

export const config = {
  api: { bodyParser: false }
}
