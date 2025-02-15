import { useEffect } from 'react';
import { SubmitHandler } from 'react-hook-form'
import * as Product from '../../../model/Product'
import { useRootDispatch } from '../../../hooks/useRootDispatch'
import { createProduct, fetchProductById, updateProduct } from '../../../store/thunks';
import { ProductCreateParams } from '../../../model/methods/product/ProductCreateParams';
import { useNavigate, useSearchParams } from 'react-router';
import { useRootSelector } from '../../../hooks/useRootSelector';
import { ProductForm } from '../ProductForm/ProductForm';
import './FormContainer.css'
import { PATHS } from '../../../utils/constants';
import { ProductUpdateParams } from '../../../model/methods/product/ProductUpdateParams';

type Props = {
  kind: 'update' | 'create'
}

const titleTextUpdate = 'Редактирование типа продукции'
const titleTextCreate = 'Создание типа продукции'

export const FormContainer = ({kind}: Props) => {
  const [searchParams] = useSearchParams();
  const productId = kind === 'update' && searchParams.get('id');
  
  const sliceState = useRootSelector((state) => state.products)
  const { productStatus, productElement } = sliceState

  const navigate = useNavigate();
  const dispatch = useRootDispatch()

  const onCreateSubmit: SubmitHandler<Product.FormValue> = (data) => {
    const copyData:ProductCreateParams = {...data, packsNumber: +data.packsNumber}
    dispatch(createProduct(copyData)).unwrap().then(() => navigate(PATHS.root))
  }

  const onUpdateSubmit: SubmitHandler<Product.FormValue> = (data) => {
    const copyData:ProductUpdateParams = {...data, packsNumber: +data.packsNumber}
    const payload = {
      id: productId,
      params: copyData
    }

    dispatch(updateProduct(payload)).unwrap().then(() => navigate(PATHS.root))
  }

  const renderProductForm = () => {
    if (kind === 'create') {
      return (
        <ProductForm onSubmit={onCreateSubmit} productStatus={productStatus} />
      )
    }

    return (
      <ProductForm 
        onSubmit={onUpdateSubmit} 
        productStatus={productStatus} 
        product={productElement} 
      />
    )
  }

  useEffect(() => {
    if (productId) {
      dispatch(fetchProductById(productId))
    }
  }, [productId, dispatch])

  return (
    <div className='FormContainer'>
      <div className='FormContainer__wrapperContainer'>
        <h1 className='FormContainer__title'>{kind === 'create' ? titleTextCreate : titleTextUpdate }</h1>
        {renderProductForm()}
      </div>
      {productStatus === 'loading' && <span>Загрузка</span>}
    </div>
  )
}
