import { ComponentPropsWithRef } from "react"
import * as Product from '../../model/Product'
import { ButtonIcon } from "../ui/ButtonIcon"
import { Icon18Edit, Icon18Description, Icon18Delete } from '../../assets/icons'
import './ProductList.css'

type Props = {
  products: Product.Products[]
  names: string[]
} & ComponentPropsWithRef<'tbody'>

const archived = 'Архив'
const unArchived = 'Активно'

export const ProductList = ({products, names}: Props) => {
  //The backend does not contain table headers, and the approach requires them in responsive mode.
  
  return (
    <tbody>
      {products.map((item, index) => (
        <tr className="ProductList__line" key={item.id}>
          <td data-label={names[0]}><span className="ProductList__text">{index + 1}</span></td>
          <td data-label={names[1]}><span className="ProductList__text">{item.packsNumber}</span></td>
          <td data-label={names[2]}><span className="ProductList__text">{item.packageType}</span></td>
          <td data-label={names[3]}><span className="ProductList__text">{item.createdAt}</span></td>
          <td data-label={names[4]}>
            <span className="ProductList__text">{item.isArchived ? archived : unArchived}</span>
          </td>
          <td className="ProductList__description" data-description={item.description}>
            <ButtonIcon className="ProductList__icon" title={item.description} icon={<Icon18Description />} />
          </td>
          <td className="ProductList__buttonGroup">
            <ButtonIcon className="ProductList__icon" icon={<Icon18Edit />} />
            <ButtonIcon className="ProductList__icon" icon={<Icon18Delete />} />
          </td>
        </tr>
      ))}
    </tbody>
  )
}
