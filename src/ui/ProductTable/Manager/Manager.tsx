import { SubmitHandler, useForm } from 'react-hook-form'
import * as Product from '../../../model/Product'
import { useRootDispatch } from '../../../hooks/useRootDispatch'
import { createProduct } from '../../../store/thunks';
import { ProductCreateParams } from '../../../model/methods/product/ProductPostParams';
import { useNavigate } from 'react-router';
import { useRootSelector } from '../../../hooks/useRootSelector';
import './Manager.css'
import { CreateElementList } from '../CreateController/CreateElementList';


type Props = {
  kind: 'editor' | 'create'
}

const compression = "компрессия"
const noCompression = "некомпрессия"

export const Manager = ({kind}: Props) => {
  const sliceState = useRootSelector((state) => state.products)
  const { productState } = sliceState

  const navigate = useNavigate();
  const dispatch = useRootDispatch()
  const { register, handleSubmit, formState: {errors} } = useForm<Product.FormValue>()

  const onSubmit: SubmitHandler<Product.FormValue> = (data) => {
    const copyData:ProductCreateParams = {...data, packsNumber: +data.packsNumber}
    dispatch(createProduct(copyData)).then(() => navigate('/'))
  }
  
  return (
    <div className="Manager">
      <form className='Manager__form' onSubmit={handleSubmit(onSubmit)}>
        <label className="Manager__inputContainer">
          <span className='Manager__text'>Кол-во пачек <span className='Manager__text--required'>*</span></span>
          <input className='Manager__input' type="text" size={100} {...register('packsNumber', {required: true})} />
        </label>
        {errors.packsNumber && <p className='Manager__inputError'>Поле должно быть обязательным!</p>}
        <label className="Manager__inputContainer">
          <span className='Manager__text'>Тип упаковки <span className='Manager__text--required'>*</span></span>
            <select className='Manager__input Manager__select' {...register('packageType', {required: true})}>
              <option defaultValue='' disabled>Выберите тип упаковки</option>
              <option value={compression}>{compression}</option>
              <option value={noCompression}>{noCompression}</option>
            </select>
        </label>
        {errors.packageType && <p className='Manager__inputError'>Поле должно быть обязательным!</p>}
        <label className="Manager__inputContainer Manager__inputContainer--toggle">
          <span className='Manager__text'>Архивировано</span>
          <input {...register('isArchived')} className='Manager__checkbox' type="checkbox" />
        </label>
        <label className="Manager__inputContainer">
          <span className='Manager__text Manager__description'>Описание</span>
          <textarea {...register('description')} className='Manager__input' />
        </label>
        <div className='Manager__formController'>
            {kind === 'create' && <CreateElementList productState={productState} />}
        </div>
        </form>
      </div>
  )
}