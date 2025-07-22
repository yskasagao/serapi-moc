'use client'
import { cva } from 'class-variance-authority'
import { Send } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { save } from './action'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Separator } from '@/components/ui/separator'
import { Slider } from '@/components/ui/slider'
import { Textarea } from '@/components/ui/textarea'

const cardVariants = cva('w-full max-w-md mx-auto shadow-lg bg-white relative overflow-hidden', {
  variants: {
    gradient: {
      default:
        'before:absolute before:top-0 before:left-0 before:w-full before:h-1 before:bg-gradient-to-r before:from-[#9370DB] before:via-[#7B68EE] before:to-[#9370DB]',
    },
  },
  defaultVariants: {
    gradient: 'default',
  },
})

const buttonVariants = cva(
  'w-full transition-all duration-200 py-3 text-base font-medium relative overflow-hidden group',
  {
    variants: {
      variant: {
        primary: 'bg-[#9370DB] hover:bg-[#7B68EE] text-white',
        outline:
          'bg-white hover:bg-[#F8F8FF] text-[#9370DB] border-[#9370DB] hover:border-[#7B68EE]',
        link: 'text-[#7B68EE] hover:text-[#9370DB]',
        submit: 'bg-[#4A4A4A] hover:bg-[#666666] text-white py-4',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  },
)

const labelVariants = cva('text-base font-medium font-serif block mb-2', {
  variants: {
    color: {
      default: 'text-[#6A6A6A]',
      primary: 'text-[#9370DB]',
    },
  },
  defaultVariants: {
    color: 'default',
  },
})

const reasonKeys = [
  '興味がある',
  'ストレス解消したい',
  '非日常を味わいたい',
  '性欲を満たしたい',
] as const

type reasonKeyType = (typeof reasonKeys)[number]

type Props = {
  reserveDataId: string
}
export const CounselingDataForm = (props: Props) => {
  const [selectedOption, setSelectedOption] = useState('いいえ')
  const [reason, setReason] = useState<reasonKeyType[]>([
    '興味がある',
    'ストレス解消したい',
    '性欲を満たしたい',
    '非日常を味わいたい',
  ])
  const [otherReason, setOtherReason] = useState('')
  const [smScale, setSmScale] = useState(5)
  const [massageAreas, setMassageAreas] = useState<string[]>([])
  const [shower, setShower] = useState('')
  const [massageRatio, setMassageRatio] = useState('')
  const [sensitiveAreas, setSensitiveAreas] = useState('')
  const [conversation, setConversation] = useState('')
  const [intimacy, setIntimacy] = useState('')
  const handleMassageAreaChange = (area: string) => {
    setMassageAreas((prev) =>
      prev.includes(area) ? prev.filter((a) => a !== area) : [...prev, area],
    )
  }
  const getInterpretation = (value: number) => {
    if (value === 0) return '完全なSの傾向があります'
    if (value <= 2) return '強いSの傾向があります'
    if (value <= 4) return 'やや、Sの傾向があります'
    if (value === 5) return 'わからない'
    if (value <= 7) return 'やや、Mの傾向があります'
    if (value <= 9) return '強いMの傾向があります'
    return '完全なMの傾向があります'
  }

  return (
    <div className='flex min-h-screen items-center justify-center bg-gradient-to-br from-[#E6E6FA] to-[#F8F8FF] p-4 font-sans text-[#4A4A4A]'>
      <Card className={cardVariants()}>
        <CardHeader className='pb-6 text-center'>
          <CardTitle className='font-serif text-lg font-bold text-[#4A4A4A]'>
            カウンセリングカード
          </CardTitle>
        </CardHeader>
        <form
          action={async (formData: FormData) => {
            formData.set('reason', reason.join(','))
            formData.set('sm', `${smScale}`)
            formData.set('massage', massageAreas.join(','))
            const result = await save(formData)
            if (result && !result.success) {
              toast.error('保存できませんでした。')
            }
          }}
        >
          <input type='hidden' name='reserveDataId' value={props.reserveDataId} />
          <CardContent className='space-y-8'>
            <>
              <div className='space-y-6'>
                <Label className={labelVariants()}>Q1. 女風を利用したことはありますか</Label>
                <RadioGroup
                  value={selectedOption}
                  onValueChange={setSelectedOption}
                  className='space-y-3'
                  name='hasExperience'
                >
                  <div className='flex items-center space-x-3'>
                    <RadioGroupItem
                      value='はい'
                      id='yes'
                      className='h-5 w-5 border-[#9370DB] text-[#9370DB]'
                    />
                    <Label htmlFor='yes' className='font-sans text-base'>
                      はい
                    </Label>
                  </div>
                  <div className='flex items-center space-x-3'>
                    <RadioGroupItem
                      value='いいえ'
                      id='no'
                      className='h-5 w-5 border-[#9370DB] text-[#9370DB]'
                    />
                    <Label htmlFor='no' className='font-sans text-base'>
                      いいえ
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <Separator className='bg-[#E6E6FA]' />

              <div className='space-y-6'>
                <Label className={labelVariants()}>
                  Q2. 女風を利用してみたいと思ったきっかけをおしえてください
                </Label>
                <div className='space-y-3'>
                  {reasonKeys.map((key) => (
                    <div key={key} className='flex items-center space-x-3'>
                      <Checkbox
                        id={key}
                        checked={reason.includes(key)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setReason((p) => {
                              return [...p, key]
                            })
                          } else {
                            setReason((p) => {
                              return p.filter((v) => v !== key)
                            })
                          }
                        }}
                        className='h-5 w-5 border-[#9370DB] text-[#9370DB]'
                        value={key}
                      />
                      <Label htmlFor={key} className='font-sans text-base'>
                        {key}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <Separator className='bg-[#E6E6FA]' />

              <div className='space-y-6'>
                <Label className={labelVariants()}>Q3. あなたはSですかMですか</Label>
                <div className='space-y-4'>
                  <Slider
                    min={0}
                    max={10}
                    step={1}
                    value={[smScale]}
                    onValueChange={(value) => setSmScale(value[0]!)}
                    className='w-full'
                  />
                  <div className='flex justify-between text-sm text-[#6A6A6A]'>
                    <span>完全なS</span>
                    <span>わからない</span>
                    <span>完全なM</span>
                  </div>
                  <div className='rounded-lg border border-[#9370DB] bg-[#F8F8FF] p-3'>
                    <p className='text-center text-base font-medium text-[#9370DB]'>
                      {getInterpretation(smScale)}
                    </p>
                  </div>
                </div>
              </div>

              <Separator className='bg-[#E6E6FA]' />

              <div className='space-y-6'>
                <Label className={labelVariants()}>
                  Q4. 重点的にマッサージして欲しい箇所、特にお疲れの箇所はありますか（複数選択可）
                </Label>
                <div className='grid grid-cols-2 gap-3'>
                  {[
                    '目',
                    '首',
                    '背中',
                    '肩',
                    '腕',
                    '腰',
                    'お尻',
                    '太もも',
                    'ふくらはぎ',
                    '足裏',
                  ].map((area) => (
                    <div key={area} className='flex items-center space-x-2'>
                      <Checkbox
                        id={`massage-${area}`}
                        checked={massageAreas.includes(area)}
                        onCheckedChange={() => handleMassageAreaChange(area)}
                        className='h-5 w-5 border-[#9370DB] text-[#9370DB]'
                      />
                      <Label htmlFor={`massage-${area}`} className='font-sans text-base'>
                        {area}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <Separator className='bg-[#E6E6FA]' />

              <div className='space-y-6'>
                <Label className={labelVariants()}>Q5. シャワーについて</Label>
                <RadioGroup
                  value={shower}
                  onValueChange={setShower}
                  className='space-y-3'
                  name='shower'
                >
                  <div className='flex items-center space-x-3'>
                    <RadioGroupItem
                      value='一緒に入浴したい'
                      id='shower-together'
                      className='h-5 w-5 border-[#9370DB] text-[#9370DB]'
                    />
                    <Label htmlFor='shower-together' className='font-sans text-base'>
                      一緒に入浴したい
                    </Label>
                  </div>
                  <div className='flex items-center space-x-3'>
                    <RadioGroupItem
                      value='後から入ってきて欲しい'
                      id='shower-later'
                      className='h-5 w-5 border-[#9370DB] text-[#9370DB]'
                    />
                    <Label htmlFor='shower-later' className='font-sans text-base'>
                      後から入ってきて欲しい
                    </Label>
                  </div>
                  <div className='flex items-center space-x-3'>
                    <RadioGroupItem
                      value='1人で入浴したい'
                      id='shower-alone'
                      className='h-5 w-5 border-[#9370DB] text-[#9370DB]'
                    />
                    <Label htmlFor='shower-alone' className='font-sans text-base'>
                      1人で入浴したい
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <Separator className='bg-[#E6E6FA]' />

              <div className='space-y-6'>
                <Label className={labelVariants()}>Q6. マッサージと性感の割合</Label>
                <RadioGroup
                  value={massageRatio}
                  onValueChange={setMassageRatio}
                  className='space-y-3'
                  name='massageToSensualRatio'
                >
                  <div className='flex items-center space-x-3'>
                    <RadioGroupItem
                      value='マッサージ多め'
                      id='more-massage'
                      className='h-5 w-5 border-[#9370DB] text-[#9370DB]'
                    />
                    <Label htmlFor='more-massage' className='font-sans text-base'>
                      マッサージ多め
                    </Label>
                  </div>
                  <div className='flex items-center space-x-3'>
                    <RadioGroupItem
                      value='性感多め'
                      id='more-sensual'
                      className='h-5 w-5 border-[#9370DB] text-[#9370DB]'
                    />
                    <Label htmlFor='more-sensual' className='font-sans text-base'>
                      性感多め
                    </Label>
                  </div>
                  <div className='flex items-center space-x-3'>
                    <RadioGroupItem
                      value='癒し多め'
                      id='more-relaxation'
                      className='h-5 w-5 border-[#9370DB] text-[#9370DB]'
                    />
                    <Label htmlFor='more-relaxation' className='font-sans text-base'>
                      癒し多め
                    </Label>
                  </div>
                  <div className='flex items-center space-x-3'>
                    <RadioGroupItem
                      value='話しながら決めたい'
                      id='decide-together'
                      className='h-5 w-5 border-[#9370DB] text-[#9370DB]'
                    />
                    <Label htmlFor='decide-together' className='font-sans text-base'>
                      話しながら決めたい
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <Separator className='bg-[#E6E6FA]' />

              <div className='space-y-6'>
                <Label className={labelVariants()}>Q7. 責められたい箇所はありますか</Label>
                <Textarea
                  value={sensitiveAreas}
                  onChange={(e) => setSensitiveAreas(e.target.value)}
                  className='min-h-[100px] resize-y border-[#9370DB] py-2 text-base focus:ring-[#7B68EE]'
                  placeholder='自由入力'
                  name='targetZones'
                />
              </div>

              <Separator className='bg-[#E6E6FA]' />

              <div className='space-y-6'>
                <Label className={labelVariants()}>Q8. 施術中の会話でご希望はありますか</Label>
                <RadioGroup
                  value={conversation}
                  onValueChange={setConversation}
                  className='space-y-3'
                  name='talk'
                >
                  <div className='flex items-center space-x-3'>
                    <RadioGroupItem
                      value='楽しく過ごしたい'
                      id='conversation-enjoyable'
                      className='h-5 w-5 border-[#9370DB] text-[#9370DB]'
                    />
                    <Label htmlFor='conversation-enjoyable' className='font-sans text-base'>
                      楽しく過ごしたい
                    </Label>
                  </div>
                  <div className='flex items-center space-x-3'>
                    <RadioGroupItem
                      value='静かに過ごしたい'
                      id='conversation-quiet'
                      className='h-5 w-5 border-[#9370DB] text-[#9370DB]'
                    />
                    <Label htmlFor='conversation-quiet' className='font-sans text-base'>
                      静かに過ごしたい
                    </Label>
                  </div>
                  <div className='flex items-center space-x-3'>
                    <RadioGroupItem
                      value='おまかせ'
                      id='conversation-up-to-you'
                      className='h-5 w-5 border-[#9370DB] text-[#9370DB]'
                    />
                    <Label htmlFor='conversation-up-to-you' className='font-sans text-base'>
                      おまかせ
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <Separator className='bg-[#E6E6FA]' />

              <div className='space-y-6'>
                <Label className={labelVariants()}>Q9. 施術中の密着でご希望はありますか</Label>
                <RadioGroup
                  value={intimacy}
                  onValueChange={setIntimacy}
                  className='space-y-3'
                  name='bodyContact'
                >
                  <div className='flex items-center space-x-3'>
                    <RadioGroupItem
                      value='イチャイチャしたい'
                      id='intimacy-close'
                      className='h-5 w-5 border-[#9370DB] text-[#9370DB]'
                    />
                    <Label htmlFor='intimacy-close' className='font-sans text-base'>
                      イチャイチャしたい
                    </Label>
                  </div>
                  <div className='flex items-center space-x-3'>
                    <RadioGroupItem
                      value='肌の密着には抵抗がある'
                      id='intimacy-hesitant'
                      className='h-5 w-5 border-[#9370DB] text-[#9370DB]'
                    />
                    <Label htmlFor='intimacy-hesitant' className='font-sans text-base'>
                      肌の密着には抵抗がある
                    </Label>
                  </div>
                  <div className='flex items-center space-x-3'>
                    <RadioGroupItem
                      value='おまかせ'
                      id='intimacy-up-to-you'
                      className='h-5 w-5 border-[#9370DB] text-[#9370DB]'
                    />
                    <Label htmlFor='intimacy-up-to-you' className='font-sans text-base'>
                      おまかせ
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <Separator className='bg-[#E6E6FA]' />

              <div className='space-y-3'>
                <Label htmlFor='other' className={labelVariants()}>
                  その他
                </Label>
                <Textarea
                  id='other'
                  value={otherReason}
                  onChange={(e) => setOtherReason(e.target.value)}
                  className='min-h-[100px] resize-y border-[#9370DB] py-2 text-base focus:ring-[#7B68EE]'
                  placeholder='自由入力'
                  name='other'
                />
              </div>

              <Button type='submit' className={buttonVariants({ variant: 'submit' })}>
                <Send className='mr-2 h-5 w-5' />
                <span className='relative z-10'>送信</span>
                <span className='absolute inset-0 bg-white opacity-0 transition-opacity duration-200 group-hover:opacity-20'></span>
              </Button>
            </>
          </CardContent>
        </form>
      </Card>
    </div>
  )
}
