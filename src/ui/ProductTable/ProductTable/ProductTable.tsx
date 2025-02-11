import { useEffect } from "react"
import { useRootDispatch } from "../../../hooks/useRootDispatch"
import { useRootSelector } from "../../../hooks/useRootSelector"
import { fetchProducts } from "../../../store/thunks"
import { Header } from "../Header/Header"
import { ProductList } from "../ProductList/ProductList"
import { Button } from "../../ui/Button/Button"
import { useNavigate } from "react-router"
import './ProductTable.css'

const names = [
  '№', 'Кол-во пачек', 'Тип упаковки', 'Дата создания', 'Статус', '', '',
]

export const ProductTable = () => {
  const navigate = useNavigate()
  const dispatch = useRootDispatch()

  const sliceState = useRootSelector((state) => state.products)
  const { productState, productTypes, errorMessage } = sliceState

  const textListProduct = 'Cписок выпускаемой продукции'
  const previewText= 'Создай первый продукт уже сейчас!'

  const notEmptyArray = productTypes.length > 0

  useEffect(() => {
    dispatch(fetchProducts())
  }, [])

  return (
    <div className="Product">
      <div className="Product__top">
        <h1 className="Product__title">{notEmptyArray ? textListProduct : previewText}</h1>
        <Button onClick={() => navigate('create')}>Cоздать тип продукции</Button>
      </div>
      {productState === 'done' && ( 
        <table className="Product__list">
          {notEmptyArray && <Header names={names} />}
          <ProductList products={productTypes} names={names} />
        </table>
      )}
      {productState === 'loading' && <span>Загрузка</span>}
      {productState === 'error' && <span>{errorMessage}</span>}
    </div>
  )
}