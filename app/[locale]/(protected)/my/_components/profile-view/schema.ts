export type ProfileSchema = {
  name: string | null
  image: string | null
  message: string | null
  Comment: {
    text: string
    id: string
    Serapistar: {
      slug: string
      nickname: string
      avatar: string | null
    } | null
    isPublic: boolean
    createdAt: Date
  }[]
  Bookmark: {
    Serapistar: {
      nickname: string
      avatar: string | null
      slug: string
      shop: {
        name: string
      } | null
      SerapisterParameter: {
        service: number
        like: number
        looks: number
        physical: number
        repeat: number
      } | null
    } | null
  }[]
}
