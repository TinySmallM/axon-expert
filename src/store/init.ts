import { configureStore } from '@reduxjs/toolkit'
import { products } from './products'

export const store = configureStore({
  reducer: {
    products: products.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat()
})

export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;