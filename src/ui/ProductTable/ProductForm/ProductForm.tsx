import { useEffect } from 'react'
import { FieldErrors, SubmitHandler, useForm } from 'react-hook-form'
import * as Product from '../../../model/Product'
import { Button } from '../../ui/Button/Button'
import { useNavigate } from 'react-router'
import { PATHS } from '../../../utils/constants'
import { useModal } from '../../../hooks/useModal'
import { ModalView } from '../../modals/ModalView/ModalView'
import { useRootDispatch } from '../../../hooks/useRootDispatch'
import { removeProduct } from '../../../store/thunks'
import './ProductForm.css'

type Props = {
  productStatus: Product.ProductStatus
  product?: Product.Product
  onSubmit: SubmitHandler<Product.FormValue>
}

const compression = "компрессия"
const noCompression = "некомпрессия"

export const ProductForm = ({product, onSubmit, productStatus}: Props) => {
  const navigate = useNavigate()
  const dispatch = useRootDispatch()
  const { isOpenModal, openModal, closeModal } = useModal()
  const { register, handleSubmit, reset, formState: {errors} } = useForm<Product.FormValue>()

  const submitFormData = (data: Product.FormValue) => {
    onSubmit(data)
    reset()
  }

  const onError = (errors: FieldErrors<Product.FormValue>) => {
    console.error('Ошибки в форме:', errors);
  };

  const onRemove = () => {
    if (product?.id) {
      dispatch(removeProduct(product.id)).unwrap().then(() => navigate(PATHS.root))
    }
  }

  useEffect(() => {
    if (product) {
      reset({
        packsNumber: String(product.packsNumber),
        packageType: product.packageType,
        isArchived: product.isArchived,
        description: product.description
      });
    }
  }, [product, reset]);
  
  return (
    <form className='ProductForm' onSubmit={handleSubmit(submitFormData, onError)}>
      <label className="ProductForm__content">
        <span className='ProductForm__text'>
          Кол-во пачек 
        <span className='ProductForm__text--required'>*</span></span>
        <div className='ProductForm__inputContainer'>
          <input 
            className='ProductForm__input' 
            type="text" size={100} 
            inputMode='numeric'
            {...register('packsNumber', {required: true})} 
          />
          {errors.packsNumber && (
            <p className='ProductForm__inputError'>Поле должно быть обязательным!</p>
          )}
        </div>
      </label>
      <label className="ProductForm__content">
        <span className='ProductForm__text'>
          Тип упаковки
        <span className='ProductForm__text--required'>*</span></span>
        <div className='ProductForm__inputContainer'>
          <select 
            className='ProductForm__input ProductForm__input--select' 
            defaultValue=''
            {...register('packageType', {required: true})}
          >
            <option value='' disabled>Выберите тип упаковки</option>
            <option value={compression}>{compression}</option>
            <option value={noCompression}>{noCompression}</option>
          </select>
          {errors.packageType && (
            <p className='ProductForm__inputError'>Поле должно быть обязательным!</p>
          )}
        </div>
      </label>
      <label className="ProductForm__content ProductForm__content--checkbox">
        <span className='ProductForm__text'>
          Архивированно
        </span>
        <div className='ProductForm__inputContainer'>
          <input 
            className='ProductForm__checkbox' 
            type="checkbox" 
            {...register('isArchived')} 
          />
        </div>
      </label>
      <label className="ProductForm__content">
        <span className='ProductForm__text ProductForm__text--description'>
          Описание
        </span>
        <div className='ProductForm__inputContainer'>
          <textarea 
            className='ProductForm__input ProductForm__input--description' 
            maxLength={100}
            {...register('description')} 
          />
        </div>
      </label>
      {!product ? (
        <div className='ProductForm__buttons'>
          <Button onClick={() => navigate(PATHS.root)}>Отмена</Button>
          <Button type='submit'>Создать</Button>
        </div>
      ) : (
        <div className='ProductForm__buttons'>
          <Button onClick={() => openModal()} mode='accent'>Удалить</Button>
          <Button onClick={() => navigate(PATHS.root)}>Отмена</Button>
          <Button type='submit'>Cохранить</Button>
        </div>
      )}
      {productStatus === 'error' && (
          <span>Мы не смогли создать товар, повторите попытку еще раз.</span>
      )}
      {isOpenModal && (
        <ModalView onClose={closeModal}>
          <div className="ProductForm__confirmationDelete">
            <Button onClick={onRemove} mode="accent">Удалить</Button>
            <Button onClick={closeModal}>Отмена</Button>
          </div>
        </ModalView>
          )}
    </form>
  )
}
