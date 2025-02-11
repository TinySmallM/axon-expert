import { useNavigate } from 'react-router'
import * as Product from '../../../model/Product'
import { Button } from '../../ui/Button/Button'

type Props = {
  productState: Product.statusProduct
}

export const CreateElementList = ({productState}: Props) => {
    const navigate = useNavigate();
    
    return (
      <>
        <Button mode='primary' onClick={() => navigate("/")}>Отмена</Button>
        <Button mode='primary' type='submit'>{productState === 'loading' ? 'Загрузка...' : 'Создание'}</Button>
        {productState === 'error' && (
          <span className='Manager__error'>Мы не смогли создать товар, повторите попытку еще раз.</span>
      )}
      </>
    )
}