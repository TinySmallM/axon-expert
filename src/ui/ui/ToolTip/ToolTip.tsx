import { ReactNode } from "react"
import './ToolTip.css'

type Props = {
  children: ReactNode
  titleToolTip: string | null
  isOpen: boolean
  isHiddenOnMobile?: boolean
}

export const ToolTip = ({children, titleToolTip, isOpen, isHiddenOnMobile = true}: Props) => {
  return (
    <div className="ToolTip">
      {children}
      {isOpen && (
        <span className={`ToolTip__text ${isHiddenOnMobile && 'ToolTip__text--hiddenMobile'}`}>{titleToolTip}</span>
      )}
    </div>
  )
}