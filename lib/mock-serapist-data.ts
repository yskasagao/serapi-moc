import type { SerapistarDetail } from '@/app/[locale]/(web)/therapists/[slug]/_components/serapister-view/type'

// Mock therapist data for development environment
export const MOCK_SERAPIST_DATA: SerapistarDetail = {
  id: 'mock-serapist-id-1',
  slug: '3YSiF88rv9qF',
  nickname: 'ゆい',
  avatar: 'https://via.placeholder.com/200x200?text=ゆい',
  tiktok: 'yui_sample',
  SerapisterParameter: {
    looks: 4,
    service: 5,
    physical: 4,
    repeat: 5,
    like: 4,
  },
  comments: [
    {
      text: '素晴らしいセラピストさんでした！とても癒されました。',
      textZhHans: '',
      isAnonymous: false,
      dummyUserIcon: null,
      isPublic: true,
      User: {
        name: '体験者A',
        image: 'https://via.placeholder.com/50x50?text=A',
      },
    },
    {
      text: 'また利用したいと思います。ありがとうございました。',
      textZhHans: '',
      isAnonymous: true,
      dummyUserIcon: 'https://via.placeholder.com/50x50?text=匿名',
      isPublic: true,
      User: null,
    },
    {
      text: '技術も人柄も最高でした。おすすめです！',
      textZhHans: '',
      isAnonymous: false,
      dummyUserIcon: null,
      isPublic: true,
      User: {
        name: '体験者B',
        image: 'https://via.placeholder.com/50x50?text=B',
      },
    },
  ],
}

// Sample therapist list with CUID-like slugs
export const MOCK_SERAPIST_LIST: Record<string, SerapistarDetail> = {
  '3YSiF88rv9qF': {
    ...MOCK_SERAPIST_DATA,
    id: 'mock-serapist-id-1',
    slug: '3YSiF88rv9qF',
    nickname: 'ゆい',
    avatar: 'https://via.placeholder.com/200x200?text=ゆい',
    tiktok: 'yui_sample',
  },
  'kL9mN2pQ5rTx': {
    ...MOCK_SERAPIST_DATA,
    id: 'mock-serapist-id-2',
    slug: 'kL9mN2pQ5rTx',
    nickname: 'あい',
    avatar: 'https://via.placeholder.com/200x200?text=あい',
    tiktok: 'ai_sample',
    SerapisterParameter: {
      looks: 5,
      service: 4,
      physical: 5,
      repeat: 4,
      like: 5,
    },
  },
  'wX8vY7zB4cDe': {
    ...MOCK_SERAPIST_DATA,
    id: 'mock-serapist-id-3',
    slug: 'wX8vY7zB4cDe',
    nickname: 'みか',
    avatar: 'https://via.placeholder.com/200x200?text=みか',
    tiktok: 'mika_sample',
    SerapisterParameter: {
      looks: 4,
      service: 4,
      physical: 4,
      repeat: 4,
      like: 4,
    },
  },
  'fH6gJ5kM3nPr': {
    ...MOCK_SERAPIST_DATA,
    id: 'mock-serapist-id-4',
    slug: 'fH6gJ5kM3nPr',
    nickname: 'さくら',
    avatar: 'https://via.placeholder.com/200x200?text=さくら',
    tiktok: 'sakura_sample',
    SerapisterParameter: {
      looks: 5,
      service: 5,
      physical: 4,
      repeat: 5,
      like: 5,
    },
  },
  'qA2sD4fG6hJk': {
    ...MOCK_SERAPIST_DATA,
    id: 'mock-serapist-id-5',
    slug: 'qA2sD4fG6hJk',
    nickname: 'りん',
    avatar: 'https://via.placeholder.com/200x200?text=りん',
    tiktok: 'rin_sample',
    SerapisterParameter: {
      looks: 4,
      service: 5,
      physical: 5,
      repeat: 4,
      like: 4,
    },
  },
}

/**
 * Get mock therapist data by slug in development environment
 */
export const getMockSerapistBySlug = (slug: string): SerapistarDetail | null => {
  if (process.env.USE_MOCK_DATA === 'true') {
    return MOCK_SERAPIST_LIST[slug] || null
  }
  return null
}

/**
 * Available therapist slugs for development environment
 */
export const AVAILABLE_MOCK_SLUGS = Object.keys(MOCK_SERAPIST_LIST)
