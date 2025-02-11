import { ComponentPropsWithRef, ReactNode } from "react"
import './Button.css'

type Props = {
  type?: 'button' | 'submit' | 'reset'
  mode?: 'accent' | 'primary'
  children: ReactNode
} & ComponentPropsWithRef<'button'>

export const Button = ({children, mode = 'primary', type = 'button', ...props}: Props) => {
  return (
  <button
    className={`Button 
      ${mode === 'primary' ? `Button--${mode}` : ''} 
      ${mode === 'accent' ? `Button--${mode}` : ''}
      `.trim()}
    type={type}
    {...props}
  >
    {children}
  </button>
  )
}