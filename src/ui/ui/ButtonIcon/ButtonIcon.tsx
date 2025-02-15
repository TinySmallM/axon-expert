import { ComponentPropsWithRef, ReactElement } from "react"
import './ButtonIcon.css'

type Props = {
  icon: ReactElement
} & ComponentPropsWithRef<'button'>

export const ButtonIcon = ({icon, ...props}: Props) => {
  return (
    <button
     type="button"
     className="ButtonIcon"
     {...props}
    >
      {icon}
    </button>
  )
}