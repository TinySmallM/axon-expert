import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { products } from './products'
// ...
export const store = configureStore({
  reducer: {
    products: products.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat()
})

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()