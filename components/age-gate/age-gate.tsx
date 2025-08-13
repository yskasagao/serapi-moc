'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle } from 'lucide-react'
import Logo from './assets/star_logo.svg'

export const AgeGate = () => {
  const [hasVerified, setHasVerified] = useState<boolean | null>(null)
  const [isMount, setIsMount] = useState(false)

  useEffect(() => {
    setIsMount(true)
    const verified = localStorage.getItem('serapi:ageVerified') === 'true'
    setHasVerified(verified)
  }, [])
  useEffect(() => {
    if (!hasVerified) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [hasVerified])
  const handleVerification = (verified: boolean) => {
    if (verified) {
      // 年齢確認が成功した場合
      localStorage.setItem('serapi:ageVerified', 'true')
      setHasVerified(true)
    } else {
      // 年齢確認が失敗した場合（18歳未満）
      window.location.href = 'https://www.google.com'
    }
  }

  // TikTokロゴの配置位置を定義（画面全体にまばらに、特に下半分に多く）
  const logoPositions = [
    { left: '15%', top: '45%' },
    { left: '85%', top: '35%' },
    { left: '75%', top: '65%' },
    { left: '25%', top: '75%' },
    { left: '50%', top: '85%' },
    { left: '35%', top: '55%' },
    { left: '65%', top: '25%' },
    { left: '10%', top: '65%' },
    { left: '90%', top: '55%' },
    { left: '40%', top: '70%' },
  ]

  // TikTokロゴのエフェクト - 修正版（青系と赤系のロゴが混在）
  const tiktokLogos = logoPositions.map((position, i) => {
    // ロゴのサイズをランダムに
    const size = 20 + Math.random() * 15

    // 青系と赤系のロゴをランダムに生成
    const isBlueVariant = Math.random() > 0.5

    let color
    if (isBlueVariant) {
      // 青系のロゴ
      const r = 100 + Math.random() * 30
      const g = 150 + Math.random() * 30
      const b = 255
      const opacity = 0.5 + Math.random() * 0.3 // 透明度を0.5-0.8に調整
      color = `rgba(${r}, ${g}, ${b}, ${opacity})`
    } else {
      // 赤系のロゴ（薄めに）
      const r = 255
      const g = 126 + Math.random() * 30
      const b = 138 + Math.random() * 30
      const opacity = 0.5 + Math.random() * 0.3 // 透明度を0.5-0.8に調整
      color = `rgba(${r}, ${g}, ${b}, ${opacity})`
    }

    // アニメーションの時間（短縮版）
    const duration = 5 + Math.random() * 5
    const delay = Math.random() * 3

    // 回転をランダムに
    const startRotate = Math.random() * 360
    const rotateDirection = Math.random() > 0.5 ? 1 : -1
    const rotateAmount = 60 + Math.random() * 120

    // たゆたう動きの振幅
    const floatAmplitude = 10 + Math.random() * 15

    return (
      <motion.div
        key={`tiktok-${i}`}
        className='pointer-events-none absolute z-10'
        style={{
          left: position.left,
          top: position.top,
          width: size,
          height: size,
        }}
        initial={{ opacity: 0, scale: 0.5, rotate: startRotate }}
        animate={{
          opacity: [0, 0.6, 0.6, 0.6, 0],
          scale: [0.5, 1, 1, 0.95, 0.5],
          rotate: [
            startRotate,
            startRotate + rotateDirection * (rotateAmount * 0.25),
            startRotate + rotateDirection * (rotateAmount * 0.5),
            startRotate + rotateDirection * (rotateAmount * 0.75),
            startRotate + rotateDirection * rotateAmount,
          ],
          x: [0, floatAmplitude * 0.5, -floatAmplitude * 0.5, floatAmplitude * 0.25, 0],
          y: [0, -floatAmplitude * 0.25, floatAmplitude * 0.25, -floatAmplitude * 0.5, 0],
        }}
        transition={{
          duration: duration,
          repeat: Number.POSITIVE_INFINITY,
          repeatDelay: delay,
          times: [0, 0.2, 0.5, 0.8, 1],
          ease: 'easeInOut',
        }}
      >
        <TikTokLogo color={color} />
      </motion.div>
    )
  })

  // 小さな光の粒子
  const lightParticles = Array(6)
    .fill(0)
    .map((_, i) => {
      const size = 1 + Math.random() * 2
      const opacity = 0.2 + Math.random() * 0.3

      return (
        <motion.div
          key={`particle-${i}`}
          className='pointer-events-none absolute rounded-full'
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: size,
            height: size,
            background: `rgba(255, 255, 255, ${opacity})`,
            boxShadow: `0 0 ${size}px rgba(255, 255, 255, ${opacity})`,
          }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, opacity, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatDelay: Math.random() * 3,
            delay: Math.random() * 2,
          }}
        />
      )
    })
  if (!isMount || hasVerified) {
    return
  }
  return (
    <div className='fixed inset-0 z-50 flex min-h-screen flex-col items-center justify-center overflow-hidden bg-white py-10'>
      {/* TikTokロゴのエフェクト */}
      {tiktokLogos}
      {lightParticles}

      <div className='z-20 mx-auto flex w-full max-w-md flex-col items-center px-4 text-center'>
        {/* ロゴとテキスト */}
        <motion.div
          className='mb-20 flex flex-col items-center'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <AnimatedLogo />

          <motion.h1
            className='mb-4 mt-10 text-3xl font-light tracking-wide text-[#4a4a4a] md:text-4xl'
            style={{ lineHeight: '1.5' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1, ease: 'easeOut' }}
          >
            <TextReveal text='セラピストとの' delay={1.5} />
            <br />
            <TextReveal text='素敵な出会いを' delay={1.8} />
          </motion.h1>
        </motion.div>

        {/* 年齢確認セクション */}
        <AnimatePresence>
          {hasVerified === false && (
            <motion.div
              className='w-full'
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: {
                  delay: 2, // ロゴとテキストアニメーション後に表示
                  duration: 0.8,
                  ease: 'easeOut',
                },
              }}
              exit={{ opacity: 0, y: -20 }}
            >
              <AgeVerificationCard onVerify={handleVerification} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

// AnimatedLogoコンポーネント（AnimatedLogo.tsxを統合）
const AnimatedLogo = () => {
  // SVGロゴのアニメーション設定 - よりナチュラルなフェードイン
  const logoVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: 'easeOut',
      },
    },
  }

  return (
    <div className='relative flex h-40 w-40 items-center justify-center'>
      {/* メインロゴ */}
      <motion.div
        className='relative z-10'
        variants={logoVariants}
        initial='hidden'
        animate='visible'
      >
        <Logo width={160} height={160} className='object-contain' />
      </motion.div>
    </div>
  )
}

// TikTokロゴコンポーネント
const TikTokLogo = ({ color }: { color: string }) => {
  return (
    <svg
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className='h-full w-full'
    >
      <path
        d='M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z'
        fill={color}
      />
      <path
        d='M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z'
        stroke='white'
        strokeOpacity='0.5'
        strokeWidth='0.5'
      />
    </svg>
  )
}

// テキストを文字ごとにアニメーションさせるコンポーネント
const TextReveal = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const characters = Array.from(text)

  return (
    <span className='inline-block'>
      {characters.map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          className='inline-block'
          initial={{ opacity: 0, y: 10 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: {
              delay: delay + index * 0.03, // 文字ごとに少しずつ遅延
              duration: 0.3,
            },
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  )
}

// 年齢確認カードコンポーネント - 洗練されたデザイン
const AgeVerificationCard = ({ onVerify }: { onVerify: (verified: boolean) => void }) => {
  // アニメーションのステップを管理
  const [animationStep, setAnimationStep] = useState(0)

  // アニメーションステップを順番に進める
  useEffect(() => {
    const timers = [
      setTimeout(() => setAnimationStep(1), 300),
      setTimeout(() => setAnimationStep(2), 600),
      setTimeout(() => setAnimationStep(3), 900),
    ]

    return () => timers.forEach((timer) => clearTimeout(timer))
  }, [])

  return (
    <div className='relative overflow-hidden rounded-lg border border-gray-100 bg-white p-6 shadow-sm'>
      <div className='relative z-10 text-center'>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className='mb-2 flex items-center justify-center text-base font-normal text-[#4a4a4a]'>
            <AlertTriangle className='mr-2 h-4 w-4 text-brand-icon-static' />
            18歳未満閲覧禁止
          </h2>
          <motion.div
            className='mx-auto mb-6 h-px bg-brand-ui-static'
            initial={{ width: 0 }}
            animate={{ width: animationStep >= 1 ? '4rem' : 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </motion.div>

        <motion.div
          className='flex flex-col justify-center gap-3 sm:flex-row'
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: animationStep >= 2 ? 1 : 0, y: animationStep >= 2 ? 0 : 10 }}
          transition={{ duration: 0.5 }}
        >
          <VerificationButton onClick={() => onVerify(true)} primary label='ENTER' />
          <VerificationButton onClick={() => onVerify(false)} primary={false} label='LEAVE' />
        </motion.div>

        <motion.p
          className='mt-6 text-xs text-gray-400'
          initial={{ opacity: 0 }}
          animate={{ opacity: animationStep >= 3 ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        >
          「ENTER」をクリックすると、
          <br />
          あなたが18歳以上であることを確認したものとみなします。
        </motion.p>
      </div>
    </div>
  )
}

// 洗練された確認ボタン
const VerificationButton = ({
  onClick,
  primary,
  label,
}: {
  onClick: () => void
  primary: boolean
  label: string
}) => {
  const [isHovered, setIsHovered] = useState(false)

  return primary ? (
    <motion.button
      whileHover={{
        scale: 1.02,
        boxShadow: '0 4px 12px rgba(255, 126, 138, 0.15)',
      }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className='group relative min-w-[120px] overflow-hidden rounded-md bg-brand-ui px-8 py-2 font-normal text-white shadow-sm transition-all duration-300'
    >
      <span className='relative z-10'>{label}</span>
      <motion.div
        className='absolute inset-0 bg-gradient-to-r from-brand-ui to-brand-light'
        initial={{ x: '-100%' }}
        whileHover={{ x: 0 }}
        transition={{ duration: 0.4 }}
      />

      {/* ホバー時に表示される小さなハートのアニメーション */}
      {isHovered && (
        <>
          {Array.from({ length: 5 }, (_, i) => (
            <motion.div
              key={i}
              className='absolute'
              initial={{
                x: '50%',
                y: '100%',
                opacity: 0.9,
                scale: 0.6,
              }}
              animate={{
                y: [20, -60],
                x: [0, (i - 2) * 20],
                opacity: [0.9, 0],
                scale: [0.6, 1.2],
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 1,
                delay: i * 0.1,
              }}
            >
              <svg width='20' height='20' viewBox='0 0 24 24' fill='white' opacity='0.9'>
                <path d='M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z' />
              </svg>
            </motion.div>
          ))}
        </>
      )}
    </motion.button>
  ) : (
    <motion.button
      whileHover={{ scale: 1.02, backgroundColor: '#f3f4f6' }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className='min-w-[120px] rounded-md bg-gray-100 px-8 py-2 font-normal text-gray-700 shadow-sm transition-colors duration-300'
    >
      {label}
    </motion.button>
  )
}
