// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare namespace NodeJS {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ProcessEnv {
    TWITTER_CONSUMER_KEY: string
    TWITTER_CONSUMER_SECRET: string
    GOOGLE_CLIENT_ID: string
    GOOGLE_CLIENT_SECRET: string
    NEXTAUTH_URL: string
    AWS_S3_ACCESS_KEY_ID: string
    AWS_S3_SECRET_ACCESS_KEY: string
    AWS_S3_REGION: string
    AWS_S3_BUCKET: string
    LIEN_CHANNEL_ID: string
    LINE_CHANNEL_SECRET: string
    CLOUD_FRONT_DOMAIN: string
  }
}
