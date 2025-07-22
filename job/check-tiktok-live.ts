import axios from 'axios'
import dayjs from 'dayjs'
import * as dotenv from 'dotenv'
import prisma from '../lib/prisma'
const sleep = (delay = 2000) => {
  return new Promise((resolve) => setTimeout(resolve, delay))
}
type signatureResponse = {
  status: string
  data: {
    signature: string
    verify_fp: string
    signed_url: string
    'x-tt-params': string
    'x-bogus': string
    navigator: {
      user_agent: string
    }
  }
}
type UserInfo = {
  roomId?: string
  secUid: string
  avatarLarger: string
}

type UserDetailResponse = {
  userInfo: {
    stats: {
      followerCount: number
      videoCount: number
    }
    user: UserInfo
  }
}

// 優先度が高いserapister top 100のtiktokのlive判定を行う
// このlive判定はキャッシュを参照せず、毎回live判定を行う
// 判定を行なった結果liveをしている場合は1dayのキャッシュ有効にする
const run = async () => {
  dotenv.config({ path: __dirname + '/../.env' })
  const targets = await prisma.serapistar.findMany({
    where: {
      NOT: {
        tiktok: '',
      },
    },
    select: {
      id: true,
      tiktok: true,
      SerapistarTiktokInfo: true,
    },
    orderBy: [
      {
        priority: 'desc',
      },
      {
        id: 'desc',
      },
    ],
    take: 100,
  })
  const expires = dayjs().add(1, 'day').toDate()
  const setting = await prisma.tiktokCrawlerSetting.findFirstOrThrow()
  const queryParams = {
    aid: 1988,
    app_language: 'ja-JP',
    app_name: 'tiktok_web',
    browser_language: 'ja',
    browser_name: 'Mozilla',
    browser_online: true,
    browser_platform: 'MacIntel',
    browser_version:
      '5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
    channel: 'tiktok_web',
    cookie_enabled: true,
    device_id: '7233730580234847746',
    device_platform: 'web_pc',
    focus_state: true,
    from_page: 'user',
    history_len: 14,
    is_fullscreen: true,
    is_page_visible: true,
    language: 'ja-JP',
    os: 'mac',
    priority_region: '',
    referer: '',
    region: 'JP',
    screen_height: 1440,
    screen_width: 2560,
    tz_name: 'Asia/Tokyo',
    webcast_language: 'ja-JP',
    msToken: setting.mstoken,
  }

  for (const target of targets) {
    // キャッシュが有効な場合は行わない
    if (target.SerapistarTiktokInfo && dayjs().isBefore(target.SerapistarTiktokInfo.expiresAt)) {
      // continue
    }
    const qsObject = target.SerapistarTiktokInfo?.secUid
      ? new URLSearchParams({
          ...queryParams,
          uniqueId: target.tiktok,
          secUid: target.SerapistarTiktokInfo?.secUid,
        } as never)
      : new URLSearchParams({ ...queryParams, uniqueId: target.tiktok } as never)
    const qs = qsObject.toString()
    const unsignedUrl = `https://www.tiktok.com/api/user/detail/?${qs}`
    try {
      const ret = await axios.post<signatureResponse>(
        `${process.env.TIKTOK_PROXY_URL}/signature`,
        unsignedUrl,
      )
      const options = {
        method: 'GET',
        headers: {
          'user-agent': ret.data.data.navigator.user_agent,
          Cookie: `ttwid=${setting.ttwid}; msToken=${setting.mstoken}; sessionid=${setting.sessionid};sessionid_ss=${setting.sessionid};`,
        },
        url: ret.data.data.signed_url,
      }
      const userInfo = await axios<UserDetailResponse>(options)
      const isLive = userInfo.data.userInfo.user.roomId !== undefined
      if (!target.SerapistarTiktokInfo) {
        await prisma.serapistarTiktokInfo.create({
          data: {
            serapistarId: target.id,
            isLive,
            expiresAt: isLive ? expires : null,
            lastLivedAt: isLive ? dayjs().toDate() : null,
            secUid: userInfo.data.userInfo.user.secUid,
            avatar: userInfo.data.userInfo.user.avatarLarger,
            followerCount: userInfo.data.userInfo.stats.followerCount,
            videoCount: userInfo.data.userInfo.stats.videoCount,
          },
        })
        // ライブを行っている場合はライブした回数をカウントアップ
        if (isLive) {
          await prisma.serapistar.update({
            data: {
              livedCount: {
                increment: 1,
              },
            },
            where: {
              id: target.id,
            },
          })
        }
      } else {
        await prisma.serapistarTiktokInfo.update({
          data: {
            serapistarId: target.id,
            isLive,
            expiresAt: isLive ? expires : null,
            lastLivedAt: isLive ? dayjs().toDate() : target.SerapistarTiktokInfo.lastLivedAt,
            secUid: userInfo.data.userInfo.user.secUid || target.SerapistarTiktokInfo.secUid,
            avatar: userInfo.data.userInfo.user.avatarLarger,
            followerCount: userInfo.data.userInfo.stats.followerCount,
            videoCount: userInfo.data.userInfo.stats.videoCount,
          },
          where: {
            id: target.SerapistarTiktokInfo.id,
          },
        })
        // ライブを行っている場合はライブした回数をカウントアップ
        if (isLive) {
          await prisma.serapistar.update({
            data: {
              livedCount: {
                increment: 1,
              },
            },
            where: {
              id: target.id,
            },
          })
        }
      }
    } catch (e) {
      console.error('check live error:', e)
    }
    await sleep(1000)
  }
  process.exit(1)
}
void run()
