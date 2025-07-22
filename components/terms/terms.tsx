'use server'
import fs from 'fs'
import { getLocale } from 'next-intl/server'
import Markdown from 'react-markdown'

export const Terms = async () => {
  const locale = await getLocale()
  const text = fs.readFileSync(process.cwd() + `/components/terms/assets/${locale}.md`, 'utf8')
  return <Markdown className='markdown'>{text}</Markdown>
}
