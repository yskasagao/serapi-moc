'server only'
import { type CompleteMultipartUploadOutput, S3Client } from '@aws-sdk/client-s3'
import { Upload } from '@aws-sdk/lib-storage'

import { type Result } from '@/types/api'

export const storeImage = async (
  buffer: Buffer,
  path: string,
): Promise<Result<{ url: string }>> => {
  const params = {
    Body: buffer,
    Bucket: process.env.AWS_S3_BUCKET,
    Key: path,
    ContentType: 'image/webp',
  }
  const s3 = new S3Client({
    region: process.env.AWS_S3_REGION,
    credentials: {
      accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID ?? '',
      secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY ?? '',
    },
  })
  const uploadParallel = new Upload({
    client: s3,
    queueSize: 4,
    partSize: 5542880,
    leavePartsOnError: false,
    params,
  })
  const ret = await new Promise<{ key: string | undefined }>((resolve, reject) => {
    uploadParallel
      .done()
      .then((data) => {
        resolve({ key: (data as CompleteMultipartUploadOutput).Key })
      })
      .catch(reject)
  })
  return { success: true, data: { url: `https://${process.env.CLOUD_FRONT_DOMAIN}/${ret.key}` } }
}
