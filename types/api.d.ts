export type Result<T = undefined> =
  | {
      success: true
      data?: T
    }
  | {
      success: false
      error: string
      fieldErrors?: Record<string, string[]>
    }
