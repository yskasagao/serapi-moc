'use client'
import toast, { ToastBar, Toaster as _Toaster } from 'react-hot-toast'
import CloseSVG from '@assets/icon_close.svg'

export const Toaster = () => {
  return (
    <_Toaster
      containerStyle={{
        inset: 0,
      }}
      toastOptions={{
        duration: 5000,
        className: '',
        style: {
          maxWidth: '750px',
          width: '100%',
          padding: '16px',
          borderRadius: 0,
        },
        success: {
          style: {
            background: '#000000',
            color: '#fff',
          },
        },
        error: {
          style: {
            background: '#FF0000',
            color: '#fff',
          },
        },
      }}
    >
      {(t) => (
        <ToastBar toast={t}>
          {({ message }) => (
            <>
              {message}
              {t.type !== 'loading' && (
                <button onClick={() => toast.dismiss(t.id)}>
                  <CloseSVG width={24} height={24} fill='#fff' />
                </button>
              )}
            </>
          )}
        </ToastBar>
      )}
    </_Toaster>
  )
}
