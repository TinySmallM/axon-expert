import { ComponentPropsWithRef } from "react"
import * as Product from '../../../model/Product'
import { ButtonIcon } from "../../ui/ButtonIcon/ButtonIcon"
import { Icon18Edit, Icon18Description, Icon18Delete } from '../../../assets/icons'
import { useRootDispatch } from "../../../hooks/useRootDispatch"
import { removeProduct } from "../../../store/thunks"
import { useModal } from "../../../hooks/useModal"
import { ModalView } from "../../modals/ModalView/ModalView"
import { Button } from "../../ui/Button/Button"
import { useNavigate } from "react-router"
import { PATHS } from "../../../utils/constants"
import './ProductList.css'
import { ToolTip } from "../../ui/ToolTip/ToolTip"
import { useToolTip } from "../../../hooks/useToolTip"
import { formatData } from "../../../utils/utils"

type Props = {
  products: Product.Products[]
  names: string[]
} & ComponentPropsWithRef<'tbody'>

const archived = 'Архив'
const unArchived = 'Активно'

export const ProductList = ({products, names}: Props) => {
  const navigate = useNavigate()
  const dispatch = useRootDispatch()
  const {isOpenModal, param, openModal, closeModal} = useModal()
  const {isOpenToolTip, toolTipId, title, openToolTip, closeToolTip, setToolTipId} = useToolTip()
  const toggleToolTip = (id: string | number , description: string) => {
    openToolTip(description)
    setToolTipId(id)

    if (isOpenToolTip && id === toolTipId) {
      closeToolTip()
    }
  }
  
  //The backend does not contain table headers, and the approach requires them in responsive mode.
  return (
    <tbody>
      {products.map((item, index) => (
        <tr onMouseLeave={closeToolTip} onTouchEnd={closeToolTip} className="ProductList__line" key={item.id}>
          <td data-label={names[0]}><span className="ProductList__text">{index + 1}</span></td>
          <td data-label={names[1]}><span className="ProductList__text">{item.packsNumber}</span></td>
          <td data-label={names[2]}><span className="ProductList__text">{item.packageType}</span></td>
          <td data-label={names[3]}>
            <span className="ProductList__text">{formatData(item.createdAt, {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric'
              })}
            </span>
          </td>
          <td data-label={names[4]}>
            <span className="ProductList__text">{item.isArchived ? archived : unArchived}</span>
          </td>
          <td 
            className="ProductList__description" 
            data-description={item.description ? item.description : 'нет описание' }
          >
            <ToolTip titleToolTip={title} isOpen={isOpenToolTip && toolTipId === item.id}>
              <ButtonIcon 
                className="ProductList__icon" 
                onClick={() => toggleToolTip(item.id, item.description ? item.description : 'нет описание')}
                icon={<Icon18Description />} 
              />
            </ToolTip>
          </td>
          <td className="ProductList__buttonGroup">
            <ButtonIcon 
              onClick={() => navigate(`${PATHS.root + PATHS.update}?id=${item.id}`)} 
              className="ProductList__icon" 
              icon={<Icon18Edit />} 
            />
            <ButtonIcon 
              onClick={() => openModal(item.id)} 
              className="ProductList__icon" 
              icon={<Icon18Delete />} 
            />
          </td>
        </tr>
      ))}
      {isOpenModal && (
        <ModalView onClose={closeModal}>
          <div className="ProductList__confirmationDelete">
            <Button mode="accent" onClick={() => dispatch(removeProduct(param ? param : 'error'))}>Удалить</Button>
            <Button onClick={closeModal}>Отмена</Button>
          </div>
        </ModalView>
          )}
    </tbody>
  )
}
