import { useEffect } from "react"
import { useRootDispatch } from "../../../hooks/useRootDispatch"
import { useRootSelector } from "../../../hooks/useRootSelector"
import { fetchProducts } from "../../../store/thunks"
import { Header } from "../Header/Header"
import { ProductList } from "../ProductList"
import './ProductTable.css'

const names = [
  '№', 'Кол-во пачек', 'Тип упаковки', 'Дата создания', 'Статус', '', '',
]

export const ProductTable = () => {
  const dispatch = useRootDispatch()
  const productTypes = useRootSelector((state) => state.products.productTypes)
  const productState = useRootSelector((state) => state.products.productState)
  const errorMessage = useRootSelector((state) => state.products.errorMessage)

  useEffect(() => {
    dispatch(fetchProducts())
  }, [])

  return (
    <div className="Product">
      {productState === 'done' && ( 
        <table className="Product__list">
          <Header names={names} />
          <ProductList products={productTypes} names={names} />
        </table>
      )}
      {productState === 'loading' && <span>Загрузка</span>}
      {productState === 'error' && <span>{errorMessage}</span>}
    </div>
  )
}