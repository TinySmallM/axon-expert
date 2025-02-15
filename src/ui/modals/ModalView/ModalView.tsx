import { ComponentPropsWithRef, ReactNode, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import './ModalView.css'

type Props = {
  children: ReactNode
  backgroundType?: 'light'
  onClose: () => void
} & ComponentPropsWithRef<'div'>

export const ModalView = ({children, onClose, backgroundType = 'light'}: Props) => {
  const $modalContent = useRef<HTMLDivElement | null>(null)
  
  useEffect(() => {
    if (!$modalContent.current) {
      return
    }

    $modalContent.current.focus()
  }, [$modalContent])

  return ReactDOM.createPortal(
    <div className="ModalView">
    <div className={`ModalView__background ModalView__background--${backgroundType}`} onClick={onClose} />
    <div className='ModalView__container'>
      <div 
        ref={$modalContent}
        className='ModalView__content' 
        onKeyDown={(event) => (event.code === 'Escape' && onClose())}
        tabIndex={-1}
      >
        {children}
      </div>
    </div>
  </div>,
  document.body
  )
}