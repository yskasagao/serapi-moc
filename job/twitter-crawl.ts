import * as dotenv from 'dotenv'
import puppeteer from 'puppeteer'
import prisma from '../lib/prisma'
const crawl = async () => {
  dotenv.config({ path: __dirname + '/../.env' })
  const targets = await prisma.kaikanTherapist.findMany({
    where: {
      NOT: {
        twitter: '',
      },
      AND: {
        instagram: undefined,
      },
    },
  })
  const tiktokAccountRegex = /https?:\/\/(www\.tiktok\.com|tiktok\.com)\/@(.+)/
  const browser = await puppeteer.launch({ headless: 'new' })
  const page = await browser.newPage()
  await page.goto('https://twitter.com/i/flow/login')
  await page.waitForNetworkIdle({ idleTime: 1500 })
  await page.waitForSelector('[autocomplete=username]')
  await page.type('input[autocomplete=username]', process.env.CRAWL_TWITTER_ACCOUNT ?? '', {
    delay: 50,
  })
  await page.evaluate(() =>
    (document.querySelectorAll('div[role="button"]')[2] as HTMLDivElement).click(),
  )
  await page.waitForNetworkIdle({ idleTime: 1500 })
  await page.type(
    'input[autocomplete=current-password]',
    process.env.CRAWL_TWITTER_PASSWORD ?? '',
    {
      delay: 50,
    },
  )
  await page.evaluate(() =>
    (document.querySelectorAll('div[role="button"]')[2] as HTMLDivElement).click(),
  )
  await page.waitForNetworkIdle({ idleTime: 1500 })

  // ターゲットのページに遷移して解析
  for (const target of targets) {
    console.log('start:', target.twitter)
    if (!target.twitter.startsWith('http')) {
      console.log('invalid url:', target.twitter)
      continue
    }
    await page.goto(target.twitter.trim())
    await page.waitForNetworkIdle({ idleTime: 1500 })
    let tiktokAccount: string | undefined = undefined
    const tiktokUrl = await page.evaluate(() => {
      const bio = document.querySelector('div[data-testid=UserDescription]')
      if (!bio) {
        return undefined
      }
      const linkTexts = Array.from(bio.querySelectorAll('a')).map((a) => {
        // リンクの省略文字を削除
        return a.innerText.replace('…', '')
      })
      return linkTexts.find((url) => {
        // memo: evaluateの引数でtiktokAccountRegexを渡した場合、マッチしなくなる
        const match = /https?:\/\/(www\.tiktok\.com|tiktok\.com)\/@(.+)/.exec(url)
        return !!match
      })
    })
    if (tiktokUrl) {
      const match = tiktokAccountRegex.exec(tiktokUrl)
      if (match) {
        tiktokAccount = match[2]
      }
    } else {
      // bioからtiktokのアカウントが取得できない場合
      const userUrl = await page.evaluate(() => {
        const link = document.querySelector<HTMLLinkElement>('a[data-testid=UserUrl]')
        if (!link) {
          return undefined
        }
        // linkにtiktokが含まれる場合のみ
        if (link.innerText.includes('tiktok.com')) {
          return link.href
        }
      })
      // userUrlのページに飛んでそのurlがtiktokのページだった場合はアカウントとみなす
      if (userUrl) {
        await page.goto(userUrl)
        await page.waitForNetworkIdle({ idleTime: 1500 })
        const pageUrl = page.url()
        const match = tiktokAccountRegex.exec(pageUrl)
        if (match) {
          tiktokAccount = match[2]
        }
      }
    }
    if (tiktokAccount) {
      await prisma.kaikanTherapist.update({
        data: {
          tiktok: tiktokAccount,
        },
        where: {
          id: target.id,
        },
      })
    }
    console.log('end:', target.twitter)
  }
  await browser.close()
  process.exit(1)
}
await crawl()
