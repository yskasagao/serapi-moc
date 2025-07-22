import puppeteer from 'puppeteer'
import prisma from '../lib/prisma'

type SerapistListData = {
  userName: string
  shopName: string
  pageLink: string
}
const paserSerapistList = (): SerapistListData[] | null => {
  const listElement = document.querySelectorAll('.cast_list_wrap > li')
  if (!listElement) {
    return null
  }
  return Array.from(listElement).map((container) => {
    const pageLink = container.querySelector<HTMLLinkElement>('.cast_image > a')?.href
    const userName = container.querySelector('.name > a')?.textContent
    const shopName = container.querySelector('.shop_name')?.textContent
    return {
      userName: userName ?? '',
      shopName: shopName ?? '',
      pageLink: pageLink ?? '',
    }
  })
}

type SerapistDetail = {
  areaName: string
  twitterAccount: string
  instagramAccount: string
  age: number | undefined
  weight: number | undefined
  height: number | undefined
}
const parseSerapistDetail = (): SerapistDetail => {
  const areaName = document.querySelector('.shop_data > li:nth-child(3) a')?.textContent ?? ''

  const nameAge = document.querySelector('.cast-name > h2')?.textContent ?? ''
  const ageMatch = nameAge.match(/([0-9０-９]){2}/g)
  const age = ageMatch != null ? Number(ageMatch[0]) : undefined
  const castSize = document.querySelector('.cast-size > span')?.textContent ?? ''
  const castSizeTokens = castSize.split('/')
  const height =
    castSizeTokens.length > 0 ? Number(castSizeTokens[0]?.trim().replace('cm', '')) : undefined
  const weight =
    castSizeTokens.length > 0 ? Number(castSizeTokens[1]?.trim().replace('kg', '')) : undefined
  const twitterAccount = (() => {
    const linkElement = document.querySelector('.profile_info_sns .sns_icon')
    if (!linkElement) {
      return undefined
    }
    // jsのclickイベントを文字列にしてその中から取得する
    // e.g.
    //'function onclick(event) {\n' +
    //     "window.open('https://twitter.com/candy_osakaREIT', '_blank');  return false;\n" +
    //     '}'
    const match = (linkElement as HTMLSpanElement).onclick
      ?.toString()
      .match(/(https|http):\/\/(twitter.com)\/([A-Za-z0-9_]*)/)
    return match ? match[0] : ''
  })()
  const instagramAccount = (() => {
    const linkElement = document.querySelector('.profile_info_sns > span:nth-of-type(2)')
    if (!linkElement) {
      return undefined
    }
    // jsのclickイベントを文字列にしてその中から取得する
    // e.g.
    //'function onclick(event) {\n' +
    //     "window.open('https://twitter.com/candy_osakaREIT', '_blank');  return false;\n" +
    //     '}'
    const match = (linkElement as HTMLSpanElement).onclick
      ?.toString()
      .match(/(https|http):\/\/(instagram.com)\/([A-Za-z0-9_.]*)/)
    return match ? match[0] : ''
  })()
  return {
    areaName,
    twitterAccount: twitterAccount ?? '',
    instagramAccount: instagramAccount ?? '',
    age,
    weight,
    height,
  }
}

const crawl = async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] })
  const page = await browser.newPage()
  await page.goto('https://kaikan.co/therapist/')
  let crawlEnd = false
  let currentPage = 1
  while (!crawlEnd) {
    console.log('current page:', currentPage)
    const currentSerapists = await page.evaluate(paserSerapistList)
    const nextLink = await page.evaluate(() => {
      const nextLinks = document.querySelectorAll('nav > ul.pagination_list  a')
      if (nextLinks.length === 0) {
        return null
      }
      let _next: number | undefined = undefined
      nextLinks.forEach((v, index) => {
        if (v.classList.contains('current')) {
          _next = index
        }
      })
      if (_next !== undefined && _next < nextLinks.length - 1) {
        const index = Number(_next) + 1
        return (nextLinks[index] as HTMLLinkElement).href
      }
      return null
    })
    console.log('next:link', nextLink)
    if (currentSerapists) {
      for (const serapist of currentSerapists) {
        const pageLink = serapist.pageLink
        await page.goto(pageLink)
        const userData = await page.evaluate(parseSerapistDetail)
        const kaikanRawData = await prisma.kaikanTherapist.findFirst({
          where: {
            crawlPage: pageLink,
          },
        })
        if (!kaikanRawData) {
          await prisma.kaikanTherapist.create({
            data: {
              name: serapist.userName,
              shopName: serapist.shopName,
              areaName: userData.areaName,
              crawlPage: pageLink,
              twitter: userData.twitterAccount,
              instagram: userData.instagramAccount,
              age: userData.age,
              weight: userData.weight,
              height: userData.height,
            },
          })
        } else {
          await prisma.kaikanTherapist.update({
            where: {
              id: kaikanRawData?.id,
            },
            data: {
              name: serapist.userName,
              shopName: serapist.shopName,
              areaName: userData.areaName,
              crawlPage: pageLink,
              twitter: userData.twitterAccount,
              instagram: userData.instagramAccount,
              age: userData.age,
              weight: userData.weight,
              height: userData.height,
            },
          })
        }
      }
    }
    if (nextLink) {
      const url = new URL(nextLink)
      const params = url.searchParams
      const nextPage = Number(params.get('p') ?? 0)
      if (currentPage < nextPage) {
        console.log(`change next page ${currentPage} -> ${nextPage}`)
        await page.goto(nextLink)
        await page.waitForTimeout(3000)
        currentPage = nextPage
      } else {
        crawlEnd = true
      }
    } else {
      crawlEnd = true
    }
  }
  console.groupEnd()
  await browser.close()
  process.exit(1)
}
await crawl()
