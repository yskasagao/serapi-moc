import puppeteer from 'puppeteer'
import { areaGroupMap } from '../lib/constants'
import prisma from '../lib/prisma'

type ShopListData = {
  name: string
  areaNames: string[]
  pageLink: string
}
const parseShopList = (): ShopListData[] | null => {
  const listElement = document.querySelectorAll('.shop_list_wrap > li.shop_list_frame')
  if (!listElement) {
    return null
  }
  return Array.from(listElement).map((container) => {
    const pageLink = container.querySelector<HTMLLinkElement>('._shop_name > a')?.href
    const name = container.querySelector<HTMLLinkElement>('._shop_name > a')?.textContent
    const areaToken = container.querySelector('._shop_area_genre > span.area')?.textContent
    return {
      name: name ?? '',
      areaNames: areaToken ? areaToken.split('・') : [],
      pageLink: pageLink ?? '',
    }
  })
}

type ShopDetaill = {
  shopLink: string
}
const parseShopDetail = (): ShopDetaill => {
  const shopLink =
    document.querySelector<HTMLLinkElement>('.shop_data > li.data-row-last a')?.href ?? ''
  return {
    shopLink,
  }
}

const crawl = async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox'],
  })
  const page = await browser.newPage()
  await page.goto('https://kaikan.co/shop/')
  let crawlEnd = false
  let currentPage = 1
  while (!crawlEnd) {
    console.log('current page:', currentPage)
    const currentShopLists = await page.evaluate(parseShopList)
    const nextLink = await page.evaluate(() => {
      const nextLinks = document.querySelectorAll('li.navi > a.next')
      if (nextLinks.length === 0) {
        return null
      }
      // 同様のclass名でprev,nextを扱っているので末尾を取るように
      return (nextLinks[nextLinks.length - 1] as HTMLLinkElement).href
    })
    //
    if (currentShopLists) {
      for (const shop of currentShopLists) {
        console.log('shop:', shop)
        const pageLink = shop.pageLink
        await page.goto(pageLink)
        const shopData = await page.evaluate(parseShopDetail)

        const storedShop = await prisma.shop.findFirst({
          where: {
            name: shop.name,
          },
        })
        if (storedShop) {
          await prisma.shop.update({
            data: {
              url: shopData.shopLink,
            },
            where: {
              id: storedShop.id,
            },
          })
        } else {
          const areas = shop.areaNames
            .map((v) => {
              const areaGroup = areaGroupMap.get(v)
              if (!areaGroup) {
                return undefined
              }
              return {
                area: v,
                areaGroup,
              }
            })
            .filter((item): item is NonNullable<typeof item> => item != undefined)
          await prisma.shop.create({
            data: {
              name: shop.name,
              url: shopData.shopLink,
              areas: {
                create: areas,
              },
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
