import Image from 'next/image'

export const MainVisual = () => {
  return (
    <div className='mx-8 my-4 flex justify-center'>
      <figure className='relative aspect-[363/121] w-full max-w-[364px]'>
        <Image src='/top-girl.png' alt='' fill />
      </figure>
    </div>
  )
}
