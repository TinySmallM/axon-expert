import { ComponentPropsWithRef } from "react"
import './Header.css'

type Props = {
  names: string[]
} & ComponentPropsWithRef<'thead'>

export const Header = ({names}: Props) => {
  return (
    <thead>
      <tr className="Header__line">
        {names.map((value, index) => (
          <th className="Header__title" key={index}>{value}</th>
        ))}
      </tr>
    </thead>
  )
}
