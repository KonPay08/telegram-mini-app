import { Telegraf } from 'telegraf'
import { NextRequest, NextResponse } from 'next/server'

const bot = new Telegraf(process.env.BOT_TOKEN!)

// ✅ /app コマンド → WebApp を開くボタンを返す
bot.command('app', ctx => {
  ctx.reply('Open the Mini App', {
    reply_markup: {
      inline_keyboard: [[
        {
          text: '🚀 Launch App',
          web_app: {
            url: 'https://telegram-mini-app-omega-ten.vercel.app/'
          }
        }
      ]]
    }
  })
})

// ✅ Webhook で受け取って処理
export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json()
    await bot.handleUpdate(body)
    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('Webhook error', e)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}

export const GET = () => {
  return new Response(JSON.stringify({ ok: true }))
}
