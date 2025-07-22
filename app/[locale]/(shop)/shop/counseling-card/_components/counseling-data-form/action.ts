'use server'

import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth/next'
import { z } from 'zod'
import { getAuthOptions } from '@/lib/auth'
import prisma from '@/lib/company-prisma'
import { HttpError } from '@/lib/error'
import { fetchOauthToken } from '@/lib/server-only/line/fetch-oauth-token'

type PushMessageResult = {
  token_type: string
  access_token: string
  expires_in: number
}

const pushMessage = async (
  userId: string,
  channelAccessToken: string,
): Promise<PushMessageResult> => {
  const headers = new Headers({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${channelAccessToken}`,
  })
  return fetch(`https://api.line.me/v2/bot/message/push`, {
    method: 'POST',
    cache: 'no-store',
    headers,
    body: JSON.stringify({
      to: userId,
      messages: [
        {
          type: 'text',
          text: `入力ありがとうございました。折り返し連絡致しますので今しばらくお待ちください。`,
        },
      ],
      notificationDisabled: false,
    }),
  }).then((res) => {
    if (!res.ok) {
      throw new HttpError(res)
    }
    return res.json() as unknown as PushMessageResult
  })
}

type Result =
  | {
      success: true
    }
  | {
      success: false
      error: string
    }

const CounselingSchema = z.object({
  reserveDataId: z.string().cuid(),
  hasExperience: z.enum(['いいえ', 'はい']),
  //reason: z.enum(['興味がある', 'ストレス解消したい', '性欲を満たしたい', '非日常を味わいたい']),
  reason: z.string(),
  sm: z.string(),
  //massage: z.enum(['目', '首', '背中', '肩', '腕', '腰', 'お尻', '太もも', 'ふくらはぎ', '足裏']),
  massage: z.string(),
  //shower: z.enum(['一緒に入浴したい', '後から入ってきて欲しい', '1人で入浴したい']),
  shower: z.string(),
  //massageToSensualRatio: z.enum(['マッサージ多め', '性感多め', '癒し多め', '話しながら決めたい']),
  massageToSensualRatio: z.string(),
  targetZones: z.string(),
  //talk: z.enum(['楽しく過ごしたい', '静かに過ごしたい', 'おまかせ']),
  talk: z.string(),
  //bodyContact: z.enum(['イチャイチャしたい', '肌の密着には抵抗がある', 'おまかせ']),
  bodyContact: z.string(),
  other: z.string(),
})

export const save = async (formData: FormData): Promise<Result | undefined> => {
  const parsed = CounselingSchema.safeParse({
    ...Object.fromEntries(formData.entries()),
  })
  if (!parsed.success) {
    console.error(parsed.error)
    return { success: false, error: 'パラメーターが不正です' }
  }
  const reservationData = await prisma.reservationData.findFirst({
    where: {
      id: parsed.data.reserveDataId,
      counselingDataId: undefined,
    },
    include: {
      LineReservationToken: {
        select: {
          lineUserId: true,
        },
      },
    },
  })
  if (!reservationData) {
    return {
      success: false,
      error: '予約データが存在しない、もしくは既にカウンセリングカードが提出されています',
    }
  }
  const session = await getServerSession(getAuthOptions())

  await prisma.$transaction(async (tx) => {
    const data = await tx.counselingData.create({
      data: {
        userId: session ? session.user.id : undefined,
        hasExperience: parsed.data.hasExperience === 'はい',
        companyId: reservationData.companyId,
        reason: parsed.data.reason,
        sm: parsed.data.sm,
        massage: parsed.data.massage,
        shower: parsed.data.shower,
        massageToSensualRatio: parsed.data.massageToSensualRatio,
        targetZones: parsed.data.targetZones,
        talk: parsed.data.talk,
        bodyContact: parsed.data.bodyContact,
        other: parsed.data.other,
      },
    })
    await tx.reservationData.update({
      data: {
        counselingDataId: data.id,
      },
      where: {
        id: reservationData.id,
      },
    })
  })
  const ret = await fetchOauthToken(process.env.LIEN_CHANNEL_ID, process.env.LINE_CHANNEL_SECRET)
  try {
    if (reservationData.LineReservationToken) {
      await pushMessage(reservationData.LineReservationToken.lineUserId, ret.access_token)
    }
  } catch (e) {
    console.error(e)
  }
  redirect(`/shop/counseling-card/completed`)
}
